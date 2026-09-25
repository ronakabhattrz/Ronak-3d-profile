import Anthropic from "@anthropic-ai/sdk";

import { ASSISTANT_SYSTEM_PROMPT, CAPTURE_LEAD_TOOL } from "../../lib/assistant";
import { deliverLead, isValidEmail } from "../../lib/leads";

export const config = { maxDuration: 30 };

const MODEL = process.env.ASSISTANT_MODEL || "claude-opus-5";
const MAX_MESSAGES = 30;
const MAX_CHARS_PER_MESSAGE = 2000;
const MAX_TOOL_ROUNDS = 3;

// Best-effort per-instance rate limit (serverless instances don't share memory).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

/** Accept only alternating plain-text turns that start and end with the visitor. */
function sanitizeHistory(raw) {
  if (!Array.isArray(raw)) return null;
  const messages = raw
    .slice(-MAX_MESSAGES)
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
    }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return null;
  }
  return messages;
}

const transcriptOf = (messages) =>
  messages
    .filter((m) => typeof m.content === "string")
    .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
    .join("\n\n");

let client;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: "Assistant is not configured" });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many messages. Try again soon." });
  }

  const history = sanitizeHistory(req.body?.messages);
  if (!history) {
    return res.status(400).json({ error: "Invalid conversation" });
  }
  const page = typeof req.body?.page === "string" ? req.body.page.slice(0, 100) : "";
  const alreadyCaptured = req.body?.leadCaptured === true;

  const messages = [...history];
  if (alreadyCaptured) {
    // Mid-conversation operator note: appended after the latest user turn so the
    // cached system prompt and earlier turns stay byte-identical.
    messages.push({
      role: "system",
      content:
        "This visitor's details have already been sent to Ronak. Do not call capture_lead again unless they ask to add or correct something.",
    });
  }

  client ||= new Anthropic();
  let leadCaptured = false;

  try {
    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
      const response = await client.beta.messages.create({
        model: MODEL,
        max_tokens: 4096,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        output_config: { effort: "low" },
        system: [
          {
            type: "text",
            text: ASSISTANT_SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        tools: [CAPTURE_LEAD_TOOL],
        messages,
      });

      if (response.stop_reason === "refusal") {
        return res.status(200).json({
          reply:
            "I can't help with that one here. For anything about working with Ronak, email ronakabhattrz@gmail.com.",
          leadCaptured,
        });
      }

      const toolUses = response.content.filter((b) => b.type === "tool_use");
      if (response.stop_reason !== "tool_use" || !toolUses.length) {
        const reply = response.content
          .filter((b) => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim();
        return res.status(200).json({
          reply:
            reply ||
            "Sorry, I lost my train of thought. Could you say that again?",
          leadCaptured,
        });
      }

      // Keep the assistant turn exactly as returned (thinking blocks included).
      messages.push({ role: "assistant", content: response.content });

      const results = [];
      for (const tool of toolUses) {
        if (tool.name !== CAPTURE_LEAD_TOOL.name) {
          results.push({
            type: "tool_result",
            tool_use_id: tool.id,
            is_error: true,
            content: `Unknown tool: ${tool.name}`,
          });
          continue;
        }
        const lead = { ...tool.input, page };
        if (!lead.name || !isValidEmail(lead.email) || !lead.summary) {
          results.push({
            type: "tool_result",
            tool_use_id: tool.id,
            is_error: true,
            content:
              "The lead needs a name, a valid email address and a summary. Ask the visitor for whatever is missing or looks wrong.",
          });
          continue;
        }
        const delivered = await deliverLead(lead, transcriptOf(history));
        if (delivered) leadCaptured = true;
        results.push({
          type: "tool_result",
          tool_use_id: tool.id,
          is_error: !delivered,
          content: delivered
            ? "Sent to Ronak. He replies by email."
            : "Delivery failed. Apologise and ask the visitor to email ronakabhattrz@gmail.com directly.",
        });
      }
      messages.push({ role: "user", content: results });
    }

    return res.status(200).json({
      reply: "Thanks! Is there anything else you'd like to know about working with Ronak?",
      leadCaptured,
    });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.error("[chat] rate limited by API");
      return res.status(503).json({ error: "Assistant is busy. Try again in a minute." });
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`[chat] API error ${error.status}:`, error.message);
    } else {
      console.error("[chat] unexpected error:", error);
    }
    return res.status(502).json({ error: "Assistant is unavailable right now." });
  }
}
