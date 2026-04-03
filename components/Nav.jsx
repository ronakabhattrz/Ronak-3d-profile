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

const Nav = () => {
  const router = useRouter();
  const pathname = router.pathname || "/";

  return (
    <nav
      className="flex flex-col items-center justify-end xl:justify-center gap-y-4 fixed z-50 w-full inset-x-0 bottom-0 top-auto h-auto xl:inset-x-auto xl:right-[2%] xl:top-0 xl:bottom-0 xl:w-16 xl:max-w-md xl:h-screen pointer-events-none xl:pointer-events-auto"
      aria-label="Primary"
    >
      <div className="pointer-events-auto flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 min-h-[72px] sm:min-h-[80px] xl:h-max py-3 sm:py-4 xl:py-8 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] xl:pb-8 bg-white/10 backdrop-blur-md border-t border-white/[0.08] xl:border-t-0 text-3xl xl:text-xl xl:rounded-full">
        {navData.map((item, i) => {
          const active = item.path === pathname;
          const Icon = item.Icon;
          return (
            <Link
              className={`relative flex items-center transition-all duration-300 hover:text-accent ${
                active ? "text-accent" : "text-white/90"
              } group`}
              href={item.path}
              key={i}
              aria-current={active ? "page" : undefined}
            >
              <span className="sr-only">{item.name}</span>
              <div
                role="tooltip"
                className="absolute right-0 hidden pr-14 xl:group-hover:flex"
              >
                <div className="relative flex items-center rounded-[3px] bg-white p-[6px] text-primary">
                  <div className="text-[12px] font-semibold capitalize leading-none">
                    {item.name}
                  </div>

                  <div
                    className="absolute -right-2 border-y-[6px] border-l-8 border-r-0 border-solid border-y-transparent border-l-white"
                    aria-hidden
                  />
                </div>
              </div>

              <span aria-hidden className="flex">
                <Icon />
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
