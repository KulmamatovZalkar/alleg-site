"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Icon from "@/components/ui/Icon";
import { useFadeIn } from "@/lib/useFadeIn";
import type { ServiceDTO } from "@/types/api";

export default function Services({ items }: { items: ServiceDTO[] }) {
  const n = items.length;
  // На sm — 2 cols, на lg — 3 cols. Определяем последние "сиротки", которые
  // должны растягиваться, чтобы строка выглядела ровно.
  const smLeftover = n % 2; // 0 или 1
  const lgLeftover = n % 3; // 0, 1 или 2

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((s, i) => {
        const isLast = i === n - 1;
        const isSecondLast = i === n - 2;

        // Базовая ячейка: 1 колонка из 2 на sm, 2 колонки из 6 на lg.
        let cls = "sm:col-span-1 lg:col-span-2";

        // На sm одна сиротка: растягиваем на 2 колонки.
        if (smLeftover === 1 && isLast) {
          cls = cls.replace("sm:col-span-1", "sm:col-span-2");
        }

        // На lg одна сиротка: растягиваем на 6 (= full row).
        if (lgLeftover === 1 && isLast) {
          cls = cls.replace("lg:col-span-2", "lg:col-span-6");
        }
        // На lg две сиротки: каждая по 3 (= половина строки).
        if (lgLeftover === 2 && (isLast || isSecondLast)) {
          cls = cls.replace("lg:col-span-2", "lg:col-span-3");
        }

        return (
          <ServiceCard
            key={s.id}
            service={s}
            delay={i * 0.05}
            extraClassName={cls}
          />
        );
      })}
    </div>
  );
}

function ServiceCard({
  service: s,
  delay,
  extraClassName = "",
}: {
  service: ServiceDTO;
  delay: number;
  extraClassName?: string;
}) {
  const fade = useFadeIn(delay);
  return (
    <motion.article
      {...fade}
      className={`card-surface group flex h-full flex-col p-6 sm:p-7 ${extraClassName}`}
    >
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-300/25 bg-gold-300/[0.06] text-gold-200">
          <Icon name={s.icon} size={20} />
        </span>
        <ArrowUpRight
          size={18}
          className="text-white/30 transition group-hover:text-gold-300"
        />
      </div>

      <h3 className="font-serif text-xl text-white sm:text-2xl">{s.title}</h3>
      <p className="mt-3 text-sm text-white/60">{s.short_description}</p>

      {s.formula && (
        <div className="mt-5 inline-flex w-fit rounded-full border border-gold-300/30 bg-gold-300/[0.08] px-3 py-1.5 text-[10px] uppercase tracking-wider text-gold-200 sm:mt-6 sm:px-4 sm:text-xs">
          {s.formula}
        </div>
      )}
    </motion.article>
  );
}
