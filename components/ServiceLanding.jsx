import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";

import BookCallButton from "./BookCallButton";
import Faq from "./Faq";
import JsonLd from "./JsonLd";
import PageHeader from "./PageHeader";
import TestimonialCard from "./TestimonialCard";
import { faq } from "../data/faq";
import { servicePageList } from "../data/servicePages";
import { testimonialData } from "../data/testimonials";
import { upworkCatalogItems } from "../data/upworkCatalog";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "../lib/schema";
import { fadeIn } from "../variants";

const reveal = (delay = 0) => ({
  variants: fadeIn("up", delay),
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-60px" },
});

/** Shared layout for /services/<slug> pages, driven by data/servicePages.js. */
const ServiceLanding = ({ page }) => {
  const path = `/services/${page.slug}`;
  const contact = `/contact?service=${page.contactService}`;
  const reviews = page.reviews
    .map((name) => testimonialData.find((t) => t.name === name))
    .filter(Boolean);
  const pageFaq = faq.filter((f) => page.faqMatch.test(f.q));
  const upwork = page.pricing.upworkMatch
    ? upworkCatalogItems.find((i) => page.pricing.upworkMatch.test(i.title))
    : null;
  const related = servicePageList.filter((p) => p.slug !== page.slug);

  return (
    <div className="container max-w-content">
      <JsonLd
        id={`service-${page.slug}`}
        data={[
          breadcrumbJsonLd(path, page.navLabel, {
            path: "/services",
            name: "Services",
          }),
          serviceJsonLd({ path, ...page.schema }),
          ...(pageFaq.length ? [faqJsonLd(pageFaq)] : []),
        ]}
      />

      <PageHeader
        eyebrow={page.eyebrow}
        title={
          <>
            {page.title} <span className="em">{page.titleEm}</span>
          </>
        }
        aside={
          <div className="flex flex-wrap gap-3">
            <Link href={contact} className="btn-primary group">
              {page.cta}
              <HiArrowRight
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <BookCallButton />
          </div>
        }
      >
        <p>{page.lead}</p>
      </PageHeader>

      <section aria-labelledby="why-heading">
        <h2 id="why-heading" className="sr-only">
          Why it matters
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {page.reasons.map(({ Icon, title, text }, i) => (
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

      <section
        aria-labelledby="included-heading"
        className="mt-24 grid gap-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-4">
          <p className="eyebrow">Scope</p>
          <h2 id="included-heading" className="h3 mt-4">
            What&apos;s <span className="em">included</span>
          </h2>
          <p className="mt-3 max-w-sm text-[15px]">{page.includedIntro}</p>
        </div>
        <motion.ul
          {...reveal()}
          className="card grid gap-x-8 gap-y-4 p-7 sm:grid-cols-2 sm:p-8 lg:col-span-8"
        >
          {page.included.map((item) => (
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

      <section aria-labelledby="process-heading" className="mt-24">
        <p className="eyebrow">Process</p>
        <h2 id="process-heading" className="h3 mt-4">
          How it <span className="em">works</span>
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.steps.map((step, i) => (
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

      {page.resource ? (
        <motion.aside
          {...reveal()}
          className="card mt-24 flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <p className="eyebrow">Free resource</p>
            <p className="mt-3 text-lg font-semibold text-white">
              Rails upgrade readiness checklist
            </p>
            <p className="mt-1 text-[15px]">
              A step-by-step list to check before you start an upgrade.
            </p>
          </div>
          <Link href="/resources/rails-upgrade-checklist" className="btn-ghost shrink-0">
            Read the checklist <HiArrowRight aria-hidden />
          </Link>
        </motion.aside>
      ) : null}

      {reviews.length ? (
        <section aria-labelledby="reviews-heading" className="mt-24">
          <p className="eyebrow">Client feedback</p>
          <h2 id="reviews-heading" className="h3 mt-4">
            {page.reviewsHeading} <span className="em">say</span>
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

      <motion.section
        {...reveal()}
        aria-labelledby="pricing-heading"
        className="card mt-24 flex flex-col gap-6 p-7 sm:p-10 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-xl">
          <p className="eyebrow">Pricing</p>
          <h2 id="pricing-heading" className="mt-4 text-2xl font-semibold text-white">
            {page.pricing.title}
          </h2>
          <p className="mt-3 text-[15px]">
            {page.pricing.text}
            {upwork ? (
              <>
                {" "}
                {page.pricing.upworkText} {upwork.priceLabel.toLowerCase()} on
                Upwork.
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={contact} className="btn-primary">
            {page.cta}
          </Link>
          {upwork ? (
            <a
              href={upwork.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost"
            >
              View on Upwork <HiArrowUpRight aria-hidden />
            </a>
          ) : null}
        </div>
      </motion.section>

      {pageFaq.length ? (
        <div className="mt-24">
          <Faq items={pageFaq} />
        </div>
      ) : null}

      <nav aria-labelledby="related-heading" className="mb-24">
        <h2 id="related-heading" className="eyebrow">
          Related services
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/services/${p.slug}`}
                className="chip px-4 py-2 text-sm hover:border-white/25 hover:text-white"
              >
                {p.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ServiceLanding;
