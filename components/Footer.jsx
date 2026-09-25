import Link from "next/link";
import { useRouter } from "next/router";
import { HiArrowUpRight } from "react-icons/hi2";

import BookCallButton from "./BookCallButton";
import Socials from "./Socials";
import { navData } from "./Nav";

const Footer = () => {
  const { pathname } = useRouter();
  const showCta = pathname !== "/contact";

  return (
    <footer className="relative z-[1] pb-32 pt-8 xl:pb-10">
      <div className="container max-w-content">
        {showCta ? (
          <div className="card mb-10 overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-40 mx-auto h-72 w-[36rem] max-w-full rounded-full bg-accent/25 blur-[100px]"
            />
            <p className="eyebrow justify-center">Open to new work</p>
            <h2 className="h2 mx-auto mt-5 max-w-3xl">
              Have a product in mind? <span className="em">Let&apos;s build it.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base">
              Rails apps, React front-ends, upgrades, or a second pair of hands on
              a tricky codebase.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn-primary">
                Start a conversation
                <HiArrowUpRight aria-hidden />
              </Link>
              <BookCallButton />
              <a href="mailto:ronakabhattrz@gmail.com" className="btn-ghost">
                ronakabhattrz@gmail.com
              </a>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-6 border-t border-white/[0.07] pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-zinc-300">Ronak Bhatt</p>
            <p className="text-sm text-zinc-400">
              Full-stack developer · London, Ontario
            </p>
          </div>
          <nav aria-label="Footer" className="hidden lg:block">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
              {navData.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="capitalize transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Socials />
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
          © {new Date().getFullYear()} Ronak Bhatt. Built with Next.js.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
