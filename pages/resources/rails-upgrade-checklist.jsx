import Link from "next/link";
import { useEffect, useState } from "react";
import { HiArrowRight, HiCheckCircle, HiOutlinePrinter } from "react-icons/hi2";

import BookCallButton from "../../components/BookCallButton";
import JsonLd from "../../components/JsonLd";
import PageHeader from "../../components/PageHeader";
import { checklist } from "../../data/railsUpgradeChecklist";
import { breadcrumbJsonLd, personRef } from "../../lib/schema";
import { SITE_URL, siteMeta } from "../../lib/site";

const PATH = "/resources/rails-upgrade-checklist";
const STORAGE_KEY = "rails-checklist-v1";
const total = checklist.reduce((n, s) => n + s.items.length, 0);

const RailsUpgradeChecklist = () => {
  // Per-visitor progress, remembered in this browser only
  const [done, setDone] = useState({});
  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {});
    } catch {
      /* storage unavailable — checklist still works for this visit */
    }
  }, []);
  const toggle = (id) =>
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  const completed = Object.values(done).filter(Boolean).length;

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form._gotcha.value) return setStatus("sent");
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${siteMeta.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.value.trim(),
          _replyto: form.email.value.trim(),
          rails_version: form.railsVersion.value.trim(),
          message: form.notes.value.trim() || "(no notes)",
          project_type: "Rails upgrade (checklist)",
          checklist_progress: `${completed}/${total}`,
          _subject: `Rails upgrade enquiry from the checklist (Rails ${form.railsVersion.value.trim() || "?"})`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", { method: "checklist" });
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container max-w-content">
      <JsonLd
        id="rails-checklist"
        data={[
          breadcrumbJsonLd(PATH, "Rails upgrade checklist", {
            path: "/services/rails-upgrade",
            name: "Rails upgrades",
          }),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Rails upgrade readiness checklist",
            url: `${SITE_URL}${PATH}`,
            author: personRef,
            about: "Upgrading Ruby on Rails applications",
          },
        ]}
      />

      <PageHeader
        eyebrow="Free resource"
        title={
          <>
            Rails upgrade <span className="em">readiness checklist.</span>
          </>
        }
        aside={
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-ghost print:hidden"
          >
            <HiOutlinePrinter aria-hidden /> Print or save as PDF
          </button>
        }
      >
        <p>
          The steps to check before and during a Ruby on Rails upgrade, from a
          developer who does them for a living. Tick items off as you go; your
          progress is saved in this browser.
        </p>
      </PageHeader>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <div className="card flex items-center gap-4 p-5 print:hidden" aria-live="polite">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-500"
                style={{ width: `${(completed / total) * 100}%` }}
              />
            </div>
            <span className="font-mono text-xs text-zinc-400">
              {completed}/{total} done
            </span>
          </div>

          {checklist.map((section, si) => (
            <section key={section.title} className="card p-6 sm:p-8" aria-labelledby={`cl-${si}`}>
              <h2 id={`cl-${si}`} className="flex items-baseline gap-3 text-lg font-semibold text-white">
                <span className="font-mono text-xs text-accent">
                  {String(si + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {section.items.map((item, ii) => {
                  const id = `${si}-${ii}`;
                  return (
                    <li key={id}>
                      <label className="group flex cursor-pointer gap-3 text-[15px] leading-relaxed">
                        <input
                          type="checkbox"
                          checked={Boolean(done[id])}
                          onChange={() => toggle(id)}
                          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#D92A1E]"
                        />
                        <span className={done[id] ? "text-zinc-500 line-through" : "text-zinc-300"}>
                          {item}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <aside className="lg:col-span-4 print:hidden">
          <div className="card sticky top-24 p-6 sm:p-7">
            <h2 className="text-lg font-semibold text-white">Planning an upgrade?</h2>
            <p className="mt-2 text-sm">
              Tell me your current Rails and Ruby versions and I&apos;ll get back
              to you about the best path.
            </p>

            {status === "sent" ? (
              <p role="status" className="mt-6 flex items-start gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-sm text-emerald-200">
                <HiCheckCircle aria-hidden className="mt-0.5 shrink-0 text-lg text-emerald-400" />
                Thanks! I&apos;ll reply by email.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <div>
                  <label htmlFor="cl-email" className="field-label">Email</label>
                  <input id="cl-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="input" />
                </div>
                <div>
                  <label htmlFor="cl-version" className="field-label">Current Rails version</label>
                  <input id="cl-version" name="railsVersion" type="text" required placeholder="e.g. 5.2" className="input" />
                </div>
                <div>
                  <label htmlFor="cl-notes" className="field-label">
                    Anything else? <span className="normal-case tracking-normal text-zinc-500">(optional)</span>
                  </label>
                  <textarea id="cl-notes" name="notes" rows={3} placeholder="Ruby version, hosting, deadline…" className="textarea min-h-[96px]" />
                </div>
                {status === "error" ? (
                  <p role="alert" className="text-sm text-red-400">
                    Something went wrong. Please email ronakabhattrz@gmail.com.
                  </p>
                ) : null}
                <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
              </form>
            )}

            <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pt-6">
              <BookCallButton className="btn-ghost w-full" />
              <Link
                href="/services/rails-upgrade"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white"
              >
                How I handle upgrades <HiArrowRight aria-hidden />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <div className="h-24" />
    </div>
  );
};

export default RailsUpgradeChecklist;
