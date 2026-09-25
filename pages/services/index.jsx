import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiArrowRight,
  HiOutlineArrowPath,
  HiOutlineBolt,
  HiOutlineCircleStack,
  HiOutlineCodeBracket,
  HiOutlineCog6Tooth,
  HiOutlinePaintBrush,
} from "react-icons/hi2";

import Faq from "../../components/Faq";
import JsonLd from "../../components/JsonLd";
import MajorClients from "../../components/MajorClients";
import PageHeader from "../../components/PageHeader";
import { faq } from "../../data/faq";
import { servicePageList } from "../../data/servicePages";
import { services } from "../../data/services";
import { breadcrumbJsonLd, faqJsonLd, servicesJsonLd } from "../../lib/schema";
import { fadeIn } from "../../variants";

const icons = {
  "web-development": HiOutlineCodeBracket,
  "web-design": HiOutlinePaintBrush,
  "rails-upgrades": HiOutlineArrowPath,
  "backend-api": HiOutlineCircleStack,
  performance: HiOutlineBolt,
  "code-review": HiOutlineCog6Tooth,
};

export const serviceData = services.map((s) => ({ ...s, Icon: icons[s.key] }));

const Services = () => {
  return (
    <div className="container max-w-content">
      <JsonLd
        id="services"
        data={[
          breadcrumbJsonLd("/services", "Services"),
          servicesJsonLd(),
          faqJsonLd(faq),
        ]}
      />
      <PageHeader
        eyebrow="Services"
        title={
          <>
            What I&apos;m <span className="em">doing.</span>
          </>
        }
      >
        <p>
          How I help teams and products, in line with my main site at{" "}
          <a
            href="https://www.ronakbhatt.in/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-white underline decoration-accent/60 underline-offset-4 hover:decoration-accent"
          >
            ronakbhatt.in
          </a>
          .
        </p>
      </PageHeader>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceData.map((item, i) => (
          <motion.li
            key={item.title}
            variants={fadeIn("up", 0.05 * i)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="card card-hover group flex flex-col p-7"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl text-accent transition-colors group-hover:border-accent/40 group-hover:bg-accent/10">
                <item.Icon aria-hidden />
              </span>
              <span className="font-mono text-xs text-zinc-500">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="mt-8 text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 flex-1 text-[15px]">{item.description}</p>
            {item.href ? (
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-accent"
              >
                Learn more<span className="sr-only"> about {item.title}</span>{" "}
                <HiArrowRight aria-hidden />
              </Link>
            ) : null}
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <li key={tag} className="chip text-[11px] text-zinc-400">
                  {tag}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>

      <section aria-labelledby="specialist-heading" className="mt-24">
        <p className="eyebrow">Go deeper</p>
        <h2 id="specialist-heading" className="h3 mt-4">
          Specialist <span className="em">services</span>
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {servicePageList.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/services/${p.slug}`}
                className="card card-hover group flex h-full flex-col p-6"
              >
                <span className="text-base font-semibold text-white">
                  {p.navLabel}
                </span>
                <span className="mt-2 flex-1 text-sm text-zinc-400">
                  {p.seo.description.split(". ")[0]}.
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white group-hover:text-accent">
                  Learn more<span className="sr-only"> about {p.navLabel}</span>{" "}
                  <HiArrowRight aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <MajorClients />

      <Faq items={faq} />
    </div>
  );
};

export default Services;
