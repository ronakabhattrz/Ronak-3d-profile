import { Sora } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  getSeoForPath,
  ogSocial,
} from "../lib/seo";
import { personJsonLd, siteMeta, websiteJsonLd } from "../lib/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  const router = useRouter();
  const seo = getSeoForPath(router.pathname);
  const isNotFound = router.pathname === "/404";
  const robotsContent = isNotFound
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <main
      className={`page flex min-h-0 flex-col bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
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

      <TopLeftImg />
      <Nav />
      <Header />

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-y-contain max-xl:pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
        {children}
      </div>
    </main>
  );
};

export default Layout;
