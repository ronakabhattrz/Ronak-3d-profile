import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  HiArrowUp,
  HiCheckCircle,
  HiOutlineSparkles,
  HiXMark,
} from "react-icons/hi2";

const STORAGE_KEY = "ronak-assistant-v1";

const GREETING = {
  role: "assistant",
  content:
    "Hi! I'm Ronak's AI assistant. Ask me about his Rails and React work, pricing or availability, or tell me about your project and I'll pass it straight to him.",
};

const SUGGESTIONS = [
  "I have a project in mind",
  "What does a Rails upgrade involve?",
  "How much does a project cost?",
  "Is Ronak open to full-time roles?",
];

const load = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
};
const save = (state) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable (private mode) — chat still works in memory */
  }
};

const track = (event, params) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
};

/** Turn bare URLs and emails into links; everything else stays plain text. */
const LINK_RE = /(https?:\/\/[^\s)]+|[^\s@()]+@[^\s@()]+\.[a-z]{2,})/gi;
function Linkified({ text }) {
  return text.split(LINK_RE).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    const trimmed = part.replace(/[.,]$/, "");
    const href = trimmed.includes("@") && !trimmed.startsWith("http")
      ? `mailto:${trimmed}`
      : trimmed;
    return (
      <Fragment key={i}>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer noopener"
          className="underline decoration-accent/60 underline-offset-2 hover:decoration-accent"
        >
          {trimmed}
        </a>
        {part.slice(trimmed.length)}
      </Fragment>
    );
  });
}

const AssistantWidget = () => {
  const { pathname } = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("/api/chat")
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d) => setEnabled(Boolean(d.enabled)))
      .catch(() => setEnabled(false));
  }, []);

  useEffect(() => {
    const saved = load();
    if (saved?.messages?.length) {
      setMessages(saved.messages);
      setLeadCaptured(Boolean(saved.leadCaptured));
    }
  }, []);

  useEffect(() => {
    save({ messages, leadCaptured });
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, leadCaptured, pending]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text) => {
    const content = text.trim();
    if (!content || pending) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The static greeting is UI only; the API expects the visitor to speak first
        body: JSON.stringify({
          messages: next.filter((m) => m !== GREETING && m.content !== GREETING.content),
          page: pathname,
          leadCaptured,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) {
        throw new Error(data.error || "Assistant unavailable");
      }
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      if (data.leadCaptured && !leadCaptured) {
        setLeadCaptured(true);
        track("generate_lead", { method: "ai_assistant" });
      }
    } catch (e) {
      setError(
        e.message === "Too many messages. Try again soon."
          ? e.message
          : "The assistant is offline right now."
      );
      // Let the visitor retry the same message
      setMessages((m) => m.slice(0, -1));
      setInput(content);
    } finally {
      setPending(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const showSuggestions = messages.length === 1 && !pending;

  // No API key configured: show nothing rather than a chat that can't answer
  if (!enabled) return null;

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="false"
            aria-label="Chat with Ronak's AI assistant"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] top-20 z-[55] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:left-auto sm:right-5 sm:top-auto sm:h-[min(600px,calc(100svh-9rem))] sm:w-[400px] xl:bottom-24"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-ink-800">
                <Image src="/avatar.png" alt="" fill sizes="40px" className="object-cover object-top" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Ronak&apos;s AI assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Answers instantly · Ronak follows up by email
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <HiXMark aria-hidden className="text-xl" />
                <span className="sr-only">Close chat</span>
              </button>
            </div>

            <div
              ref={listRef}
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-accent text-white"
                        : "rounded-bl-md border border-white/[0.07] bg-white/[0.04] text-zinc-200"
                    }`}
                  >
                    <Linkified text={m.content} />
                  </p>
                </div>
              ))}

              {pending ? (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <span className="flex gap-1 rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.04] px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                        style={{ animationDelay: `${d * 120}ms` }}
                      />
                    ))}
                  </span>
                </div>
              ) : null}

              {leadCaptured ? (
                <p className="flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2.5 text-xs text-emerald-200">
                  <HiCheckCircle aria-hidden className="shrink-0 text-base text-emerald-400" />
                  Your details were sent to Ronak. He&apos;ll reply by email.
                </p>
              ) : null}

              {error ? (
                <p role="alert" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-zinc-300">
                  {error} You can also{" "}
                  <Link href="/contact" className="text-white underline decoration-accent/60 underline-offset-2">
                    use the contact form
                  </Link>{" "}
                  or email{" "}
                  <a href="mailto:ronakabhattrz@gmail.com" className="text-white underline decoration-accent/60 underline-offset-2">
                    ronakabhattrz@gmail.com
                  </a>
                  .
                </p>
              ) : null}
            </div>

            {showSuggestions ? (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-accent/50 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="border-t border-white/[0.07] p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-ink-950/70 p-1.5 focus-within:border-accent/60">
                <label htmlFor="assistant-input" className="sr-only">
                  Message
                </label>
                <textarea
                  id="assistant-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={2000}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Ask anything or describe your project…"
                  className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2.5 py-2 text-[14px] text-white outline-none placeholder:text-zinc-500 focus:ring-0 focus-visible:ring-0"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || pending}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-opacity disabled:opacity-40"
                >
                  <HiArrowUp aria-hidden />
                  <span className="sr-only">Send</span>
                </button>
              </div>
              <p className="mt-2 px-1 text-[11px] text-zinc-400">
                AI can make mistakes. Details you share go only to Ronak.
              </p>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          if (!open) track("assistant_open", { page: pathname });
        }}
        className={`group fixed bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] right-4 z-[55] flex h-12 ${
          open ? "max-xl:hidden" : ""
        } items-center gap-2 rounded-full border border-white/10 bg-ink-900/90 pl-3 pr-4 text-sm font-medium text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all hover:border-accent/50 sm:right-5 xl:bottom-6`}
      >
        {open ? (
          <HiXMark aria-hidden className="text-lg" />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent">
            <HiOutlineSparkles aria-hidden className="text-sm" />
          </span>
        )}
        {open ? "Close" : "Ask my AI"}
      </button>
    </>
  );
};

export default AssistantWidget;
