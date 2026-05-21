"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Gift } from "lucide-react";

import type { BusinessTourOfferDTO, SiteSettingsDTO } from "@/lib/api";
import Countdown from "@/components/ui/Countdown";

export default function BusinessTourBlock({
  offer,
  settings,
}: {
  offer: BusinessTourOfferDTO;
  settings: SiteSettingsDTO;
}) {
  const reduce = useReducedMotion();
  if (!offer.is_active) return null;

  const startDate = offer.start_date
    ? new Date(offer.start_date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Скоро";

  const waLink = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
    "Здравствуйте! Хочу узнать подробнее о Бизнес-туре в Дубае."
  )}`;

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-gold-300/20 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-800 p-7 sm:rounded-[2rem] sm:p-12">
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gold-500/20 blur-[100px] sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-wine-500/20 blur-[100px] sm:h-96 sm:w-96" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="eyebrow mb-3 sm:mb-4">Закрытый бизнес-тур</div>
        <h3 className="font-serif text-2xl text-white sm:text-4xl lg:text-5xl">
          3 дня, которые перепрошьют{" "}
          <span className="gold-text">ваш бизнес</span>
        </h3>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70 sm:mt-6 sm:gap-x-8 sm:gap-y-3 sm:text-base">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gold-300" />
            <span>Старт: {startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gold-300" />
            <span>{offer.location}</span>
          </div>
          <div className="text-sm">
            <span>{offer.format_text}</span>
          </div>
        </div>

        {offer.deadline && (
          <div className="mt-7 sm:mt-8">
            <div className="eyebrow mb-3">До конца раннего бронирования</div>
            <Countdown deadline={offer.deadline} />
          </div>
        )}

        {offer.bonus_text && (
          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-gold-300/25 bg-gold-300/[0.06] p-4 sm:mt-8 sm:gap-4 sm:p-5">
            <Gift size={20} className="mt-0.5 shrink-0 text-gold-300" />
            <p className="text-sm text-white/85 sm:text-base">
              {offer.bonus_text}
            </p>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="btn-gold w-full justify-center sm:w-auto"
          >
            Забронировать место
          </a>
          <a href="#tariffs" className="btn-ghost w-full justify-center sm:w-auto">
            Посмотреть тарифы
          </a>
        </div>
      </motion.div>
    </div>
  );
}
