import Link from "next/link";

import {
  RiFacebookCircleLine,
  RiGithubLine,
  RiGlobalLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiMailLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from "react-icons/ri";

export const socialData = [
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/ronakabhattrz",
    Icon: RiLinkedinLine,
    highlight: true,
    kind: "external",
  },
  {
    name: "GitHub",
    link: "https://github.com/ronakabhattrz",
    Icon: RiGithubLine,
    highlight: false,
    kind: "external",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/ronakabhattrz",
    Icon: RiTwitterXLine,
    highlight: false,
    kind: "external",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/ronakbhattrz/",
    Icon: RiInstagramLine,
    highlight: false,
    kind: "external",
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/RonakbhattRz",
    Icon: RiFacebookCircleLine,
    highlight: false,
    kind: "external",
  },
  {
    name: "YouTube",
    link: "https://www.youtube.com/channel/UC_jKbr7ACXE7LsuDoLaCJcw",
    Icon: RiYoutubeLine,
    highlight: false,
    kind: "external",
  },
  {
    name: "Website",
    link: "https://www.ronakbhatt.in/",
    Icon: RiGlobalLine,
    highlight: false,
    kind: "external",
  },
  {
    name: "Email",
    link: "mailto:ronakabhattrz@gmail.com",
    Icon: RiMailLine,
    highlight: false,
    kind: "mailto",
  },
];

const linkClass = (highlight) =>
  `${
    highlight
      ? "bg-accent rounded-full p-[5px] hover:text-white"
      : "hover:text-accent"
  } transition-all duration-300`;

const Socials = () => {
  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-4 gap-y-2 text-base xl:text-lg max-w-[340px] lg:max-w-none">
      {socialData.map((social, i) =>
        social.kind === "mailto" ? (
          <a
            key={i}
            title={social.name}
            href={social.link}
            className={linkClass(social.highlight)}
          >
            <social.Icon aria-hidden />
            <span className="sr-only">{social.name}</span>
          </a>
        ) : (
          <Link
            key={i}
            title={social.name}
            href={social.link}
            target="_blank"
            rel="noreferrer noopener"
            className={linkClass(social.highlight)}
          >
            <social.Icon aria-hidden />
            <span className="sr-only">{social.name}</span>
          </Link>
        )
      )}
    </div>
  );
};

export default Socials;
