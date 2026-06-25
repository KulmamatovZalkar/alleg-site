"use client";

import { Instagram, Youtube, Facebook, Linkedin, GraduationCap } from "lucide-react";

import type { SiteSettingsDTO } from "@/lib/api";

export default function Footer({ settings }: { settings: SiteSettingsDTO }) {
  const socials = [
    { url: settings.instagram_url, Icon: Instagram, label: "Instagram" },
    { url: settings.youtube_url, Icon: Youtube, label: "YouTube" },
    { url: settings.facebook_url, Icon: Facebook, label: "Facebook" },
    { url: settings.linkedin_url, Icon: Linkedin, label: "LinkedIn" },
  ].filter((s) => s.url);

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-serif text-2xl text-white">
            Alleg <span className="gold-text">Kim</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-white/55">
            Международный консалтинг и трансформация мышления для собственников бизнеса.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">Контакты</div>
          <ul className="space-y-2 text-sm text-white/70">
            {settings.contact_email && (
              <li>
                <a href={`mailto:${settings.contact_email}`} className="hover:text-gold-200">
                  {settings.contact_email}
                </a>
              </li>
            )}
            {settings.phone && (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-gold-200">
                  {settings.phone}
                </a>
              </li>
            )}
            {settings.whatsapp_link && (
              <li>
                <a href={settings.whatsapp_link} target="_blank" rel="noreferrer" className="hover:text-gold-200">
                  WhatsApp
                </a>
              </li>
            )}
            {settings.telegram_username && (
              <li>
                <a href={`https://t.me/${settings.telegram_username}`} target="_blank" rel="noreferrer" className="hover:text-gold-200">
                  Telegram: @{settings.telegram_username}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Навигация</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#about" className="hover:text-gold-200">Обо мне</a></li>
            <li><a href="#services" className="hover:text-gold-200">Направления</a></li>
            <li><a href="#tour" className="hover:text-gold-200">Бизнес-тур</a></li>
            <li><a href="#tariffs" className="hover:text-gold-200">Тарифы</a></li>
            <li><a href="#faq" className="hover:text-gold-200">FAQ</a></li>
          </ul>
        </div>

        {socials.length > 0 && (
          <div>
            <div className="eyebrow mb-4">Соцсети</div>
            <div className="flex gap-3">
              {socials.map(({ url, Icon, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:border-gold-300/40 hover:text-gold-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="container-page mt-12 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-gold-300/[0.06] px-4 py-1.5 text-xs font-medium text-gold-200">
          <GraduationCap size={14} />
          Сертифицированный тренер STI Dubai
        </span>
        <div className="flex w-full flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Alleg Kim. Все права защищены.</span>
          <span>Сделано с фокусом на результат.</span>
        </div>
      </div>
    </footer>
  );
}
