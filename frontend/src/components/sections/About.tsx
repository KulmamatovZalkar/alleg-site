"use client";

import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Globe,
  GraduationCap,
  Quote,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import VideoEmbed from "@/components/ui/VideoEmbed";
import { getMediaUrl } from "@/lib/api";
import { useFadeIn } from "@/lib/useFadeIn";
import type { SiteSettingsDTO } from "@/types/api";

const STATS = [
  {
    icon: Briefcase,
    value: "25 лет",
    label: "В предпринимательстве и HORECA",
  },
  {
    icon: TrendingUp,
    value: "x5",
    label: "Рост выручки собственного бизнеса по Сюцай",
  },
  {
    icon: Award,
    value: "1000+",
    label: "Бизнес-консультаций и практических разборов",
  },
  {
    icon: Globe,
    value: "6 стран",
    label: "Европа · СНГ · Корея · США · Дубай · Африка",
  },
];

const BADGES = [
  "STI Dubai",
  "Syucai Training Institute LLC",
  "Холдинг «Ассорти Проджект»",
  "Koreana · Alchik · Деревяшка",
];

export default function About({ settings }: { settings: SiteSettingsDTO }) {
  const photo = getMediaUrl(settings.about_photo);
  const photo2 = getMediaUrl(settings.about_photo_2);
  const photo3 = getMediaUrl(settings.about_photo_3);
  const videoInfo = settings.about_video_url_info;

  const fadeIntro = useFadeIn();
  const fadeMedia = useFadeIn(0.06);
  const fadePhilosophy = useFadeIn();

  const hasGallery = !!(photo2 || photo3);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Top: title + lead + media */}
      <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <motion.div {...fadeIntro} className="order-2 lg:order-1">
          <div className="eyebrow mb-3 sm:mb-4">Кто такой Аллег Ким</div>
          <h2 className="font-serif text-3xl text-white sm:text-5xl lg:text-6xl">
            {settings.about_title}
          </h2>
          {settings.about_subtitle && (
            <p className="mt-3 font-serif text-lg text-gold-200 sm:mt-4 sm:text-2xl">
              {settings.about_subtitle}
            </p>
          )}

          {/* Lead paragraph */}
          <p className="mt-6 text-base leading-relaxed text-white/75 sm:mt-7 sm:text-lg">
            Международный бизнес-консультант и ресторатор, который превращает
            хаос в компаниях в чётко работающий механизм. Основатель холдинга
            <span className="text-gold-200 font-semibold"> «Ассорти Проджект»</span>{" "}
            (Koreana, Alchik, Деревяшка).
          </p>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap gap-2 sm:mt-7">
            {BADGES.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-white/[0.02] px-3 py-1.5 text-[11px] font-medium tracking-wide text-gold-100 sm:text-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                {b}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Photo / Video */}
        <motion.div {...fadeMedia} className="order-1 lg:order-2">
          {videoInfo ? (
            <VideoEmbed
              info={videoInfo}
              poster={photo ?? videoInfo.thumbnail}
              rounded="rounded-3xl"
            />
          ) : hasGallery ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt={settings.about_title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                    <span className="font-serif text-5xl gold-text">A</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3 sm:gap-4">
                {photo2 && (
                  <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo2} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
                {photo3 && (
                  <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-3xl border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo3} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 lg:max-w-none">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={settings.about_title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
                  <span className="font-serif text-6xl gold-text">A · K</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.3em] text-white/70 sm:text-xs">
                <span>25 лет в HORECA</span>
                <span>·</span>
                <span>STI Dubai</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.value} stat={stat} delay={i * 0.05} />
        ))}
      </div>

      {/* Story in 3 columns */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <StoryCard
          icon={<Briefcase size={20} />}
          title="Путь практика"
          delay={0}
        >
          <p>
            25 лет непрерывной практики в предпринимательстве и HORECA.
            Не теоретик — реальный практик, который своими руками строил бизнес,
            сталкивался с кризисами, выстраивал команды и создавал стабильную,
            масштабируемую империю.
          </p>
        </StoryCard>

        <StoryCard
          icon={<GraduationCap size={20} />}
          title="Глубина методологии"
          delay={0.07}
        >
          <p>
            <span className="font-semibold text-gold-200">6 лет</span> обучения
            в социально-тренинговом институте. Сертифицированный бизнес-тренер
            и практик{" "}
            <span className="font-semibold text-gold-200">STI Dubai</span>,
            аттестация в Syucai Training Institute LLC.
          </p>
        </StoryCard>

        <StoryCard
          icon={<Sparkles size={20} />}
          title="Лучший кейс — собственный"
          delay={0.14}
        >
          <p>
            Внедрив методологию науки Сюцай в свою компанию,{" "}
            <span className="font-semibold text-gold-200">
              увеличил выручку в 5 раз
            </span>{" "}
            и выстроил систему, которая работает без критических колебаний и не
            требует ежедневного ручного контроля собственника.
          </p>
        </StoryCard>
      </div>

      {/* Philosophy pullout */}
      <motion.div
        {...fadePhilosophy}
        className="relative overflow-hidden rounded-[1.75rem] border border-gold-300/25 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-800 p-7 sm:rounded-[2rem] sm:p-12"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-gold-500/15 blur-[100px] sm:h-96 sm:w-96" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-wine-500/15 blur-[100px] sm:h-96 sm:w-96" />

        <Quote
          size={48}
          className="absolute left-6 top-6 fill-gold-300/15 text-gold-300/15 sm:left-10 sm:top-10 sm:h-16 sm:w-16"
        />

        <div className="relative">
          <div className="eyebrow mb-3 sm:mb-4">Философия Аллега Кима</div>
          <p className="max-w-3xl font-serif text-xl leading-snug text-white sm:text-3xl lg:text-4xl">
            Бизнес должен{" "}
            <span className="gold-text">генерировать прибыль</span> и работать{" "}
            <span className="gold-text">системно</span>, а собственник обязан
            заниматься стратегией, а не ежедневным «тушением пожаров».
          </p>
          <p className="mt-5 max-w-2xl text-sm text-white/55 sm:mt-7 sm:text-base">
            Авторский подход — на стыке жёсткой бизнес-логики (оцифровка,
            юнит-экономика, регламенты, анализ рынка) и глубокой трансформации
            мышления лидера. Помогаю выявить страхи, иллюзии и установки,
            которые блокируют управленческие решения и рост компании.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({
  stat,
  delay,
}: {
  stat: (typeof STATS)[number];
  delay: number;
}) {
  const fade = useFadeIn(delay);
  return (
    <motion.div {...fade} className="card-surface group p-5 sm:p-6">
      <stat.icon
        size={22}
        className="text-gold-300 transition group-hover:scale-110"
        strokeWidth={1.6}
      />
      <div className="mt-4 font-serif text-3xl text-white sm:text-4xl">
        {stat.value}
      </div>
      <div className="mt-1.5 text-[11px] uppercase tracking-wider text-white/55 sm:text-xs">
        {stat.label}
      </div>
    </motion.div>
  );
}

function StoryCard({
  icon,
  title,
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  delay: number;
  children: React.ReactNode;
}) {
  const fade = useFadeIn(delay);
  return (
    <motion.article
      {...fade}
      className="card-surface flex h-full flex-col p-6 sm:p-7"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-300/25 bg-gold-300/[0.06] text-gold-200">
        {icon}
      </span>
      <h3 className="mt-5 font-serif text-xl text-white sm:text-2xl">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-relaxed text-white/65 sm:text-[15px]">
        {children}
      </div>
    </motion.article>
  );
}
