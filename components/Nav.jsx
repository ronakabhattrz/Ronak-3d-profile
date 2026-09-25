import Link from "next/link";
import { useRouter } from "next/router";

// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
  HiNewspaper,
} from "react-icons/hi2";

export const navData = [
  { name: "home", path: "/", Icon: HiHome },
  { name: "about", path: "/about", Icon: HiUser },
  { name: "services", path: "/services", Icon: HiRectangleGroup },
  { name: "work", path: "/work", Icon: HiViewColumns },
  { name: "blog", path: "/blog", Icon: HiNewspaper },
  {
    name: "testimonials",
    path: "/testimonials",
    Icon: HiChatBubbleBottomCenterText,
  },
  {
    name: "contact",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

/** Desktop: inline text links rendered inside the header pill. */
export const DesktopNav = () => {
  const { pathname = "/" } = useRouter();

  return (
    <nav aria-label="Primary" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        {navData.map((item) => {
          const active = item.path === pathname;
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium capitalize transition-colors ${
                  active
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

/** Mobile / tablet: bottom dock with icon + label. */
const Nav = () => {
  const { pathname = "/" } = useRouter();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] xl:hidden"
    >
      <ul className="mx-auto flex max-w-lg items-center justify-between rounded-2xl border border-white/10 bg-ink-900/85 p-1.5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {navData.map((item) => {
          const active = item.path === pathname;
          const Icon = item.Icon;
          return (
            <li key={item.path} className="flex-1">
              <Link
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium capitalize transition-colors ${
                  active
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                <Icon
                  aria-hidden
                  className={`text-lg ${active ? "text-accent" : ""}`}
                />
                <span className="max-[380px]:sr-only">
                  {item.name === "testimonials" ? "reviews" : item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
