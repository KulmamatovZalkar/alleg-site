"use client";

import { useEffect, useState } from "react";

/**
 * Хук-флаг "мобильное устройство" (touch + узкая ширина).
 * Дефолтит true для SSR — чтобы НЕ рендерить тяжёлые анимации в HTML.
 */
export function useIsMobile(breakpoint = 1024): boolean {
  // SSR-friendly default: считаем мобильным до hydration.
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    if (mql.addEventListener) mql.addEventListener("change", update);
    else mql.addListener(update);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", update);
      else mql.removeListener(update);
    };
  }, [breakpoint]);

  return isMobile;
}
