/** Canonical site URL (for links, canonical meta, absolute OG/schema URLs) */
export const SITE_URL = "https://www.ronakbhatt.in";

/** Files must exist under /public — same path as below */
export const siteMeta = {
  title:
    "Ronak Bhatt | Full Stack Developer | Ruby on Rails | React | TypeScript | Next.js | AWS",
  description:
    "Ronak Bhatt is a Full Stack software engineer specializing in Ruby on Rails, React, TypeScript, and Next.js. With expertise in AWS and modern web technologies, delivering scalable solutions.",
  keywords:
    "Ronak Bhatt, Full Stack Developer, Ruby on Rails, React, TypeScript, Next.js, AWS, Web Development, Software Engineer, Canada, London Ontario",
  /** Served from /public/preview.png (1200×630 recommended) */
  ogImage: `${SITE_URL}/preview.png`,
  /** Served from /public/resume.pdf */
  resumeUrl: "/resume.pdf",
  themeColor: "#070709",
  formspreeId: "xldreqgl",
  /**
   * Scheduling link (Calendly, Cal.com, Google appointment page…). Leave empty
   * to hide every "Book a call" button; set it and they appear site-wide.
   */
  bookingUrl: "",
  /** Articles — profile on Medium; full posts open there from /blog */
  mediumUrl: "https://medium.com/@ronakabhattrz",
  /** RSS — used at build/ISR time to list posts on /blog */
  mediumFeedUrl: "https://medium.com/feed/@ronakabhattrz",
  gaId: "G-7HQD491GVL",
  hotjar: { hjid: 5221336, hjsv: 6 },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Ronak Bhatt",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specializing in Ruby on Rails, React, TypeScript, and Next.js with 8+ years of experience building scalable web applications.",
  url: `${SITE_URL}/`,
  sameAs: [
    "https://www.facebook.com/RonakbhattRz",
    "https://twitter.com/ronakabhattrz",
    "https://www.instagram.com/ronakbhattrz/",
    "https://www.youtube.com/channel/UC_jKbr7ACXE7LsuDoLaCJcw",
    "https://www.linkedin.com/in/ronakabhattrz/",
    "https://github.com/ronakabhattrz",
    "https://medium.com/@ronakabhattrz",
  ],
  image: `${SITE_URL}/avatar.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressRegion: "ON",
    postalCode: "N6A 5H3",
    addressCountry: "CA",
  },
  email: "ronakabhattrz@gmail.com",
  birthDate: "1994-02-02",
  birthPlace: { "@type": "Place", name: "Ahmedabad" },
  nationality: { "@type": "Country", name: "India" },
  worksFor: {
    "@type": "Organization",
    name: "Crowdlinker",
    url: "https://crowdlinker.com",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Sal Institute of Technology & Engineering Research",
    },
  ],
  knowsLanguage: [
    { "@type": "Language", name: "English" },
  ],
  knowsAbout: [
    "Ruby on Rails",
    "React",
    "TypeScript",
    "Next.js",
    "AWS",
    "JavaScript",
    "Vue.js",
    "Node.js",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Git",
    "GraphQL",
    "Redis",
    "Python",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Upwork Top Rated Plus Developer",
      credentialCategory: "Freelance Excellence",
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Ronak Bhatt Portfolio",
  url: `${SITE_URL}/`,
  description:
    "Personal portfolio website of Ronak Bhatt, Full Stack Developer",
  inLanguage: "en-CA",
  image: `${SITE_URL}/preview.png`,
  author: { "@id": `${SITE_URL}/#person` },
};
