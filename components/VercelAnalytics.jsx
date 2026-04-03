import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";

/**
 * Vercel Web Analytics (Pages Router).
 * Quickstart: https://vercel.com/docs/analytics/quickstart
 * `@vercel/analytics/next` is for App Router only; we use `react` + `next/router` here.
 */
export default function VercelAnalytics() {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  return (
    <Analytics
      framework="next"
      route={router.pathname}
      path={router.asPath}
    />
  );
}
