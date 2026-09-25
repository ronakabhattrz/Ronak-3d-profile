import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Script from "next/script";
import { useRouter } from "next/router";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Layout from "../components/Layout";
/** Vercel Web Analytics — Pages Router: see README “Vercel Web Analytics — Get Started”. */
import VercelAnalytics from "../components/VercelAnalytics";
import { siteMeta } from "../lib/site";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteMeta.gaId}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteMeta.gaId}');
        `}
      </Script>
      <Script id="hotjar-init" strategy="lazyOnload">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${siteMeta.hotjar.hjid},hjsv:${siteMeta.hotjar.hjsv}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>

      <MotionConfig reducedMotion="user">
        <Layout>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "instant" })
            }
          >
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </MotionConfig>
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
