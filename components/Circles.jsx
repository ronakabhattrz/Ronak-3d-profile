import Image from "next/image";

const Circles = () => {
  return (
    <div className="w-[140px] sm:w-[180px] xl:w-[300px] absolute -right-8 sm:-right-12 xl:-right-16 -bottom-2 mix-blend-color-dodge animate-pulse duration-75 z-10">
      <Image
        src="/circles.png"
        alt="circles"
        width={260}
        height={200}
        className="w-full h-full"
      />
    </div>
  );
};

export default Circles;
