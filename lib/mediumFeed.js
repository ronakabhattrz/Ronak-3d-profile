import Parser from "rss-parser";

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

/**
 * Fetches public Medium RSS (all posts in the feed — Medium caps at ~10 in some cases).
 * @returns {Promise<Array<{ title: string, link: string, pubDate: string, snippet: string, image: string | null }>>}
 */
export async function getMediumPosts() {
  const url = siteMeta.mediumFeedUrl;
  try {
    const feed = await parser.parseURL(url);
    const items = feed.items || [];
    return items.map((item) => {
      const encoded = item.contentEncoded || item["content:encoded"] || "";
      return {
        title: item.title?.trim() || "Untitled",
        link: item.link || siteMeta.mediumUrl,
        pubDate: item.pubDate || item.isoDate || "",
        snippet: excerpt(item),
        image: firstImageFromEncoded(encoded),
      };
    });
  } catch (err) {
    console.error("[mediumFeed] RSS fetch failed:", err?.message || err);
    return [];
  }
}
