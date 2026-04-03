import Image from "next/image";

/**
 * Responsive portrait — scales down on small screens, full hero size on xl+.
 * Parent can wrap with `hidden xl:flex` (About sidebar) or show everywhere (Home).
 */
const Avatar = ({
  className = "",
  priority = false,
  sizes = "(max-width: 1279px) min(420px, 78vw), min(737px, 45vw)",
}) => {
  return (
    <div
      className={`flex justify-center xl:justify-end items-end pointer-events-none select-none ${className}`}
    >
      <Image
        src="/avatar.png"
        alt="Ronak Bhatt"
        width={737}
        height={678}
        priority={priority}
        quality={82}
        sizes={sizes}
        className="h-auto max-h-[38vh] w-[min(78vw,280px)] max-w-full object-contain object-bottom translate-z-0 sm:max-h-[42vh] sm:w-[min(72vw,340px)] md:max-h-[48vh] md:w-[min(65vw,420px)] xl:max-h-[678px] xl:w-full xl:max-w-[737px]"
      />
    </div>
  );
};

export default Avatar;
