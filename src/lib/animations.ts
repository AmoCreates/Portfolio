import { Variants } from "framer-motion";

export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up",
  duration: number = 0.7,
  delay: number = 0
): Variants => {
  let x = 0;
  let y = 0;

  if (direction === "up") y = 30;
  if (direction === "down") y = -30;
  if (direction === "left") x = 30;
  if (direction === "right") x = -30;

  return {
    hidden: {
      opacity: 0,
      x,
      y,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration,
        delay,
      },
    },
  };
};

export const scaleIn = (
  duration: number = 0.6,
  delay: number = 0
): Variants => ({
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 120,
      duration,
      delay,
    },
  },
});

export const textRevealVariant: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 15,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};
