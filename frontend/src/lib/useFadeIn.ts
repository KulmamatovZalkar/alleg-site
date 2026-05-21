"use client";

import { useReducedMotion } from "framer-motion";

import { useIsMobile } from "./useIsMobile";

/**
 * Возвращает props для framer-motion `motion.div` с fade-in анимацией.
 * На мобиле и при reduce-motion возвращает пустые props — элемент рендерится
 * сразу без анимации, что устраняет jank на iOS/Android Safari.
 *
 * Использование:
 *   const fade = useFadeIn(0.1);
 *   <motion.div {...fade}>...</motion.div>
 */
export function useFadeIn(delay = 0) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduce || isMobile) {
    return {} as const;
  }

  return {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1, margin: "0px 0px -8% 0px" },
    transition: {
      duration: 0.4,
      delay: Math.min(delay, 0.25),
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
}
