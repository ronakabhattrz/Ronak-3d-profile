import { siteMeta } from "../lib/site";
import {
  RiFacebookCircleLine,
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiMailLine,
  RiMediumLine,
  RiTwitterXLine,
} from "react-icons/ri";

export const socialData = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/ronakabhattrz",
    Icon: RiLinkedinLine,
    kind: "external",
  },
  {
    name: "GitHub",
    link: "https://github.com/ronakabhattrz",
    Icon: RiGithubLine,
    kind: "external",
  },
  {
    name: "Medium",
    link: siteMeta.mediumUrl,
    Icon: RiMediumLine,
    kind: "external",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/ronakabhattrz",
    Icon: RiTwitterXLine,
    kind: "external",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/ronakbhattrz/",
    Icon: RiInstagramLine,
    kind: "external",
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/RonakbhattRz",
    Icon: RiFacebookCircleLine,
    kind: "external",
  },
  {
    name: "Email",
    link: "mailto:ronakabhattrz@gmail.com",
    Icon: RiMailLine,
    kind: "mailto",
  },
];

const Socials = ({ className = "" }) => {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socialData.map((social) => (
        <li key={social.name}>
          <a
            title={social.name}
            href={social.link}
            {...(social.kind === "external"
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-lg text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-white"
          >
            <social.Icon aria-hidden />
            <span className="sr-only">{social.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
