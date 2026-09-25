import { motion } from "framer-motion";
import { useState } from "react";
import {
  HiArrowRight,
  HiArrowUpRight,
  HiCheckCircle,
  HiOutlineDocumentArrowDown,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";

import JsonLd from "../../components/JsonLd";
import PageHeader from "../../components/PageHeader";
import Socials from "../../components/Socials";
import { fadeIn } from "../../variants";
import { breadcrumbJsonLd, contactPageJsonLd } from "../../lib/schema";
import { siteMeta } from "../../lib/site";

const channels = [
  {
    Icon: HiOutlineEnvelope,
    label: "Email",
    value: "ronakabhattrz@gmail.com",
    href: "mailto:ronakabhattrz@gmail.com",
  },
  {
    Icon: HiOutlinePhone,
    label: "Phone",
    value: "+1 (817) 947-5211",
    href: "tel:+18179475211",
  },
  {
    Icon: HiOutlineMapPin,
    label: "Based in",
    value: "London, Ontario, Canada",
  },
  {
    Icon: HiOutlineDocumentArrowDown,
    label: "Resume",
    value: "Download PDF",
    href: siteMeta.resumeUrl,
    external: true,
  },
];

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.target;
    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    // Honeypot: real users never see or fill this field
    if (form._gotcha.value) {
      setIsLoading(false);
      setSent(true);
      form.reset();
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${siteMeta.formspreeId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          message,
          _replyto: email,
        }),
      });

      if (res.ok) {
        if (typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", { method: "contact_form" });
        }
        setSent(true);
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        console.error("Formspree error", data);
        setError("Something went wrong. Please email ronakabhattrz@gmail.com directly.");
      }
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Please email ronakabhattrz@gmail.com directly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-content">
      <JsonLd
        id="contact"
        data={[breadcrumbJsonLd("/contact", "Contact"), contactPageJsonLd()]}
      />
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="em">connect.</span>
          </>
        }
      >
        <p>
          Tell me about your project, team or role, or reach out directly on
          any of the channels below.
        </p>
      </PageHeader>

      <div className="mb-24 grid gap-4 lg:grid-cols-12">
        {/* Left: channels + map */}
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 lg:col-span-5"
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ Icon, label, value, href, external }) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl text-accent">
                    <Icon aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                      {label}
                    </span>
                    <span className="block truncate text-[15px] text-white">
                      {value}
                    </span>
                  </span>
                  {href ? (
                    <HiArrowUpRight
                      aria-hidden
                      className="shrink-0 text-zinc-500 transition-colors group-hover:text-accent"
                    />
                  ) : null}
                </>
              );
              const cls = "card flex items-center gap-4 p-4";
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className={`${cls} card-hover group`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="card overflow-hidden p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93245.63184717782!2d-81.32895606875188!3d42.98632343104216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef20eaee30000%3A0x4030ebaa8223060!2sLondon%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sca!4v1738281600000!5m2!1sen!2sca"
              width="100%"
              height="220"
              className="block rounded-[1.1rem] border-0 opacity-80 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.6)]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="London, Ontario, Canada — map"
            />
          </div>

          <Socials className="pt-2" />
        </motion.div>

        {/* Right: form */}
        <motion.div
          variants={fadeIn("up", 0.18)}
          initial="hidden"
          animate="show"
          className="card order-first p-6 sm:p-10 lg:order-none lg:col-span-7"
        >
          <h2 className="text-xl font-semibold text-white">Send a message</h2>
          <p className="mt-1 text-sm">All fields are required.</p>

          {sent ? (
            <div
              role="status"
              className="mt-8 flex flex-col items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-6 py-12 text-center"
            >
              <HiCheckCircle aria-hidden className="text-5xl text-emerald-400" />
              <p className="mt-4 text-lg font-medium text-white">
                Message sent successfully.
              </p>
              <p className="mt-1 text-sm">
                Thank you — I&apos;ll get back to you as soon as possible.
              </p>
              <button
                type="button"
                className="btn-ghost mt-8"
                onClick={() => setSent(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="mt-8 flex flex-col gap-5"
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullname" className="field-label">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    autoComplete="name"
                    placeholder="Jane Cooper"
                    className="input"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="field-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className="input"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="field-label">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="A few lines about the project, timeline and budget…"
                  className="textarea"
                  disabled={isLoading}
                  required
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="btn-primary group w-full sm:w-auto sm:self-start"
                disabled={isLoading}
              >
                {isLoading ? "Sending…" : "Send message"}
                <HiArrowRight
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
