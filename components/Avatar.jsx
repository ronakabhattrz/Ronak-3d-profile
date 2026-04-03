import Image from "next/image";

/**
 * Responsive portrait — scales down on small screens, full hero size on xl+.
 * Parent can wrap with `hidden xl:flex` (About sidebar) or show everywhere (Home).
 */
const Avatar = ({ className = "" }) => {
  return (
    <div
      className={`flex justify-center xl:justify-end items-end pointer-events-none select-none ${className}`}
    >
      <Image
        src="/avatar.png"
        alt="Ronak Bhatt"
        width={737}
        height={678}
        priority
        className="h-auto w-[min(78vw,280px)] sm:w-[min(72vw,340px)] md:w-[min(65vw,420px)] xl:w-full xl:max-w-[737px] max-h-[38vh] sm:max-h-[42vh] md:max-h-[48vh] xl:max-h-[678px] object-contain object-bottom translate-z-0"
      />
    </div>
  );
};

export default Avatar;
