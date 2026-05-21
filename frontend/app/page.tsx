import { fetchHomePage } from "@/lib/api";
import { fallbackHome } from "@/lib/fallbacks";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import StickyWhatsApp from "@/components/layout/StickyWhatsApp";

import LeadForm from "@/components/ui/LeadForm";
import SectionTitle from "@/components/ui/SectionTitle";

import About from "@/components/sections/About";
import AchievementsBento from "@/components/sections/AchievementsBento";
import BusinessTourBlock from "@/components/sections/BusinessTourBlock";
import Cases from "@/components/sections/Cases";
import FAQ from "@/components/sections/FAQ";
import Hero from "@/components/sections/Hero";
import Pains from "@/components/sections/Pains";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Tariffs from "@/components/sections/Tariffs";
import Testimonials from "@/components/sections/Testimonials";
import TourModules from "@/components/sections/TourModules";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = (await fetchHomePage()) ?? fallbackHome;
  const {
    settings,
    offer,
    hero_slides,
    achievements,
    services,
    projects,
    pains,
    cases,
    tariffs,
    modules,
    testimonials,
    faqs,
  } = data;

  return (
    <>
      <Header settings={settings} />

      <main>
        <Hero settings={settings} slides={hero_slides || []} />

        {achievements.length > 0 && (
          <section className="section" id="achievements">
            <div className="container-page">
              <SectionTitle
                eyebrow="Цифры, которые говорят сами за себя"
                title="Опыт, который |невозможно подделать|"
                align="center"
              />
              <div className="mt-14">
                <AchievementsBento items={achievements} />
              </div>
            </div>
          </section>
        )}

        {pains.length > 0 && (
          <section className="section" id="pains">
            <div className="container-page">
              <SectionTitle
                eyebrow="Знакомо?"
                title="Если хотя бы 2 пункта про вас — |мы говорим на одном языке|"
                align="center"
              />
              <div className="mt-12">
                <Pains items={pains} />
              </div>
            </div>
          </section>
        )}

        {services.length > 0 && (
          <section className="section" id="services">
            <div className="container-page">
              <SectionTitle
                eyebrow="Что я делаю"
                title="Направления |для системного роста|"
                subtitle="От трансформации мышления до построения международного бизнеса. Выбирайте формат под вашу задачу."
              />
              <div className="mt-14">
                <Services items={services} />
              </div>
            </div>
          </section>
        )}

        <section className="section" id="about">
          <div className="container-page">
            <About settings={settings} />
          </div>
        </section>

        {projects.length > 0 && (
          <section className="section" id="projects">
            <div className="container-page">
              <SectionTitle
                eyebrow="Проекты Аллега"
                title={settings.projects_title || "Холдинг |Ассорти Проджект|"}
                subtitle={settings.projects_subtitle}
                align="center"
              />
              <div className="mt-14">
                <Projects items={projects} />
              </div>
            </div>
          </section>
        )}

        {cases.length > 0 && (
          <section className="section" id="cases">
            <div className="container-page">
              <SectionTitle
                eyebrow="Кейсы"
                title="Результаты, |которые можно измерить|"
                subtitle="Реальные клиенты, реальные цифры. Все кейсы — с согласия владельцев."
              />
              <div className="mt-14">
                <Cases items={cases} />
              </div>
            </div>
          </section>
        )}

        {offer.is_active && (
          <section className="section" id="tour">
            <div className="container-page">
              <BusinessTourBlock offer={offer} settings={settings} />

              {modules.length > 0 && (
                <div className="mt-16">
                  <SectionTitle
                    eyebrow="Программа тура"
                    title="Модули, выстроенные |по принципу домино|"
                    subtitle="Каждый шаг — фундамент для следующего. Без воды и абстракций."
                    align="center"
                  />
                  <div className="mt-12">
                    <TourModules items={modules} />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {tariffs.length > 0 && (
          <section className="section" id="tariffs">
            <div className="container-page">
              <SectionTitle
                eyebrow="Тарифы бизнес-тура"
                title="Выберите |уровень погружения|"
                align="center"
              />
              <div className="mt-14">
                <Tariffs items={tariffs} settings={settings} />
              </div>
            </div>
          </section>
        )}

        {testimonials.length > 0 && (
          <section className="section" id="testimonials">
            <div className="container-page">
              <SectionTitle
                eyebrow="Отзывы"
                title="Слова |тех, кто уже прошёл|"
                align="center"
              />
              <div className="mt-14">
                <Testimonials items={testimonials} />
              </div>
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="section" id="faq">
            <div className="container-page">
              <SectionTitle
                eyebrow="FAQ"
                title="Частые |вопросы|"
                align="center"
              />
              <div className="mt-12">
                <FAQ items={faqs} />
              </div>
            </div>
          </section>
        )}

        <section className="section" id="contact">
          <div className="container-page">
            <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2">
              <div>
                <SectionTitle
                  eyebrow="Свяжитесь со мной"
                  title="Один разговор — |и многое становится ясно|"
                  subtitle="Расскажите коротко о ситуации. Я лично или моя команда вернёмся в течение пары часов."
                />
                <div className="mt-6 space-y-3 text-sm text-white/70 sm:mt-8 sm:text-base">
                  {settings.contact_email && (
                    <div>
                      <span className="text-white/40">Email:</span>{" "}
                      <a className="hover:text-gold-200" href={`mailto:${settings.contact_email}`}>
                        {settings.contact_email}
                      </a>
                    </div>
                  )}
                  {settings.whatsapp_link && (
                    <div>
                      <span className="text-white/40">WhatsApp:</span>{" "}
                      <a className="hover:text-gold-200" href={settings.whatsapp_link} target="_blank" rel="noreferrer">
                        Написать в WhatsApp
                      </a>
                    </div>
                  )}
                  {settings.telegram_username && (
                    <div>
                      <span className="text-white/40">Telegram:</span>{" "}
                      <a className="hover:text-gold-200" href={`https://t.me/${settings.telegram_username}`} target="_blank" rel="noreferrer">
                        @{settings.telegram_username}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <LeadForm source="contact_form" />
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
      <StickyWhatsApp href={settings.whatsapp_link} />
      <div className="h-16 sm:hidden" aria-hidden="true" />
    </>
  );
}
