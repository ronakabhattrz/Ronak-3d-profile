/**
 * Per-page JSON-LD builders (Person + WebSite are emitted globally in Layout).
 * Everything here must mirror content that is visible on the page.
 */
import { services } from "../data/services";
import { upworkCatalogItems } from "../data/upworkCatalog";
import { SITE_URL } from "./site";

const PERSON_ID = `${SITE_URL}/#person`;

export const personRef = { "@id": PERSON_ID };

export function breadcrumbJsonLd(path, name) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/services#service`,
    name: "Ronak Bhatt — Full-stack development",
    url: `${SITE_URL}/services`,
    image: `${SITE_URL}/preview.png`,
    founder: personRef,
    email: "ronakabhattrz@gmail.com",
    telephone: "+1-817-947-5211",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: ["CA", "US", "GB", "EU"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development services",
      itemListElement: [
        ...services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
        ...upworkCatalogItems.map((item) => ({
          "@type": "Offer",
          url: item.href,
          priceCurrency: "USD",
          price: item.priceLabel.replace(/[^0-9.]/g, ""),
          itemOffered: { "@type": "Service", name: item.title, description: item.description },
        })),
      ],
    },
  };
}

export function faqJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/about`,
    mainEntity: personRef,
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    about: personRef,
  };
}

export function portfolioJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${SITE_URL}/work`,
    name: "Selected work — Ronak Bhatt",
    author: personRef,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "WebSite", name: item.title, url: item.link },
      })),
    },
  };
}

export function blogJsonLd(posts) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: `${SITE_URL}/blog`,
    name: "Ronak Bhatt — articles",
    author: personRef,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: p.link,
      ...(p.pubDate ? { datePublished: new Date(p.pubDate).toISOString() } : {}),
      ...(p.image ? { image: p.image } : {}),
      author: personRef,
    })),
  };
}
