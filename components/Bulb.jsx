import Image from "next/image";

const Bulb = () => {
  return (
    <div className="absolute -left-20 sm:-left-28 xl:-left-36 -bottom-8 sm:-bottom-12 rotate-12 mix-blend-color-dodge animate-pulse duration-75 z-10 w-[140px] sm:w-[180px] xl:w-[260px] select-none pointer-events-none">
      <Image
        src="/bulb.png"
        alt="bulb"
        width={260}
        height={200}
        className="w-full h-full"
      />
    </div>
  );
};

export default Bulb;
