import { Sora } from "next/font/google";
import Head from "next/head";

import Header from "../components/Header";
import Nav from "../components/Nav";
import TopLeftImg from "../components/TopLeftImg";
import {
  SITE_URL,
  personJsonLd,
  siteMeta,
  websiteJsonLd,
} from "../lib/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const Layout = ({ children }) => {
  const canonical = SITE_URL;

  return (
    <main
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      <Head>
        <title>{siteMeta.title}</title>
        <meta name="description" content={siteMeta.description} />
        <meta name="keywords" content={siteMeta.keywords} />
        <meta name="author" content="Ronak Bhatt" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content={siteMeta.themeColor} />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content="Ronak Bhatt | Full Stack Developer" />
        <meta property="og:description" content={siteMeta.description} />
        <meta property="og:image" content={siteMeta.ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonical} />
        <meta name="twitter:title" content="Ronak Bhatt | Full Stack Developer" />
        <meta name="twitter:description" content={siteMeta.description} />
        <meta name="twitter:image" content={siteMeta.ogImage} />

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

      {children}
    </main>
  );
};

export default Layout;
