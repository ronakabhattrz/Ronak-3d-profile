/** Entrance animation: short, soft offset with an ease-out curve. */
export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 24 : direction === "down" ? -24 : 0,
      x: direction === "left" ? 24 : direction === "right" ? -24 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.7,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};
