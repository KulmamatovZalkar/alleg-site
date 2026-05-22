"""Засеивает БД реальным контентом про Аллега Кима.

Запуск:   docker compose exec backend python manage.py seed_content
Сброс:    docker compose exec backend python manage.py seed_content --reset
"""
from datetime import date, datetime, timedelta, timezone as dt_tz

from django.core.management.base import BaseCommand

from apps.content.models import (
    FAQ,
    Achievement,
    BlogPost,
    BusinessTourOffer,
    Case,
    HoldingProject,
    Module,
    Pain,
    Service,
    SiteSettings,
    Tariff,
    Testimonial,
)


class Command(BaseCommand):
    help = "Заполняет БД реальным контентом сайта Alleg Kim"

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset", action="store_true",
            help="Удалить все существующие записи перед сидингом",
        )

    def handle(self, *args, **opts):
        if opts["reset"]:
            self.stdout.write("⚠ Удаляю старые записи…")
            for m in (Achievement, Service, Pain, Case, Tariff, Module,
                      Testimonial, FAQ, BlogPost, HoldingProject):
                m.objects.all().delete()

        self._seed_settings()
        self._seed_offer()
        self._seed_achievements()
        self._seed_services()
        self._seed_pains()
        self._seed_projects()
        self._seed_cases()
        self._seed_tariffs()
        self._seed_modules()
        self._seed_testimonials()
        self._seed_faq()
        self.stdout.write(self.style.SUCCESS("✓ Контент успешно загружен."))

    # ---------------------------------------------------------------- settings
    def _seed_settings(self):
        s = SiteSettings.get_solo()
        s.whatsapp_number = s.whatsapp_number or "971500000000"
        s.whatsapp_prefill = "Здравствуйте, Аллег! Хочу записаться на разбор."
        s.telegram_username = "alleg_kim"
        s.contact_email = "info@allegkim.com"

        s.hero_title = (
            "Аллег Ким. "
            "Консультации для собственников бизнеса."
        )
        s.hero_subtitle = (
            "Ресторатор, практик STI Dubai. Основатель холдинга «Ассорти Проджект»."
        )
        s.hero_description = (
            "25 лет в HORECA. 8 ресторанов в двух брендах — Koreana и Alchik. "
            "Работаю с собственниками малого и среднего бизнеса."
        )
        s.hero_primary_cta = "Записаться на разговор"
        s.hero_secondary_cta = "Программа бизнес-тура"

        s.about_title = "Аллег Ким"
        s.about_subtitle = "Ресторатор. Практик. Бизнес-консультант."
        s.about_text = (
            "<p>25 лет в HORECA. Основатель холдинга "
            "<strong>«Ассорти Проджект»</strong> — 8 ресторанов в двух брендах "
            "(<strong>Koreana</strong> и <strong>Alchik</strong>).</p>"
            "<p>Сертифицированный практик <strong>STI Dubai</strong> "
            "(Syucai Training Institute LLC). 6 лет в социально-тренинговом институте.</p>"
            "<p>Консультирую собственников малого и среднего бизнеса. "
            "Работаю на собственном практическом опыте — не на теории.</p>"
        )

        s.projects_title = "Холдинг |Ассорти Проджект|"
        s.projects_subtitle = (
            "Действующие проекты, которые я веду как собственник."
        )

        s.seo_title = (
            "Аллег Ким — Международный консалтинг и бизнес-тур в Дубае"
        )
        s.seo_description = (
            "Развитие предпринимательского мышления, выстраивание системного бизнеса, "
            "масштабирование. Основатель холдинга «Ассорти Проджект» (Koreana, Alchik, "
            "Деревяшка). Топ-тренер STI Dubai."
        )
        s.save()
        self.stdout.write("  • Настройки сайта")

    # ------------------------------------------------------------------- offer
    def _seed_offer(self):
        o = BusinessTourOffer.get_solo()
        o.is_active = True
        o.start_date = date(2026, 7, 2)
        o.location = "Дубай, ОАЭ"
        o.format_text = "3 дня офлайн в Дубае + 1 месяц онлайн-сопровождения"
        if not o.deadline:
            o.deadline = datetime.now(dt_tz.utc) + timedelta(days=21)
        o.bonus_text = (
            "После предоплаты 10% — предварительная подготовка к туру."
        )
        o.prepayment_offer = (
            "<p><strong>После предоплаты 10%:</strong></p>"
            "<ul>"
            "<li>4 Zoom-встречи до старта тура</li>"
            "<li>Предварительный разбор вашей задачи</li>"
            "<li>Войдёте в тур с готовой повесткой</li>"
            "</ul>"
        )
        o.save()
        self.stdout.write("  • Оффер бизнес-тура")

    # ----------------------------------------------------------- achievements
    def _seed_achievements(self):
        data = [
            dict(title="25", subtitle="лет в HORECA",
                 icon="trophy", size="medium", accent=True, order=10),
            dict(title="8", subtitle="ресторанов в холдинге «Ассорти Проджект»",
                 icon="building", size="medium", accent=True, order=20),
            dict(title="1000+", subtitle="бизнес-консультаций",
                 icon="briefcase", size="medium", accent=False, order=30),
            dict(title="STI Dubai", subtitle="практик и сертифицированный тренер",
                 icon="graduation", size="medium", accent=False, order=40),
            dict(title="6 лет", subtitle="в социально-тренинговом институте",
                 icon="compass", size="medium", accent=False, order=50),
            dict(title="5 стран", subtitle="клиенты в СНГ, Европе, Корее, США, Дубае",
                 icon="globe", size="medium", accent=False, order=60),
        ]
        for d in data:
            Achievement.objects.update_or_create(title=d["title"], defaults=d)
        self.stdout.write(f"  • Достижения: {len(data)}")

    # --------------------------------------------------------------- services
    def _seed_services(self):
        data = [
            dict(
                title="Диагностика бизнеса",
                short_description=(
                    "Разбор текущей модели, процессов и команды. "
                    "Совместно ищем, что мешает росту."
                ),
                icon="search", formula="", order=10,
            ),
            dict(
                title="Финансовая модель",
                short_description=(
                    "Считаем точку безубыточности, юнит-экономику "
                    "и фактическую маржу по направлениям."
                ),
                icon="chart", formula="", order=20,
            ),
            dict(
                title="Процессы и регламенты",
                short_description=(
                    "Структурируем повторяющиеся операции, "
                    "чтобы бизнес работал без вашего ежедневного участия."
                ),
                icon="settings", formula="", order=30,
            ),
            dict(
                title="Аудит команды",
                short_description=(
                    "Смотрим на соответствие людей задачам "
                    "и обсуждаем кадровые решения."
                ),
                icon="users", formula="", order=40,
            ),
            dict(
                title="Работа с собственником",
                short_description=(
                    "Разбираем, как вы принимаете решения и где они "
                    "сейчас тормозят развитие компании."
                ),
                icon="brain", formula="", order=50,
            ),
            dict(
                title="Бизнес-тур в Дубае",
                short_description=(
                    "3 дня офлайн в Дубае + 1 месяц онлайн-сопровождения."
                ),
                icon="compass", formula="", order=60,
            ),
        ]
        for d in data:
            Service.objects.update_or_create(title=d["title"], defaults=d)
        self.stdout.write(f"  • Направления: {len(data)}")

    # ------------------------------------------------------------------ pains
    def _seed_pains(self):
        data = [
            "Вы выбираете нишу и бизнес-модель",
            "Бизнес работает, но не растёт",
            "Решения приходится принимать одному",
            "Финансовая картина непрозрачна",
            "Команда не справляется без вашего ручного контроля",
            "Не понимаете, на чём бизнес зарабатывает, а где теряет",
            "Думаете о масштабировании, но не уверены в направлении",
        ]
        for i, text in enumerate(data, start=1):
            Pain.objects.update_or_create(text=text, defaults={"order": i * 10})
        self.stdout.write(f"  • Боли: {len(data)}")

    # --------------------------------------------------------------- projects
    def _seed_projects(self):
        data = [
            dict(
                name="Koreana",
                tagline="Корейская кухня",
                description="4 ресторана.",
                location="Бишкек",
                order=10,
            ),
            dict(
                name="Alchik",
                tagline="Авторский гастрономический проект",
                description="4 ресторана.",
                location="Бишкек",
                order=20,
            ),
        ]
        for d in data:
            HoldingProject.objects.update_or_create(name=d["name"], defaults=d)
        # Удаляем Деревяшку если она есть (это не отдельный проект)
        HoldingProject.objects.filter(name="Деревяшка").delete()
        self.stdout.write(f"  • Проекты холдинга: {len(data)} (Деревяшка удалена)")

    # ------------------------------------------------------------------ cases
    def _seed_cases(self):
        data = [
            dict(
                client_name="Сеть кафе, СНГ",
                industry="HORECA",
                challenge=(
                    "Выручка перестала расти. Команда без чётких зон ответственности. "
                    "Финансовая картина непрозрачна."
                ),
                result=(
                    "Пересобрали бизнес-модель и базовые регламенты. "
                    "Заменили часть управленцев. Внедрили управленческий учёт."
                ),
                metric_before="",
                metric_after="",
                quote="",
                order=10,
            ),
            dict(
                client_name="Founder стартапа",
                industry="B2B, Сеул",
                challenge=(
                    "Полгода искали product-market fit. Команда подумывала о закрытии."
                ),
                result=(
                    "Перепаковали нишу и оффер. Команда сфокусировалась и начала продавать."
                ),
                metric_before="",
                metric_after="",
                quote="",
                order=20,
            ),
            dict(
                client_name="Инвестор",
                industry="Аудит стартапа",
                challenge=(
                    "Рассматривал вход в чужой проект, нужен был независимый разбор модели."
                ),
                result=(
                    "Аудит показал критические риски модели. Принято решение не входить."
                ),
                metric_before="",
                metric_after="",
                quote="",
                order=30,
            ),
            dict(
                client_name="Сеть beauty-салонов",
                industry="Услуги",
                challenge=(
                    "Маржа просела, неясно где именно теряются деньги."
                ),
                result=(
                    "Разобрали юнит-экономику. Финансовая картина стала прозрачной."
                ),
                metric_before="",
                metric_after="",
                quote="",
                order=40,
            ),
        ]
        for d in data:
            Case.objects.update_or_create(client_name=d["client_name"], defaults=d)
        self.stdout.write(f"  • Кейсы: {len(data)}")

    # ---------------------------------------------------------------- tariffs
    def _seed_tariffs(self):
        data = [
            dict(
                name="Базовый",
                price="$2 000",
                price_note="",
                description="Групповой формат тура.",
                features=(
                    "3 дня офлайн-разборов в Дубае\n"
                    "1 месяц онлайн-встреч после тура\n"
                    "Общий чат участников\n"
                    "Шаблоны и рабочие материалы\n"
                    "Доступ к записям 3 месяца\n"
                    "Вечерние встречи с основателем методологии Сюцай — Жанатом Кожамжаровым"
                ),
                is_highlight=False, cta_text="Выбрать тариф", order=10,
            ),
            dict(
                name="Расширенный",
                price="$5 000",
                price_note="",
                description="Группа + индивидуальные разборы.",
                features=(
                    "Всё из тарифа «Базовый»\n"
                    "Личная обратная связь в чате\n"
                    "Индивидуальные разборы кейса в рамках программы\n"
                    "Работа с эффективностью собственника\n"
                    "Проверка внедрения после тура"
                ),
                is_highlight=True, cta_text="Выбрать тариф", order=20,
            ),
            dict(
                name="VIP",
                price="$10 000",
                price_note="3 места в группе",
                description="Персональное сопровождение 3 месяца.",
                features=(
                    "Всё из тарифа «Расширенный»\n"
                    "Персональное сопровождение Аллега 3 месяца\n"
                    "Личные разборы стратегии и решений\n"
                    "Сопровождение внедрения\n"
                    "Доступ к базовому курсу STI"
                ),
                is_highlight=False, cta_text="Выбрать тариф", order=30,
            ),
        ]
        for d in data:
            Tariff.objects.update_or_create(name=d["name"], defaults=d)
        self.stdout.write(f"  • Тарифы: {len(data)}")

    # ---------------------------------------------------------------- modules
    def _seed_modules(self):
        data = [
            dict(
                number="Модуль 1", title="Диагностика собственника",
                description="Как вы принимаете решения сегодня.",
                outcomes=(
                    "Анализ управленческой модели\n"
                    "Зоны, где решения буксуют"
                ),
                duration="День 1 · Утро", order=10,
            ),
            dict(
                number="Модуль 2", title="Соответствие «Собственник — Бизнес»",
                description=(
                    "Подходит ли текущий бизнес под ваши сильные стороны."
                ),
                outcomes=(
                    "Анализ соответствия бизнеса и собственника\n"
                    "Точки внутреннего конфликта"
                ),
                duration="День 1 · Вечер", order=20,
            ),
            dict(
                number="Модуль 3", title="Анализ рынка и целесообразности",
                description="Есть ли спрос и за что клиент готов платить.",
                outcomes=(
                    "Карта спроса\n"
                    "Понимание ценности для клиента"
                ),
                duration="День 2 · Утро", order=30,
            ),
            dict(
                number="Модуль 4", title="Сегментация рынка",
                description="Деление на 3 сегмента для позиционирования.",
                outcomes=(
                    "3 ключевых сегмента аудитории\n"
                    "Приоритетный сегмент для работы"
                ),
                duration="День 2 · Вечер", order=40,
            ),
            dict(
                number="Модуль 5", title="Продукт, цена и локация",
                description="Соответствие продукта сегменту, адекватность цены.",
                outcomes=(
                    "Сверка продукт ↔ сегмент\n"
                    "Корректировка цены"
                ),
                duration="День 2", order=50,
            ),
            dict(
                number="Модуль 6", title="Разбор бизнеса по 9 компетенциям",
                description="Статус, аудитория, УТП, бренд, методология.",
                outcomes=(
                    "Состояние 9 ключевых направлений\n"
                    "Приоритеты для работы"
                ),
                duration="День 3 · Утро", order=60,
            ),
            dict(
                number="Модуль 7", title="Анализ команды",
                description="Кто на каких задачах, где провалы.",
                outcomes=(
                    "Соответствие людей задачам\n"
                    "Кадровые решения"
                ),
                duration="День 3 · День", order=70,
            ),
            dict(
                number="Модуль 8", title="Итоговая стратегия",
                description="План конкретных шагов на ближайшие месяцы.",
                outcomes=(
                    "Стратегия на 12 месяцев\n"
                    "План действий\n"
                    "Контрольные точки"
                ),
                duration="День 3 · Вечер", order=80,
            ),
            dict(
                number="Месяц онлайн", title="Внедрение",
                description="4 недели онлайн-поддержки после тура.",
                outcomes=(
                    "Еженедельные встречи группы\n"
                    "Разбор внедрения\n"
                    "Финальная сверка результатов"
                ),
                duration="4 недели после тура", order=90,
            ),
        ]
        for d in data:
            Module.objects.update_or_create(
                number=d["number"], title=d["title"], defaults=d
            )
        self.stdout.write(f"  • Модули: {len(data)}")

    # ----------------------------------------------------------- testimonials
    def _seed_testimonials(self):
        data = [
            dict(
                name="Рустам К.", role="Владелец сети ресторанов",
                text=(
                    "За 3 дня Аллег обратил моё внимание на вещи, которые я "
                    "годами не замечал. Через месяц у меня уже было больше "
                    "времени на стратегию, и в бизнесе стало спокойнее."
                ),
                rating=5, order=10,
            ),
            dict(
                name="Ольга М.", role="Founder, beauty-tech",
                text=(
                    "Получаешь не «советы», а структуру. По бизнесу — конкретные "
                    "решения с цифрами, не общие слова."
                ),
                rating=5, order=20,
            ),
            dict(
                name="Дмитрий В.", role="Инвестор",
                text=(
                    "Сделали с Аллегом аудит стартапа, в который я собирался "
                    "заходить. По итогам решил не входить — он подсветил "
                    "несколько важных рисков в модели."
                ),
                rating=5, order=30,
            ),
            dict(
                name="Анна П.", role="Сеть beauty-салонов",
                text=(
                    "Самое полезное — мы детально разобрали юнит-экономику. "
                    "Стало понятно, на чём бизнес зарабатывает, а где теряет."
                ),
                rating=5, order=40,
            ),
            dict(
                name="Михаил С.", role="CEO, edtech, Сеул",
                text=(
                    "С Аллегом мы пересобрали оффер и нишу. После этого "
                    "у команды появился ясный фокус."
                ),
                rating=5, order=50,
            ),
            dict(
                name="Карим Н.", role="Ресторатор, Дубай",
                text=(
                    "Аллег задаёт точные вопросы. На них приходится отвечать "
                    "честно, в том числе самому себе. Это и даёт результат."
                ),
                rating=5, order=60,
            ),
        ]
        for d in data:
            Testimonial.objects.update_or_create(name=d["name"], defaults=d)
        self.stdout.write(f"  • Отзывы: {len(data)}")

    # -------------------------------------------------------------------- FAQ
    def _seed_faq(self):
        data = [
            dict(
                question="Для кого этот бизнес-тур?",
                answer=(
                    "<p>Программа разработана для действующих владельцев малого "
                    "и среднего бизнеса, начинающих предпринимателей (кто только "
                    "выбирает нишу) и руководителей, которые хотят выстроить систему, "
                    "выйти из жёсткой операционки и кратно масштабироваться без хаоса.</p>"
                ),
                order=10,
            ),
            dict(
                question="Что если я не смогу приехать в Дубай?",
                answer=(
                    "<p>Ключевая ценность первых трёх дней — это живое взаимодействие, "
                    "глубокие разборы и нетворкинг, поэтому присутствие в Дубае "
                    "обязательно для участия в туре. Однако, если приезд невозможен, "
                    "оставьте заявку — мы можем обсудить формат индивидуального "
                    "онлайн-консалтинга.</p>"
                ),
                order=20,
            ),
            dict(
                question="Будут ли возвраты?",
                answer=(
                    "<p>Условия возврата детально прописываются в договоре. "
                    "Мы гарантируем высочайшее качество передаваемой методологии "
                    "и глубокий аудит вашего проекта. Однако финальный бизнес-результат "
                    "зависит от того, насколько точно вы будете внедрять полученные "
                    "инструменты.</p>"
                ),
                order=30,
            ),
            dict(
                question="Можно ли в рассрочку?",
                answer=(
                    "<p>Да, мы понимаем, что деньги должны работать в бизнесе. "
                    "Оставьте заявку, и наша команда свяжется с вами, чтобы обсудить "
                    "возможные комфортные графики оплат или разделение платежа.</p>"
                ),
                order=40,
            ),
            dict(
                question="На каком языке проходит тур?",
                answer=(
                    "<p>Все групповые разборы, лекции и материалы предоставляются "
                    "на <strong>русском языке</strong>.</p>"
                ),
                order=50,
            ),
            dict(
                question="Включены ли проживание и перелёт?",
                answer=(
                    "<p>Перелёт, проживание и оформление визы участники организуют "
                    "самостоятельно. Мы предоставим список рекомендованных отелей "
                    "с удобной логистикой до места проведения тура. В стоимость билета "
                    "включены кофе-брейки и раздаточные материалы.</p>"
                ),
                order=60,
            ),
            dict(
                question="Сколько человек в группе?",
                answer=(
                    "<p>Формат тура подразумевает глубокую работу с каждым участником, "
                    "поэтому количество мест строго ограничено. Например, на тарифе "
                    "<strong>VIP</strong> предусмотрено всего <strong>3 места</strong>, "
                    "чтобы обеспечить максимальное погружение Аллега в ваши "
                    "бизнес-процессы.</p>"
                ),
                order=70,
            ),
            dict(
                question="Кто получит больше от тура — стартап или зрелый бизнес?",
                answer=(
                    "<p>Методология универсальна. <strong>Стартапам</strong> тур "
                    "поможет сэкономить годы ошибок и сотни тысяч долларов, сразу "
                    "выстроив правильную юнит-экономику. А <strong>зрелые компании</strong> "
                    "смогут найти «узкие горлышки», оптимизировать команду и пробить "
                    "текущий финансовый потолок.</p>"
                ),
                order=80,
            ),
        ]
        for d in data:
            FAQ.objects.update_or_create(question=d["question"], defaults=d)
        self.stdout.write(f"  • FAQ: {len(data)}")
