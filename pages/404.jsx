import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

import { navData } from "../components/Nav";

const NotFound = () => {
  return (
    <div className="container flex min-h-[80svh] max-w-content flex-col items-center justify-center pb-16 pt-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="h2 mt-5">
        This page <span className="em">wandered off.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-md text-base">
        The link may be broken or the page may have moved. Try one of these
        instead.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <HiArrowLeft aria-hidden />
        Back home
      </Link>
      <ul className="mt-10 flex flex-wrap justify-center gap-2">
        {navData
          .filter((item) => item.path !== "/")
          .map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="chip capitalize hover:border-white/25 hover:text-white">
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NotFound;
