import { SITE_URL, siteMeta } from "./site";

const SUFFIX = " | Ronak Bhatt";

/** Recommended OG image (1200×630 PNG in /public). */
export const OG_IMAGE = `${SITE_URL}/og-preview.png`;
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

/**
 * Per-route SEO. Keys must match `router.pathname` from Next.js.
 * Falls back to home meta for unknown routes.
 */
export const pageSeo = {
  "/": {
    title: siteMeta.title,
    description: siteMeta.description,
    keywords: siteMeta.keywords,
    ogImage: OG_IMAGE,
    ogImageAlt:
      "Ronak Bhatt — Full Stack Developer, Ruby on Rails and JavaScript",
  },
  "/about": {
    title: `About${SUFFIX}`,
    description:
      "About Ronak Bhatt — Ruby on Rails and JavaScript full-stack developer with 9+ years of experience. Skills, background, and how I help teams ship.",
    keywords: `${siteMeta.keywords}, About, Experience, Skills`,
    ogImage: OG_IMAGE,
    ogImageAlt: "About Ronak Bhatt — full-stack developer profile",
  },
  "/services": {
    title: `Services${SUFFIX}`,
    description:
      "Services and ways I help teams — Ruby on Rails, React, Vue, Node, upgrades, and modern workflows. Snapshot aligned with ronakbhatt.in.",
    keywords: `${siteMeta.keywords}, Services, Consulting, Rails, React`,
    ogImage: OG_IMAGE,
    ogImageAlt: "Ronak Bhatt — development services",
  },
  "/work": {
    title: `Work${SUFFIX}`,
    description:
      "Selected work — Upwork project catalog and major shipped sites and products. Ruby on Rails, React, and full-stack delivery.",
    keywords: `${siteMeta.keywords}, Portfolio, Projects, Upwork`,
    ogImage: OG_IMAGE,
    ogImageAlt: "Ronak Bhatt — portfolio and project catalog",
  },
  "/blog": {
    title: `Blog${SUFFIX}`,
    description:
      "Latest articles from Medium by Ronak Bhatt — Ruby on Rails, JavaScript, and full-stack development. Full posts open on Medium.",
    keywords: `${siteMeta.keywords}, Blog, Articles, Medium`,
    ogImage: OG_IMAGE,
    ogImageAlt: "Ronak Bhatt — blog on Medium",
  },
  "/testimonials": {
    title: `Testimonials${SUFFIX}`,
    description:
      "Client testimonials and public feedback on Upwork and elsewhere — Ronak Bhatt, full-stack developer.",
    keywords: `${siteMeta.keywords}, Testimonials, Reviews, Upwork`,
    ogImage: OG_IMAGE,
    ogImageAlt: "Client testimonials for Ronak Bhatt",
  },
  "/contact": {
    title: `Contact${SUFFIX}`,
    description:
      "Contact Ronak Bhatt — London, Ontario, Canada. Email, phone, map, and a short form. Full-stack developer available for projects.",
    keywords: `${siteMeta.keywords}, Contact, Hire, London Ontario`,
    ogImage: OG_IMAGE,
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
