import Image from "next/image";

/**
 * Portrait card: framed avatar over a soft accent glow, with a couple of
 * floating credential chips. Used in the Home hero and the About page.
 */
const Avatar = ({ className = "", priority = false, showChips = true }) => {
  return (
    <div className={`relative mx-auto w-full max-w-[460px] ${className}`}>
      <div
        aria-hidden
        className="absolute inset-[12%] rounded-full bg-accent/40 blur-[90px]"
      />
      <div className="card relative aspect-[4/5] overflow-hidden rounded-[2rem]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(241,48,36,0.28),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]"
        />
        <Image
          src="/avatar.png"
          alt="Ronak Bhatt"
          fill
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          quality={82}
          sizes="(max-width: 640px) 90vw, 460px"
          className="object-cover object-[50%_15%] translate-z-0 [mask-image:linear-gradient(to_bottom,#000_75%,transparent)]"
        />
      </div>

      {showChips ? (
        <>
          <div className="absolute -left-3 top-[18%] animate-float rounded-2xl border border-white/10 bg-ink-900/85 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-left-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Upwork
            </p>
            <p className="text-sm font-medium text-white">Top Rated Plus</p>
          </div>
          <div className="absolute -right-3 bottom-[14%] animate-float rounded-2xl border border-white/10 bg-ink-900/85 px-4 py-3 shadow-2xl backdrop-blur-xl [animation-delay:-3s] sm:-right-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Currently
            </p>
            <p className="text-sm font-medium text-white">
              Full-stack @ Crowdlinker
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Avatar;
