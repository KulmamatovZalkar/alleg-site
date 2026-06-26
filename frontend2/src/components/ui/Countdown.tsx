"use client";

import { useEffect, useState } from "react";

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, expired: true };
  const total = Math.floor(ms / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
    expired: false,
  };
}

export default function Countdown({ deadline }: { deadline: string }) {
  const target = new Date(deadline);
  const [time, setTime] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (time.expired) return null;

  const cells: Array<[number, string]> = [
    [time.d, "дней"],
    [time.h, "часов"],
    [time.m, "минут"],
    [time.s, "секунд"],
  ];

  return (
    <div className="flex gap-3 sm:gap-5">
      {cells.map(([val, label]) => (
        <div
          key={label}
          className="flex min-w-[64px] flex-col items-center rounded-2xl border border-gold-300/30 bg-gold-300/[0.08] px-3 py-3 sm:min-w-[88px] sm:px-5 sm:py-4"
        >
          <div className="font-serif text-3xl text-gold-600 sm:text-5xl">
            {String(val).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-wider text-body-muted sm:text-xs">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
