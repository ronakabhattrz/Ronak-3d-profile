# Growth checklist

The website side is done. These are the steps only you can do, with the text ready to copy. Each takes 5–15 minutes.

---

## 1. Google Analytics 4: count leads as conversions (5 min)

The site already sends a `generate_lead` event from three places:

| `method` value | When it fires |
|---|---|
| `contact_form` | The contact form is sent |
| `book_call` | Someone clicks "Book a free call" |
| `checklist` | Someone sends the form on the Rails upgrade checklist |

To see them as conversions:

1. Open **analytics.google.com** → your property → **Admin** (gear icon) → **Events**.
2. Find `generate_lead` (it appears after the first one fires; send yourself a test enquiry if it isn't there yet).
3. Toggle **Mark as key event**.
4. Optional: **Admin → Custom definitions → Create custom dimension**. Name `Lead method`, scope **Event**, parameter `method`. Reports can then show which channel brings leads.

Then check **Reports → Engagement → Landing page** to see which pages lead to enquiries.

## 2. Google Search Console: get the new pages indexed (10 min)

1. Open **search.google.com/search-console** and select `ronakbhatt.in` (verify it with a DNS record if you haven't already).
2. **Sitemaps** → submit `https://www.ronakbhatt.in/sitemap.xml`. It now updates itself, including blog posts.
3. **URL inspection** → paste each URL below → **Request indexing**:
   - `https://www.ronakbhatt.in/services/rails-upgrade`
   - `https://www.ronakbhatt.in/services/rails-maintenance`
   - `https://www.ronakbhatt.in/services/hire-rails-developer`
   - `https://www.ronakbhatt.in/services/react-nextjs`
   - `https://www.ronakbhatt.in/resources/rails-upgrade-checklist`
4. Check back in 2–4 weeks: **Performance** shows which searches find you.

## 3. Medium: make your site the original for each article (10 min, once)

Articles now also live on your site at `/blog/<slug>`. For Google to credit **your** site rather than Medium, tell Medium the site is the original:

1. On Medium, open a story → **Edit** → story settings (**⋯ → More settings**) → **Advanced settings**. Menu names shift occasionally; look for the canonical link option.
2. Tick **"This story was originally published elsewhere"** and paste the matching site URL, e.g. `https://www.ronakbhatt.in/blog/<same-slug-as-on-medium>`. The slug is the last part of the Medium URL.
3. Save. Repeat for each story. New stories: publish, then set this straight away.

Until you do this, Google will usually keep treating Medium as the original. Nothing breaks either way.

## 4. Google Business Profile (15 min)

Free, and it puts you in local searches and on Google Maps.

1. Go to **business.google.com** → **Add business** → name: **Ronak Bhatt – Software Developer**.
2. Category: **Software company**. Add **Website designer** as a secondary category.
3. Choose **"I deliver goods and services to my customers"** and **hide the street address** (service-area business). Service area: London, Ontario; Ontario; Canada.
4. Website: `https://www.ronakbhatt.in`. Phone: +1 (817) 947-5211.
5. Description (under 750 characters, ready to paste):

> Full-stack web developer based in London, Ontario, with 8+ years building and maintaining web applications in Ruby on Rails, React, Next.js and Node.js. I help startups and established businesses ship new products, upgrade legacy Rails applications safely, fix performance problems, and keep their apps secure and up to date. I work remotely with teams across Canada, the US, the UK and Europe. Upwork Top Rated Plus. Services include Rails upgrades and maintenance, custom web application development, React and Next.js front-ends, API development and code review. Book a free call at ronakbhatt.in.

6. Ask 2–3 past clients to leave a Google review (link from the profile's **Ask for reviews** button).

## 5. LinkedIn and Upwork: match the website (10 min)

**LinkedIn headline** (220 characters max):
> Ruby on Rails & React Full-Stack Developer · Rails upgrades, maintenance & new builds · 8+ years · Upwork Top Rated Plus · ronakbhatt.in

**LinkedIn "About"** (first lines matter most):
> I help teams ship and maintain web products built on Ruby on Rails and React.
>
> Over 8+ years I've built, upgraded and maintained applications for companies in Canada, the US, the UK and Europe, most recently as a full-stack developer at Crowdlinker and previously as Lead Software Developer at All Pro IFM.
>
> What I do most:
> • Upgrade legacy Rails apps to current versions without breaking them
> • Build new Rails and Next.js applications
> • Maintain and speed up existing products
>
> I take on freelance and contract projects. Book a call or send a brief: https://www.ronakbhatt.in

Also add `https://www.ronakbhatt.in` as the **Website** in Contact info, and add a **Featured** link to `/services/rails-upgrade`.

**Upwork profile title:**
> Senior Ruby on Rails & React Developer | Rails Upgrades | Next.js Keep Upwork's own rules in mind: don't put contact details or off-platform links in the overview.

## 6. Ask clients to use their names (5 min to send)

Most reviews on the site say "Verified client". Named reviews convert much better. Send this to 4–5 happy clients:

> Hi {name},
>
> Hope all's well! I'm refreshing my website (ronakbhatt.in) and would love to feature the kind words you left on Upwork:
>
> "{their review}"
>
> Would you be OK with me showing it with your name, role and company, and optionally a photo or your company logo? Totally fine if you'd rather stay anonymous.
>
> Thanks either way,
> Ronak

When they reply, send the details and I'll update `data/testimonials.js`.

## 7. Case studies: send me rough notes (10 min per project)

These are the most persuasive pages a freelancer can have. For 2–3 projects, answer these in a few lines each. Rough is fine; I'll write them up.

```
Project / client (or "a US facilities company" if confidential):
Their problem, in one or two sentences:
What you built or changed:
Tech used:
How long it took / your role:
Result (a number if possible: faster, fewer bugs, revenue, users, time saved):
Can I link to it or show screenshots? (yes/no)
Quote from the client (optional):
```

Good candidates: **All Pro IFM** (lead developer, long engagement), **Bulletproof Cyber Security**, **NSoJ** (multi-year), or any Rails upgrade you've done.
