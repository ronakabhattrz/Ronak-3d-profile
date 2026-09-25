import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiArrowRight,
  HiArrowUpRight,
  HiOutlineBolt,
  HiOutlinePuzzlePiece,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

import BookCallButton from "../../components/BookCallButton";
import Faq from "../../components/Faq";
import JsonLd from "../../components/JsonLd";
import PageHeader from "../../components/PageHeader";
import TestimonialCard from "../../components/TestimonialCard";
import { faq } from "../../data/faq";
import { testimonialData } from "../../data/testimonials";
import { upworkCatalogItems } from "../../data/upworkCatalog";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "../../lib/schema";
import { fadeIn } from "../../variants";

const PATH = "/services/rails-upgrade";
const CONTACT = "/contact?service=rails-upgrade";

const reasons = [
  {
    Icon: HiOutlineShieldCheck,
    title: "Security fixes",
    text: "Older Rails versions stop receiving security patches. Staying current keeps your app and your users' data protected.",
  },
  {
    Icon: HiOutlinePuzzlePiece,
    title: "Gem & Ruby compatibility",
    text: "Gems and Ruby versions move on. An outdated framework makes every new dependency, integration and hire harder.",
  },
  {
    Icon: HiOutlineBolt,
    title: "Faster, easier development",
    text: "Newer Rails brings better tooling and defaults, so your team ships features instead of fighting the framework.",
  },
];

const included = [
  "Review of the codebase, Ruby version and gem dependencies",
  "A step-by-step upgrade plan, one version at a time",
  "Gem updates and deprecation fixes along the way",
  "Tests around critical flows where coverage is thin",
  "Verification that every existing feature still works",
  "Refactoring and CI/CD improvements where they help",
  "Deployment support, including Heroku",
  "Handover notes on what changed and why",
];

const steps = [
  { title: "Share your app", text: "Tell me the current Rails and Ruby versions and give read access to the repo." },
  { title: "Review & quote", text: "I review the codebase and dependencies, then send a plan and a fixed quote." },
  { title: "Upgrade & test", text: "The upgrade happens in small, tested steps so nothing breaks silently." },
  { title: "Deploy & hand over", text: "Ship to production, confirm everything works, and walk you through the changes." },
];

/** Reviews that specifically mention Rails work. */
const RAILS_REVIEWS = [
  "Custom Rails CMS (milestone)",
  "Long-term hourly",
  "Swagger API UI (follow-up)",
];

const pageFaq = faq.filter((f) =>
  /upgrade|cost|get started/i.test(f.q)
);

const maintenance = upworkCatalogItems.find((i) => /rails/i.test(i.title));

const reveal = (delay = 0) => ({
  variants: fadeIn("up", delay),
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-60px" },
});

const RailsUpgrade = () => {
  const reviews = RAILS_REVIEWS.map((name) =>
    testimonialData.find((t) => t.name === name)
  ).filter(Boolean);

  return (
    <div className="container max-w-content">
      <JsonLd
        id="rails-upgrade"
        data={[
          breadcrumbJsonLd(PATH, "Rails upgrades", {
            path: "/services",
            name: "Services",
          }),
          serviceJsonLd({
            path: PATH,
            name: "Ruby on Rails upgrade services",
            serviceType: "Ruby on Rails upgrade",
            description:
              "Upgrade an existing Ruby on Rails application to a current version, tested so every existing feature keeps working.",
          }),
          faqJsonLd(pageFaq),
        ]}
      />

      <PageHeader
        eyebrow="Rails upgrade services"
        title={
          <>
            Upgrade your Rails app <span className="em">without breaking it.</span>
          </>
        }
        aside={
          <div className="flex flex-wrap gap-3">
            <Link href={CONTACT} className="btn-primary group">
              Get an upgrade quote
              <HiArrowRight
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <BookCallButton />
          </div>
        }
      >
        <p>
          Stuck on an old version of Rails? I upgrade existing Ruby on Rails
          applications and test them thoroughly, so every feature your users
          rely on still works afterwards. 8+ years of Rails, Upwork Top Rated
          Plus.
        </p>
      </PageHeader>

      {/* Why upgrade */}
      <section aria-labelledby="why-heading">
        <h2 id="why-heading" className="sr-only">
          Why upgrade Rails
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {reasons.map(({ Icon, title, text }, i) => (
            <motion.li key={title} {...reveal(0.05 * i)} className="card p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl text-accent">
                <Icon aria-hidden />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-[15px]">{text}</p>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* What's included */}
      <section
        aria-labelledby="included-heading"
        className="mt-24 grid gap-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-4">
          <p className="eyebrow">Scope</p>
          <h2 id="included-heading" className="h3 mt-4">
            What&apos;s <span className="em">included</span>
          </h2>
          <p className="mt-3 max-w-sm text-[15px]">
            Every upgrade is scoped to your app, but these are the parts that
            make it safe.
          </p>
        </div>
        <motion.ul
          {...reveal()}
          className="card grid gap-x-8 gap-y-4 p-7 sm:grid-cols-2 sm:p-8 lg:col-span-8"
        >
          {included.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] text-zinc-300">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </motion.ul>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="mt-24">
        <p className="eyebrow">Process</p>
        <h2 id="process-heading" className="h3 mt-4">
          How it <span className="em">works</span>
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.li key={step.title} {...reveal(0.05 * i)} className="card p-6">
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-base font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Proof */}
      {reviews.length ? (
        <section aria-labelledby="reviews-heading" className="mt-24">
          <p className="eyebrow">Rails clients</p>
          <h2 id="reviews-heading" className="h3 mt-4">
            What Rails clients <span className="em">say</span>
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {reviews.map((person, i) => (
              <motion.li key={person.name} {...reveal(0.05 * i)} className="flex">
                <TestimonialCard person={person} className="w-full" />
              </motion.li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Pricing */}
      <motion.section
        {...reveal()}
        aria-labelledby="pricing-heading"
        className="card mt-24 flex flex-col gap-6 p-7 sm:p-10 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-xl">
          <p className="eyebrow">Pricing</p>
          <h2 id="pricing-heading" className="mt-4 text-2xl font-semibold text-white">
            A fixed quote after a codebase review
          </h2>
          <p className="mt-3 text-[15px]">
            Every app is different, so upgrades are quoted once I&apos;ve seen
            the code.
            {maintenance ? (
              <>
                {" "}
                For ongoing upkeep, Rails maintenance with Heroku starts{" "}
                {maintenance.priceLabel.toLowerCase()} on Upwork.
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={CONTACT} className="btn-primary">
            Get an upgrade quote
          </Link>
          {maintenance ? (
            <a
              href={maintenance.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost"
            >
              Maintenance on Upwork <HiArrowUpRight aria-hidden />
            </a>
          ) : null}
        </div>
      </motion.section>

      <div className="mt-24">
        <Faq items={pageFaq} />
      </div>
    </div>
  );
};

export default RailsUpgrade;
