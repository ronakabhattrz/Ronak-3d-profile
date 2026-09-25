import { getMediumPosts } from "../lib/mediumFeed";
import { pageSeo } from "../lib/seo";
import { SITE_URL } from "../lib/site";

/** Priority by route; service pages get 0.8 and anything else unlisted 0.7. */
const PRIORITY = {
  "/": "1.0",
  "/about": "0.9",
  "/work": "0.9",
  "/services": "0.9",
  "/contact": "0.8",
};

const urlEntry = ({ loc, lastmod, priority }) =>
  [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");

/** Generated sitemap: every page in lib/seo.js plus each blog article. */
export async function getServerSideProps({ res }) {
  const today = new Date().toISOString().slice(0, 10);
  const pages = Object.keys(pageSeo)
    .filter((path) => path !== "/404")
    .map((path) => ({
      loc: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
      lastmod: path === "/blog" ? today : undefined,
      priority:
        PRIORITY[path] || (path.startsWith("/services/") ? "0.8" : "0.7"),
    }));

  // If Medium is unavailable the sitemap still lists every page, just not posts
  const posts = (await getMediumPosts()).map((post) => ({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: post.pubDate
      ? new Date(post.pubDate).toISOString().slice(0, 10)
      : undefined,
    priority: "0.6",
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pages, ...posts].map(urlEntry).join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
