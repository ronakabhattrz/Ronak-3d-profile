import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  getSeoForPath,
  ogSocial,
} from "../lib/seo";
import { personJsonLd, siteMeta, websiteJsonLd } from "../lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: "italic",
  display: "swap",
});

const Layout = ({ children }) => {
  const router = useRouter();
  const seo = getSeoForPath(router.pathname);
  const isNotFound = router.pathname === "/404";
  const robotsContent = isNotFound
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <div
      className={`${geist.variable} ${geistMono.variable} ${serif.variable} relative flex min-h-screen flex-col font-sans`}
    >
      <Head key={router.pathname}>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="robots" content={robotsContent} />
        <meta name="author" content="Ronak Bhatt" />
        <meta name="theme-color" content={siteMeta.themeColor} />
        <link rel="canonical" href={seo.canonical} />

        <meta property="og:type" content={ogSocial.type} />
        <meta property="og:site_name" content={ogSocial.siteName} />
        <meta property="og:locale" content={ogSocial.locale} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:image:secure_url" content={seo.ogImage} />
        <meta property="og:image:width" content={String(OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(OG_IMAGE_HEIGHT)} />
        <meta property="og:image:alt" content={seo.ogImageAlt} />
        <meta property="og:image:type" content="image/png" />

        <meta name="twitter:card" content={ogSocial.twitterCard} />
        <meta name="twitter:site" content={ogSocial.twitterSite} />
        <meta name="twitter:creator" content={ogSocial.twitterCreator} />
        <meta name="twitter:url" content={seo.canonical} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />
        <meta name="twitter:image:alt" content={seo.ogImageAlt} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </Head>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>
      <div aria-hidden className="site-backdrop" />
      <Header />

      <main
        id="main"
        tabIndex={-1}
        className="relative z-[1] flex-1 overflow-x-clip focus:outline-none focus-visible:ring-0"
      >
        {children}
      </main>

      <Footer />
      <Nav />
    </div>
  );
};

export default Layout;
