/** Canonical site config (aligned with ronakbhatt.in) */
export const SITE_URL = "https://www.ronakbhatt.in";
export const ASSET = `${SITE_URL}/assets/images`;

export const siteMeta = {
  title:
    "Ronak Bhatt | Full Stack Developer | Ruby on Rails | React | TypeScript | Next.js | AWS",
  description:
    "Ronak Bhatt is a Full Stack software engineer specializing in Ruby on Rails, React, TypeScript, and Next.js. With expertise in AWS and modern web technologies, delivering scalable solutions.",
  keywords:
    "Ronak Bhatt, Full Stack Developer, Ruby on Rails, React, TypeScript, Next.js, AWS, Web Development, Software Engineer, India, Ahmedabad",
  ogImage: `${SITE_URL}/assets/images/preview.png`,
  resumeUrl: `${SITE_URL}/assets/resume.pdf`,
  themeColor: "#ffdc70",
  formspreeId: "xldreqgl",
  gaId: "G-7HQD491GVL",
  hotjar: { hjid: 5221336, hjsv: 6 },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ronak Bhatt",
  jobTitle: "Full Stack Developer",
  url: `${SITE_URL}/`,
  sameAs: [
    "https://www.facebook.com/RonakbhattRz",
    "https://twitter.com/ronakabhattrz",
    "https://www.instagram.com/ronakbhattrz/",
    "https://www.youtube.com/channel/UC_jKbr7ACXE7LsuDoLaCJcw",
    "https://www.linkedin.com/in/ronakabhattrz/",
    "https://github.com/ronakabhattrz",
  ],
  image: `${SITE_URL}/assets/images/ronak.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "LONDON",
    addressRegion: "ONTRARIO",
    postalCode: "N6A 5H3",
    addressCountry: "CA",
  },
  email: "ronakabhattrz@gmail.com",
  birthDate: "1994-02-02",
  birthPlace: { "@type": "Place", name: "Ahmedabad" },
  nationality: "India",
  knowsAbout: [
    "Ruby on Rails",
    "React",
    "TypeScript",
    "Next.js",
    "AWS",
    "JavaScript",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Git",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ronak Bhatt Portfolio",
  url: `${SITE_URL}/`,
  description:
    "Personal portfolio website of Ronak Bhatt, Full Stack Developer",
  author: {
    "@type": "Person",
    name: "Ronak Bhatt",
  },
};
