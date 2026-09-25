import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiArrowUpRight } from "react-icons/hi2";

import { DesktopNav } from "../components/Nav";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex h-14 max-w-content items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-ink-900/75 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="inline-flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Ronak Bhatt — home"
            width={1219}
            height={126}
            priority
            quality={86}
            sizes="150px"
            className="h-auto w-[132px] sm:w-[150px]"
          />
        </Link>

        <DesktopNav />

        <Link href="/contact" className="btn-primary h-10 px-4 text-[13px]">
          Let&apos;s talk
          <HiArrowUpRight aria-hidden className="text-sm" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
