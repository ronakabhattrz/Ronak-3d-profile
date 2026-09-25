import { servicePageList } from "../data/servicePages";
import { SITE_URL, siteMeta } from "./site";

const SUFFIX = " | Ronak Bhatt";

/** Recommended OG image (1200×630 PNG in /public). */
export const OG_IMAGE = `${SITE_URL}/preview.png`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const ogSocial = {
  siteName: "Ronak Bhatt",
  locale: "en_CA",
  type: "website",
  twitterCard: "summary_large_image",
  twitterSite: "@ronakabhattrz",
  twitterCreator: "@ronakabhattrz",
};

/**
 * Absolute URL for the current path (no query string).
 * @param {string} pathname - `router.pathname`, e.g. `/blog`
 */
export function canonicalUrl(pathname) {
  if (!pathname || pathname === "/") return `${SITE_URL}/`;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}

/** Branded 1200×630 share image rendered by /api/og (edge). */
export function ogImageFor(title, eyebrow) {
  const params = new URLSearchParams({ title, eyebrow });
  return `${SITE_URL}/api/og?${params.toString()}`;
}

/** SEO entries for /services/<slug> landing pages, generated from their data. */
const serviceSeo = Object.fromEntries(
  servicePageList.map((p) => [
    `/services/${p.slug}`,
    {
      title: `${p.seo.title}${SUFFIX}`,
      description: p.seo.description,
      keywords: `${siteMeta.keywords}, ${p.seo.keywords}`,
      ogImage: ogImageFor(p.seo.ogTitle, p.seo.ogEyebrow),
      ogImageAlt: `${p.seo.title} by Ronak Bhatt`,
    },
  ])
);

/**
 * Per-route SEO. Keys must match `router.pathname` from Next.js.
 * Falls back to home meta for unknown routes.
 * Titles stay under ~60 chars and descriptions under ~160 so Google doesn't truncate.
 */
export const pageSeo = {
  "/": {
    title: "Ronak Bhatt — Ruby on Rails & React Full-Stack Developer",
    description:
      "Ruby on Rails & React full-stack developer in London, Ontario. 8+ years building scalable web apps, Rails upgrades, APIs and Next.js front-ends.",
    keywords: siteMeta.keywords,
    ogImage: OG_IMAGE,
    ogImageAlt:
      "Ronak Bhatt — Full Stack Developer, Ruby on Rails and JavaScript",
  },
  "/about": {
    title: `About — Rails & JavaScript Engineer, 8+ Years${SUFFIX}`,
    description:
      "Ruby on Rails and JavaScript full-stack developer with 8+ years across Canada, the US, the UK and Europe. Experience, skills, certifications and education.",
    keywords: `${siteMeta.keywords}, About, Experience, Skills, Resume`,
    ogImage: ogImageFor("Building reliable products, end to end.", "About"),
    ogImageAlt: "About Ronak Bhatt — full-stack developer profile",
  },
  "/services": {
    title: `Rails Development, Upgrades & React Services${SUFFIX}`,
    description:
      "Ruby on Rails development and version upgrades, React and Next.js front-ends, API architecture, performance tuning and code review. Packages from $250.",
    keywords: `${siteMeta.keywords}, Rails upgrade, Rails consultant, hire Rails developer, React developer, Services`,
    ogImage: ogImageFor("Rails, React & full-stack services.", "Services"),
    ogImageAlt: "Ronak Bhatt — development services",
  },
  ...serviceSeo,
  "/resources/rails-upgrade-checklist": {
    title: `Rails Upgrade Checklist: Step-by-Step Guide${SUFFIX}`,
    description:
      "A free, printable Ruby on Rails upgrade checklist: versions, gems, deprecations, load_defaults, Zeitwerk, testing and safe deployment.",
    keywords: `${siteMeta.keywords}, Rails upgrade checklist, how to upgrade Rails, Rails 7 upgrade guide, Rails 8 upgrade guide`,
    ogImage: ogImageFor("Rails upgrade readiness checklist.", "Free resource"),
    ogImageAlt: "Rails upgrade readiness checklist",
  },
  "/work": {
    title: `Portfolio — Rails & React Projects${SUFFIX}`,
    description:
      "Selected sites and products shipped by Ronak Bhatt with Ruby on Rails and React, plus fixed-price project packages you can start on Upwork today.",
    keywords: `${siteMeta.keywords}, Portfolio, Projects, Case studies, Upwork`,
    ogImage: ogImageFor("Selected work.", "Portfolio"),
    ogImageAlt: "Ronak Bhatt — portfolio and project catalog",
  },
  "/blog": {
    title: `Blog — Rails & JavaScript Articles${SUFFIX}`,
    description:
      "Articles by Ronak Bhatt on Ruby on Rails, JavaScript, automation and full-stack development: practical write-ups from real projects.",
    keywords: `${siteMeta.keywords}, Blog, Articles, Medium, Rails tutorials`,
    ogImage: ogImageFor("Notes from the codebase.", "Writing"),
    ogImageAlt: "Ronak Bhatt — blog on Medium",
  },
  "/testimonials": {
    title: `Client Reviews & Testimonials${SUFFIX}`,
    description:
      "What clients say about working with Ronak Bhatt: five-star feedback from Upwork and long-term clients on Rails, React and full-stack projects.",
    keywords: `${siteMeta.keywords}, Testimonials, Reviews, Upwork, Top Rated Plus`,
    ogImage: ogImageFor("What clients say.", "Testimonials"),
    ogImageAlt: "Client testimonials for Ronak Bhatt",
  },
  "/contact": {
    title: `Hire a Rails & React Developer — Contact${SUFFIX}`,
    description:
      "Contact Ronak Bhatt, a full-stack developer in London, Ontario, Canada. Send a project brief, book a call, or email. Freelance and contract projects.",
    keywords: `${siteMeta.keywords}, Contact, Hire, Freelance Rails developer, London Ontario`,
    ogImage: ogImageFor("Let's build something.", "Contact"),
    ogImageAlt: "Contact Ronak Bhatt",
  },
  "/404": {
    title: `Page not found${SUFFIX}`,
    description:
      "This page could not be found. Return to the Ronak Bhatt portfolio home.",
    keywords: siteMeta.keywords,
    ogImage: OG_IMAGE,
    ogImageAlt: "Ronak Bhatt portfolio",
  },
};

/**
 * @param {string} pathname
 * @returns {typeof pageSeo['/'] & { pathname: string, canonical: string }}
 */
export function getSeoForPath(pathname) {
  const path = pathname || "/";
  const config = pageSeo[path] ?? pageSeo["/"];
  return {
    pathname: path,
    canonical: canonicalUrl(path),
    title: config.title,
    description: config.description,
    keywords: config.keywords ?? siteMeta.keywords,
    ogImage: config.ogImage ?? OG_IMAGE,
    ogImageAlt: config.ogImageAlt ?? "Ronak Bhatt",
  };
}
