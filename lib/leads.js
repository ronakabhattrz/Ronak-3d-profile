/**
 * Lead delivery for the AI assistant. Sends every lead to the same Formspree
 * inbox as the contact form, and optionally to LEAD_WEBHOOK_URL (Slack incoming
 * webhook, Zapier, Make, n8n, a CRM…) so leads can flow on automatically.
 */
import { SITE_URL, siteMeta } from "./site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email.trim());
}

function formatLead(lead) {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `Company: ${lead.company}` : null,
    `Type: ${lead.enquiry_type}`,
    lead.budget ? `Budget: ${lead.budget}` : null,
    lead.timeline ? `Timeline: ${lead.timeline}` : null,
    lead.page ? `Page: ${SITE_URL}${lead.page}` : null,
    "",
    lead.summary,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

async function sendToFormspree(lead, transcript) {
  const formId = process.env.LEAD_FORMSPREE_ID || siteMeta.formspreeId;
  const res = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Formspree checks the origin when domain restrictions are enabled
      Origin: SITE_URL,
      Referer: `${SITE_URL}/`,
    },
    body: JSON.stringify({
      fullname: lead.name,
      email: lead.email,
      _replyto: lead.email,
      _subject: `New lead via AI assistant: ${lead.name} (${lead.enquiry_type})`,
      message: formatLead(lead),
      source: "AI assistant",
      company: lead.company || "",
      budget: lead.budget || "",
      timeline: lead.timeline || "",
      transcript,
    }),
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
}

async function sendToWebhook(lead, transcript) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // `text` renders in Slack; other tools can read the structured `lead`
    body: JSON.stringify({
      text: `New lead from ronakbhatt.in AI assistant\n\n${formatLead(lead)}`,
      lead: { ...lead, source: "ai_assistant", received_at: new Date().toISOString() },
      transcript,
    }),
  });
  if (!res.ok) throw new Error(`Lead webhook responded ${res.status}`);
  return true;
}

/** Returns true when at least one destination accepted the lead. */
export async function deliverLead(lead, transcript) {
  const results = await Promise.allSettled([
    sendToFormspree(lead, transcript),
    sendToWebhook(lead, transcript),
  ]);
  results
    .filter((r) => r.status === "rejected")
    .forEach((r) => console.error("[lead] delivery failed:", r.reason));
  return results.some((r) => r.status === "fulfilled" && r.value !== false);
}
