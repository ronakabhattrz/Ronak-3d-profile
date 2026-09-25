/**
 * Service landing pages (/services/<slug>). Each entry drives the page,
 * its SEO entry (lib/seo.js), JSON-LD, sitemap and nav links.
 * Keep claims factual — everything here is public.
 */
import {
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineCodeBracket,
  HiOutlineCube,
  HiOutlineDevicePhoneMobile,
  HiOutlineGlobeAmericas,
  HiOutlineMagnifyingGlass,
  HiOutlinePuzzlePiece,
  HiOutlineShieldCheck,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

export const servicePages = {
  "rails-upgrade": {
    slug: "rails-upgrade",
    navLabel: "Rails upgrades",
    contactService: "rails-upgrade",
    eyebrow: "Rails upgrade services",
    title: "Upgrade your Rails app",
    titleEm: "without breaking it.",
    lead: "Stuck on an old version of Rails? I upgrade existing Ruby on Rails applications and test them thoroughly, so every feature your users rely on still works afterwards. 8+ years of Rails, Upwork Top Rated Plus.",
    cta: "Get an upgrade quote",
    seo: {
      title: "Ruby on Rails Upgrade Services",
      description:
        "Upgrade your Ruby on Rails app to a current version without breaking it. Codebase review, step-by-step upgrade, testing and deployment. Fixed quote.",
      keywords:
        "Rails upgrade, upgrade Ruby on Rails, Rails 7 upgrade, Rails 8 upgrade, legacy Rails, Rails consultant",
      ogTitle: "Upgrade your Rails app without breaking it.",
      ogEyebrow: "Rails upgrades",
    },
    schema: {
      name: "Ruby on Rails upgrade services",
      serviceType: "Ruby on Rails upgrade",
      description:
        "Upgrade an existing Ruby on Rails application to a current version, tested so every existing feature keeps working.",
    },
    reasons: [
      {
        Icon: HiOutlineShieldCheck,
        title: "Security fixes",
        text: "Older Rails versions stop receiving security patches. Staying current keeps your app and your users' data protected.",
      },
      {
        Icon: HiOutlinePuzzlePiece,
        title: "Gem & Ruby compatibility",
        text: "Gems and Ruby versions move on. An outdated framework makes every new dependency, integration and hire harder.",
      },
      {
        Icon: HiOutlineBolt,
        title: "Faster, easier development",
        text: "Newer Rails brings better tooling and defaults, so your team ships features instead of fighting the framework.",
      },
    ],
    includedIntro:
      "Every upgrade is scoped to your app, but these are the parts that make it safe.",
    included: [
      "Review of the codebase, Ruby version and gem dependencies",
      "A step-by-step upgrade plan, one version at a time",
      "Gem updates and deprecation fixes along the way",
      "Tests around critical flows where coverage is thin",
      "Verification that every existing feature still works",
      "Refactoring and CI/CD improvements where they help",
      "Deployment support, including Heroku",
      "Handover notes on what changed and why",
    ],
    steps: [
      { title: "Share your app", text: "Tell me the current Rails and Ruby versions and give read access to the repo." },
      { title: "Review & quote", text: "I review the codebase and dependencies, then send a plan and a fixed quote." },
      { title: "Upgrade & test", text: "The upgrade happens in small, tested steps so nothing breaks silently." },
      { title: "Deploy & hand over", text: "Ship to production, confirm everything works, and walk you through the changes." },
    ],
    reviewsHeading: "What Rails clients",
    reviews: ["Custom Rails CMS (milestone)", "Long-term hourly", "Swagger API UI (follow-up)"],
    pricing: {
      title: "A fixed quote after a codebase review",
      text: "Every app is different, so upgrades are quoted once I've seen the code.",
      upworkMatch: /rails/i,
      upworkText: "For ongoing upkeep, Rails maintenance with Heroku starts",
    },
    faqMatch: /upgrade|cost|get started/i,
    resource: true,
  },

  "rails-maintenance": {
    slug: "rails-maintenance",
    navLabel: "Rails maintenance",
    contactService: "rails-upgrade",
    eyebrow: "Rails maintenance & support",
    title: "Keep your Rails app",
    titleEm: "healthy and moving.",
    lead: "Ongoing maintenance for Ruby on Rails applications: dependency and security updates, bug fixes, small features and deploys, handled by a Rails developer with 8+ years of experience.",
    cta: "Discuss maintenance",
    seo: {
      title: "Ruby on Rails Maintenance & Support",
      description:
        "Ongoing Ruby on Rails maintenance: gem and security updates, bug fixes, small features, Heroku deploys and performance checks. Packages from $599.",
      keywords:
        "Rails maintenance, Ruby on Rails support, Rails developer retainer, Heroku Rails support, Rails bug fixes",
      ogTitle: "Keep your Rails app healthy and moving.",
      ogEyebrow: "Rails maintenance",
    },
    schema: {
      name: "Ruby on Rails maintenance and support",
      serviceType: "Ruby on Rails maintenance",
      description:
        "Ongoing maintenance for Ruby on Rails applications: dependency and security updates, bug fixes, small features and deployments.",
    },
    reasons: [
      {
        Icon: HiOutlineShieldCheck,
        title: "Stay patched",
        text: "Regular gem and framework updates close security holes before they become incidents.",
      },
      {
        Icon: HiOutlineWrenchScrewdriver,
        title: "Fix issues early",
        text: "Small bugs and slow pages get handled while they're small, instead of piling up into a rewrite.",
      },
      {
        Icon: HiOutlineClock,
        title: "Free up your team",
        text: "Your team focuses on the roadmap while routine upkeep and deploys are taken care of.",
      },
    ],
    includedIntro: "Maintenance is scoped to what your app needs. Typical work includes:",
    included: [
      "Gem, Ruby and Rails patch updates",
      "Security fixes and dependency audits",
      "Bug fixes and small feature changes",
      "Deploys and environment upkeep, including Heroku",
      "Performance checks on slow pages and queries",
      "Keeping the test suite and CI green",
      "Clear notes on what changed each cycle",
      "A path to a larger upgrade when it's due",
    ],
    steps: [
      { title: "Tell me about the app", text: "Share the stack, hosting and what's currently painful." },
      { title: "Agree the scope", text: "Choose a fixed package or an ongoing arrangement that fits." },
      { title: "Regular upkeep", text: "Updates, fixes and deploys happen on a predictable rhythm." },
      { title: "Stay in the loop", text: "You get clear notes on what changed and what's coming up." },
    ],
    reviewsHeading: "What long-term clients",
    reviews: ["Long-term hourly", "RoR CMS changes", "Martijn Deinum"],
    pricing: {
      title: "Packages or an ongoing arrangement",
      text: "Pick a fixed-price package to start, or agree an ongoing arrangement for larger apps.",
      upworkMatch: /rails/i,
      upworkText: "Rails maintenance with Heroku starts",
    },
    faqMatch: /cost|get started|outside canada/i,
  },

  "hire-rails-developer": {
    slug: "hire-rails-developer",
    navLabel: "Hire a Rails developer",
    contactService: "role",
    eyebrow: "Hire a Ruby on Rails developer",
    title: "A senior Rails developer,",
    titleEm: "ready to join your team.",
    lead: "Ruby on Rails and JavaScript full-stack developer based in London, Ontario, Canada. 8+ years working with teams in Canada, the US, the UK and Europe, on freelance, contract and long-term engagements.",
    cta: "Tell me about the role",
    seo: {
      title: "Hire a Ruby on Rails Developer in Canada",
      description:
        "Hire a senior Ruby on Rails developer based in London, Ontario. 8+ years with Rails, React and AWS; freelance, contract or long-term. Upwork Top Rated Plus.",
      keywords:
        "hire Rails developer, hire Ruby on Rails developer, Rails developer Canada, freelance Rails developer, Rails contractor, remote Rails developer",
      ogTitle: "A senior Rails developer, ready to join your team.",
      ogEyebrow: "Hire a Rails developer",
    },
    schema: {
      name: "Ruby on Rails development (freelance and contract)",
      serviceType: "Ruby on Rails development",
      description:
        "Senior Ruby on Rails and JavaScript developer available for freelance, contract and long-term engagements.",
    },
    reasons: [
      {
        Icon: HiOutlineCodeBracket,
        title: "8+ years of Rails",
        text: "From freelance builds to leading teams at All Pro IFM and Crest Data Systems, and full-stack work at Crowdlinker.",
      },
      {
        Icon: HiOutlineGlobeAmericas,
        title: "Works in your timezone",
        text: "Based in Ontario on Eastern Time, with years of remote work for teams across North America and Europe.",
      },
      {
        Icon: HiOutlineChatBubbleLeftRight,
        title: "Clear communication",
        text: "Clients consistently mention responsiveness and communication. Read the reviews below.",
      },
    ],
    includedIntro: "What you get when you bring me onto a project:",
    included: [
      "Ruby on Rails backends: models, APIs, background jobs",
      "React, Vue and Next.js front-ends",
      "PostgreSQL, Redis and GraphQL",
      "Upgrades, refactoring and code review",
      "Docker, CI/CD and AWS or Heroku deploys",
      "Tests alongside every change",
      "Async updates and clear written communication",
      "Freelance, contract or long-term arrangements",
    ],
    steps: [
      { title: "Share the need", text: "A few lines on the project or role, the stack and the timeline." },
      { title: "Quick call", text: "A short conversation to check fit and agree how we'd work." },
      { title: "Agree terms", text: "Fixed scope, hourly or contract: whatever suits the work." },
      { title: "Start shipping", text: "Get access, get context, and start delivering in small, reviewed steps." },
    ],
    reviewsHeading: "What teams",
    reviews: ["Pat Russell", "Timothy Franklyn", "Long-term hourly"],
    pricing: {
      title: "Flexible ways to work together",
      text: "Fixed-price packages for defined work, or hourly and contract arrangements for ongoing development.",
      upworkMatch: null,
    },
    faqMatch: /kind of projects|outside canada|freelance or contract|get started/i,
  },

  "react-nextjs": {
    slug: "react-nextjs",
    navLabel: "React & Next.js",
    contactService: "new-build",
    eyebrow: "React & Next.js development",
    title: "Fast, modern front-ends",
    titleEm: "on a solid backend.",
    lead: "React, Vue and Next.js interfaces that are fast, accessible and pleasant to use, built by a full-stack developer who can also own the Rails or Node API behind them.",
    cta: "Start a front-end project",
    seo: {
      title: "React & Next.js Development",
      description:
        "React and Next.js development by a full-stack engineer: fast, accessible front-ends, landing pages and dashboards, plus the Rails or Node API behind them.",
      keywords:
        "React developer, Next.js developer, hire React developer, Next.js agency alternative, React Rails developer, landing page developer",
      ogTitle: "Fast, modern front-ends on a solid backend.",
      ogEyebrow: "React & Next.js",
    },
    schema: {
      name: "React and Next.js development",
      serviceType: "Front-end web development",
      description:
        "React, Vue and Next.js front-end development, with the Rails or Node API behind it.",
    },
    reasons: [
      {
        Icon: HiOutlineDevicePhoneMobile,
        title: "Fast on every device",
        text: "Responsive layouts and lean pages that load quickly on phones as well as desktops.",
      },
      {
        Icon: HiOutlineMagnifyingGlass,
        title: "Built to be found",
        text: "Server rendering, clean markup and structured data so pages are easy for search engines to read.",
      },
      {
        Icon: HiOutlineCube,
        title: "Full-stack by default",
        text: "One developer for the interface and the API, so features ship end to end without hand-offs.",
      },
    ],
    includedIntro: "Typical front-end work includes:",
    included: [
      "Landing pages and marketing sites",
      "Dashboards and internal tools",
      "React, Vue and Next.js apps",
      "Responsive, accessible UI",
      "SEO basics: metadata, structured data, sitemaps",
      "API integration with Rails, Node or third parties",
      "Performance tuning for faster loads",
      "Deploys on Vercel, Netlify, Heroku or AWS",
    ],
    steps: [
      { title: "Share the idea", text: "Goals, audience and any designs or examples you like." },
      { title: "Plan & quote", text: "Agree pages, features and a timeline, with a clear quote." },
      { title: "Build & review", text: "Regular previews so you see progress and can steer early." },
      { title: "Launch", text: "Deploy, check performance and SEO, and hand over." },
    ],
    reviewsHeading: "What clients",
    reviews: ["Martijn Deinum", "Aran Jagers", "React theme · CRM"],
    pricing: {
      title: "Start small or go big",
      text: "A focused landing page is a quick fixed-price job; larger apps are quoted after a short scoping call.",
      upworkMatch: /landing page/i,
      upworkText: "A modern landing page starts",
    },
    faqMatch: /kind of projects|cost|get started/i,
  },
};

export const servicePageList = Object.values(servicePages);
