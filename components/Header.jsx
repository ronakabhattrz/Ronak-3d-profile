import Image from "next/image";
import Link from "next/link";
import Socials from "../components/Socials";

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-40 w-full border-b border-white/[0.05] bg-primary/85 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-y-3 sm:gap-y-0 py-4 sm:py-5">
          {/* logo */}
          <Link href="/" className="inline-block shrink-0">
            <Image
              src="/logo.png"
              alt="Ronak Bhatt — home"
              width={220}
              height={48}
              priority
              quality={86}
              sizes="(max-width: 640px) 160px, 220px"
            />
          </Link>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2 w-full sm:w-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-accent hover:text-accent/90 transition-colors"
            >
              Blog
            </Link>
            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
