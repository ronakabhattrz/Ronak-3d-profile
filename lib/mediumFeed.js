import Parser from "rss-parser";
import sanitizeHtml from "sanitize-html";

import { siteMeta } from "./site";

const parser = new Parser({
  timeout: 15000,
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

function stripTags(html) {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(item, maxLen = 240) {
  const html = item.contentEncoded || item["content:encoded"] || "";
  const raw =
    item.contentSnippet ||
    item.summary ||
    (html ? stripTags(html) : "") ||
    "";
  const text = stripTags(raw);
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trim()}…`;
}

/** First content image from RSS HTML; skips Medium analytics pixels. */
function firstImageFromEncoded(html) {
  if (!html || typeof html !== "string") return null;
  const re = /<img[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const url = m[1].trim();
    if (!url.startsWith("http")) continue;
    if (url.includes("medium.com/_/stat")) continue;
    if (url.includes("/_/stat?")) continue;
    if (/[?&]event=post\./i.test(url)) continue;
    return url;
  }
  return null;
}

/** URL slug from a Medium link: /@user/my-post-title-abc123 → my-post-title-abc123 */
function slugFromLink(link) {
  try {
    const parts = new URL(link).pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
}

const isTrackingPixel = (src = "") =>
  src.includes("medium.com/_/stat") || /[?&]event=post\./i.test(src);

/** Serve Medium CDN images through Next's optimizer (resized, no third-party cookies). */
const optimizedImage = (src) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=75`;

/**
 * Article HTML from the feed, reduced to safe formatting tags. Medium's own
 * post is the source, but it still arrives over the network, so it's sanitized
 * before rendering with dangerouslySetInnerHTML.
 */
function cleanArticleHtml(html) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "hr", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s",
      "a", "ul", "ol", "li", "blockquote", "pre", "code", "figure",
      "figcaption", "img",
    ],
    allowedAttributes: {
      // target/rel are set by transformTags below; they must be allowed here too
      a: ["href", "target", "rel"],
      img: ["src", "alt", "loading", "decoding"],
    },
    allowedSchemes: ["https", "http", "mailto"],
    allowedSchemesByTag: { img: ["https"] },
    exclusiveFilter: (frame) =>
      frame.tag === "img" && isTrackingPixel(frame.attribs.src),
    transformTags: {
      // Page H1 is the post title, so content headings start at H2
      h1: "h2",
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
      img: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          src: /^https:\/\/(cdn-images-1|miro)\.medium\.com\//.test(attribs.src || "")
            ? optimizedImage(attribs.src)
            : attribs.src,
          loading: "lazy",
          decoding: "async",
        },
      }),
    },
  });
}

function readingMinutes(html) {
  const words = stripTags(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/**
 * Fetches public Medium RSS (all posts in the feed — Medium caps at ~10 in some cases).
 * @returns {Promise<Array<{ slug: string, title: string, link: string, pubDate: string, snippet: string, image: string | null, tags: string[], minutes: number, html: string }>>}
 */
// Per-server cache so page renders and crawlers don't hammer Medium (it 429s).
const CACHE_MS = 10 * 60 * 1000;
let cache = { at: 0, items: null };

async function fetchItems() {
  if (cache.items && Date.now() - cache.at < CACHE_MS) return cache.items;
  const feed = await parser.parseURL(siteMeta.mediumFeedUrl);
  cache = { at: Date.now(), items: feed.items || [] };
  return cache.items;
}

const isBuild = () => process.env.NEXT_PHASE === "phase-production-build";

/**
 * On a failed fetch: during `next build` return [] so a Medium outage can't
 * break deploys; at runtime pass `throwOnError` from ISR pages so Next keeps
 * serving the last good page instead of regenerating an empty one.
 */
export async function getMediumPosts({ withHtml = false, throwOnError = false } = {}) {
  try {
    const items = await fetchItems();
    return items
      .map((item) => {
        const encoded = item.contentEncoded || item["content:encoded"] || "";
        const link = (item.link || siteMeta.mediumUrl).split("?")[0];
        return {
          slug: slugFromLink(link),
          title: item.title?.trim() || "Untitled",
          link,
          pubDate: item.pubDate || item.isoDate || "",
          snippet: excerpt(item),
          image: firstImageFromEncoded(encoded),
          tags: (item.categories || []).slice(0, 5),
          minutes: readingMinutes(encoded),
          ...(withHtml ? { html: cleanArticleHtml(encoded) } : {}),
        };
      })
      .filter((post) => post.slug);
  } catch (err) {
    console.error("[mediumFeed] RSS fetch failed:", err?.message || err);
    if (throwOnError && !isBuild()) throw err;
    return [];
  }
}
