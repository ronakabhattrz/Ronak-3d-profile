/**
 * Tell Bing, Yandex and other IndexNow engines about every URL in the live
 * sitemap (Bing also powers ChatGPT search). Google doesn't use IndexNow —
 * submit the sitemap in Search Console for Google.
 *
 * Run after a deploy:  npm run indexnow
 * The key file public/8c6cb78f48c75925cd08bdaa74a4eee6.txt must be live on the site for this to work.
 */
const HOST = "www.ronakbhatt.in";
const KEY = "8c6cb78f48c75925cd08bdaa74a4eee6";

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("No URLs found in sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

// 200/202 = accepted; 403 = key file not found on the site yet
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
if (res.status >= 300) process.exit(1);
