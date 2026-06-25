from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models
from django.utils.text import slugify
from solo.models import SingletonModel


class SiteSettings(SingletonModel):
    """Глобальные настройки сайта — редактируются в админке."""

    # --- КОНТАКТЫ И КАНАЛЫ СВЯЗИ ---
    whatsapp_number = models.CharField(
        "Номер WhatsApp (с кодом страны, без +)",
        max_length=20,
        default="971500000000",
        help_text="Пример: 971501234567 — без плюса. Используется во всех CTA-кнопках.",
    )
    whatsapp_prefill = models.TextField(
        "Текст, который автоматически вставится в WhatsApp",
        default="Здравствуйте, Аллег! Хочу записаться на разбор.",
        blank=True,
    )
    telegram_username = models.CharField(
        "Telegram username (без @)",
        max_length=50,
        blank=True,
        default="alleg_kim",
    )
    contact_email = models.EmailField(
        "Контактный email", default="info@allegkim.com"
    )
    phone = models.CharField("Телефон (для отображения)", max_length=30, blank=True)

    # --- TELEGRAM-БОТ ДЛЯ УВЕДОМЛЕНИЙ О ЗАЯВКАХ ---
    telegram_bot_token = models.CharField(
        "Токен Telegram-бота для уведомлений",
        max_length=200,
        blank=True,
        help_text="Получить у @BotFather. Используется только для отправки уведомлений о новых заявках.",
    )
    telegram_chat_id = models.CharField(
        "Chat ID получателя уведомлений",
        max_length=50,
        blank=True,
        help_text="ID чата/пользователя/канала, куда отправлять заявки.",
    )
    notify_emails = models.CharField(
        "Email-адреса для дублирующих уведомлений (через запятую)",
        max_length=500,
        blank=True,
        default="",
        help_text="Пример: ceo@allegkim.com, manager@allegkim.com",
    )

    # --- СОЦИАЛЬНЫЕ СЕТИ ---
    instagram_url = models.URLField("Instagram", blank=True)
    youtube_url = models.URLField("YouTube", blank=True)
    facebook_url = models.URLField("Facebook", blank=True)
    linkedin_url = models.URLField("LinkedIn", blank=True)
    tiktok_url = models.URLField("TikTok", blank=True)

    # --- HERO-БЛОК ---
    hero_title = models.CharField(
        "Заголовок Hero",
        max_length=300,
        default="Трансформация мышления. Системный масштаб бизнеса.",
    )
    hero_subtitle = models.CharField(
        "Подзаголовок Hero",
        max_length=500,
        default="Международный консалтинг от Аллега Кима",
    )
    hero_description = models.TextField(
        "Описание под заголовком",
        blank=True,
        default="Ресторатор с 25-летним опытом. Сертифицированный тренер STI Dubai. Учу собственников строить ресторанный бизнес как систему.",
    )
    HERO_MODE_CHOICES = [
        ("auto", "Автоматически (видео если есть, иначе слайды, иначе постер)"),
        ("video", "Только видео (YouTube/Vimeo)"),
        ("slides", "Только слайдшоу из фото"),
        ("poster", "Только статичный постер"),
    ]
    hero_mode = models.CharField(
        "Что показывать в Hero", max_length=20,
        choices=HERO_MODE_CHOICES, default="auto",
        help_text="«Автоматически» — фронт сам выберет приоритет: видео → слайды → постер",
    )
    hero_video_url = models.URLField(
        "Видео для фона Hero (YouTube/Vimeo)", blank=True,
        help_text="Если задано — будет проигрываться как live-фон Hero",
    )
    hero_poster = models.ImageField(
        "Статичный постер для десктопа (fallback)",
        upload_to="hero/", blank=True, null=True,
        help_text="Используется на десктопе если нет видео и слайдов",
    )
    hero_mobile_image = models.ImageField(
        "Фото Hero для мобильной версии (портретное 4:5)",
        upload_to="hero/mobile/", blank=True, null=True,
        help_text=(
            "Отдельное фото для мобильного экрана. "
            "Если не загружено — используется обычный постер."
        ),
    )
    hero_slide_interval = models.PositiveSmallIntegerField(
        "Интервал смены слайдов, сек", default=5,
        help_text="Только если в слайдшоу больше 1 фото",
    )
    hero_primary_cta = models.CharField(
        "Текст основной кнопки", max_length=100, default="Записаться на разбор"
    )
    hero_secondary_cta = models.CharField(
        "Текст вторичной кнопки", max_length=100, default="Узнать о Бизнес-туре"
    )

    # --- БЛОК "ОБО МНЕ" ---
    about_title = models.CharField(
        "Заголовок блока 'Обо мне'", max_length=200, default="Аллег Ким"
    )
    about_subtitle = models.CharField(
        "Подзаголовок", max_length=300,
        default="Эксперт, который превращает бизнес в систему",
        blank=True,
    )
    about_text = RichTextUploadingField("Текст о себе", blank=True)
    about_photo = models.ImageField(
        "Главное фото для блока 'Обо мне'", upload_to="about/", blank=True, null=True
    )
    about_photo_2 = models.ImageField(
        "Дополнительное фото (Обо мне)", upload_to="about/", blank=True, null=True,
        help_text="Опционально — для коллажа",
    )
    about_photo_3 = models.ImageField(
        "Третье фото (Обо мне)", upload_to="about/", blank=True, null=True,
    )
    about_video_url = models.URLField(
        "Видео-визитка (YouTube/Vimeo)", blank=True,
        help_text="Если задано — отобразится видео-плеер в блоке 'Обо мне'",
    )

    # --- БЛОК "ПРОЕКТЫ ХОЛДИНГА" ---
    projects_title = models.CharField(
        "Заголовок блока 'Проекты'", max_length=200,
        default="Холдинг |Ассорти Проджект|",
    )
    projects_subtitle = models.CharField(
        "Подзаголовок", max_length=300, blank=True,
        default="Я строю то, чему учу. Вот мои действующие проекты.",
    )

    # --- SEO ---
    seo_title = models.CharField(
        "SEO Title", max_length=200,
        default="Аллег Ким — Международный консалтинг и бизнес-тур в Дубае",
    )
    seo_description = models.CharField(
        "SEO Description", max_length=300,
        default="Трансформация мышления и масштабирование бизнеса. Консалтинг от Аллега Кима, ресторатора с 25-летним опытом.",
    )
    og_image = models.ImageField(
        "OG-картинка для шеринга", upload_to="seo/", blank=True, null=True
    )

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"

    def __str__(self):
        return "Настройки сайта"


class HeroSlide(models.Model):
    """Фото для слайдшоу в Hero. Если одно — статичный фон.
    Если несколько — плавно сменяются с интервалом hero_slide_interval."""

    image = models.ImageField("Фото слайда", upload_to="hero/slides/")
    alt = models.CharField(
        "Alt-текст (необязательно)", max_length=200, blank=True,
    )
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Слайд Hero"
        verbose_name_plural = "Слайды Hero (фон главного экрана)"

    def __str__(self):
        return f"Слайд #{self.order}"


class Achievement(models.Model):
    """Плитки Bento с достижениями (25 лет в бизнесе, 1000+ консультаций и т.д.)."""

    title = models.CharField("Заголовок (крупный)", max_length=100)
    subtitle = models.CharField(
        "Подпись", max_length=200, blank=True,
        help_text="Пояснение под крупной цифрой",
    )
    icon = models.CharField(
        "Иконка", max_length=50, blank=True,
        help_text=(
            "Название иконки (lucide). Доступные: award, brain, briefcase, building, "
            "chart, check, compass, crown, diamond, flame, gem, globe, graduation, "
            "handshake, landmark, line, map, medal, mountain, rocket, search, "
            "settings, sparkles, star, target, trending, trophy, users, zap"
        ),
    )
    image = models.ImageField(
        "Картинка (необязательно)", upload_to="achievements/", blank=True, null=True
    )
    size = models.CharField(
        "Размер плитки",
        max_length=20,
        choices=[
            ("small", "Маленькая"),
            ("medium", "Средняя"),
            ("large", "Большая"),
            ("wide", "Широкая"),
        ],
        default="medium",
    )
    accent = models.BooleanField(
        "Золотая подсветка", default=False,
        help_text="Выделить плитку золотым акцентом",
    )
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Плитка достижения"
        verbose_name_plural = "Плитки достижений (Bento)"

    def __str__(self):
        return self.title


class Service(models.Model):
    """Направления деятельности (5 карточек)."""

    title = models.CharField("Название направления", max_length=200)
    short_description = models.CharField(
        "Короткое описание (одно предложение)", max_length=300
    )
    description = RichTextUploadingField("Полное описание", blank=True)
    icon = models.CharField(
        "Иконка", max_length=50, blank=True,
        help_text=(
            "Название иконки (lucide). Доступные: brain, briefcase, rocket, search, "
            "globe, target, compass, chart, trending, sparkles, users, handshake"
        ),
    )
    image = models.ImageField(
        "Картинка карточки", upload_to="services/", blank=True, null=True
    )
    formula = models.CharField(
        "Формула / слоган", max_length=200, blank=True,
        help_text="Пример: 'Мышление → Решения → Деньги'",
    )
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Направление"
        verbose_name_plural = "Направления деятельности"

    def __str__(self):
        return self.title


class HoldingProject(models.Model):
    """Проект холдинга 'Ассорти Проджект' (Koreana, Alchik, Деревяшка, etc.)."""

    name = models.CharField("Название проекта", max_length=100)
    tagline = models.CharField(
        "Короткий слоган", max_length=200, blank=True,
        help_text="Пример: 'Корейская кухня высокого уровня'",
    )
    description = models.TextField("Описание", blank=True)
    cover = models.ImageField(
        "Обложка", upload_to="projects/", blank=True, null=True
    )
    logo = models.ImageField(
        "Логотип (на прозрачном фоне, PNG/SVG)",
        upload_to="projects/logos/", blank=True, null=True,
    )
    video_url = models.URLField(
        "Видео (YouTube/Vimeo)", blank=True,
        help_text="Опционально — короткий ролик о проекте",
    )
    site_url = models.URLField("Сайт проекта", blank=True)
    instagram_url = models.URLField("Instagram", blank=True)
    location = models.CharField(
        "Локация", max_length=200, blank=True,
        help_text="Пример: 'Бишкек' или 'Бишкек, Алматы'",
    )
    year_founded = models.CharField(
        "Год основания", max_length=20, blank=True,
    )
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Проект холдинга"
        verbose_name_plural = "Проекты холдинга"

    def __str__(self):
        return self.name


class ProjectImage(models.Model):
    """Фото в галерее проекта холдинга."""

    project = models.ForeignKey(
        HoldingProject, on_delete=models.CASCADE,
        related_name="gallery", verbose_name="Проект",
    )
    image = models.ImageField("Фото", upload_to="projects/gallery/")
    caption = models.CharField("Подпись (необязательно)", max_length=300, blank=True)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Фото проекта"
        verbose_name_plural = "Галерея проекта"

    def __str__(self):
        return f"{self.project.name} — фото {self.order}"


class Pain(models.Model):
    """Боли клиента (блок 'Знакомо?')."""

    text = models.CharField("Текст боли", max_length=300)
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Боль клиента"
        verbose_name_plural = "Боли клиентов (блок 'Знакомо?')"

    def __str__(self):
        return self.text[:60]


class Case(models.Model):
    """Кейсы клиентов (результаты до/после)."""

    client_name = models.CharField("Клиент / Компания", max_length=200)
    industry = models.CharField("Отрасль/ниша", max_length=200, blank=True)
    challenge = models.TextField("Задача / точка А")
    result = models.TextField("Результат / точка Б")
    metric_before = models.CharField(
        "Метрика 'было'", max_length=100, blank=True,
        help_text="Пример: '0,5 млн ₽/мес'",
    )
    metric_after = models.CharField(
        "Метрика 'стало'", max_length=100, blank=True,
        help_text="Пример: '5 млн ₽/мес'",
    )
    image = models.ImageField(
        "Фото клиента/обложка", upload_to="cases/", blank=True, null=True
    )
    video_url = models.URLField(
        "Видео-отзыв клиента (YouTube/Vimeo)", blank=True,
        help_text="Опционально",
    )
    quote = models.TextField("Цитата клиента", blank=True)
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Кейс"
        verbose_name_plural = "Кейсы клиентов"

    def __str__(self):
        return f"{self.client_name} — {self.industry}" if self.industry else self.client_name


class CaseImage(models.Model):
    """Дополнительные фото в галерее кейса."""

    case = models.ForeignKey(
        Case, on_delete=models.CASCADE, related_name="gallery",
        verbose_name="Кейс",
    )
    image = models.ImageField("Фото", upload_to="cases/gallery/")
    caption = models.CharField("Подпись", max_length=300, blank=True)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Фото кейса"
        verbose_name_plural = "Галерея кейса"

    def __str__(self):
        return f"{self.case.client_name} — фото {self.order}"


class Tariff(models.Model):
    """Тарифы бизнес-тура."""

    name = models.CharField("Название тарифа", max_length=100)
    price = models.CharField(
        "Цена (как отображать)", max_length=50,
        help_text="Пример: '$5 000' или '2 000 $'",
    )
    price_note = models.CharField(
        "Подпись к цене", max_length=200, blank=True,
        help_text="Пример: 'приведи друга — $1 600'",
    )
    description = models.TextField("Краткое описание", blank=True)
    features = models.TextField(
        "Что входит (каждая фича — на новой строке)",
        help_text="Каждый пункт начинай с новой строки. Например:\nДоступ ко всем модулям\n3 дня офлайн\n1 месяц онлайн-поддержки",
    )
    is_highlight = models.BooleanField(
        "Хит продаж (выделить)", default=False,
        help_text="Подсветить тариф как 'хит'",
    )
    cta_text = models.CharField(
        "Текст кнопки", max_length=100, default="Выбрать тариф"
    )
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Тариф"
        verbose_name_plural = "Тарифы бизнес-тура"

    def __str__(self):
        return f"{self.name} — {self.price}"


class Module(models.Model):
    """Модули программы бизнес-тура."""

    number = models.CharField(
        "Номер модуля", max_length=20,
        help_text="Например: 'Модуль 1' или '01'",
    )
    title = models.CharField("Название модуля", max_length=200)
    description = models.TextField("Описание", blank=True)
    outcomes = models.TextField(
        "Результаты модуля (каждый с новой строки)",
        blank=True,
        help_text="Что получит участник после прохождения",
    )
    duration = models.CharField(
        "Длительность", max_length=50, blank=True,
        help_text="Пример: '3 часа' или 'День 1'",
    )
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Модуль программы"
        verbose_name_plural = "Модули программы тура"

    def __str__(self):
        return f"{self.number}. {self.title}"


class Testimonial(models.Model):
    """Отзывы клиентов."""

    name = models.CharField("Имя автора", max_length=200)
    role = models.CharField(
        "Должность / компания", max_length=300, blank=True
    )
    photo = models.ImageField(
        "Фото", upload_to="testimonials/", blank=True, null=True
    )
    text = models.TextField("Текст отзыва")
    video_url = models.URLField("Видео-отзыв (YouTube/Vimeo)", blank=True)
    rating = models.PositiveSmallIntegerField(
        "Оценка (1-5)", default=5,
    )
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"

    def __str__(self):
        return f"{self.name} — {self.role}" if self.role else self.name


class FAQ(models.Model):
    question = models.CharField("Вопрос", max_length=300)
    answer = RichTextUploadingField("Ответ")
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Показывать", default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "FAQ"
        verbose_name_plural = "Частые вопросы (FAQ)"

    def __str__(self):
        return self.question


class BlogPost(models.Model):
    title = models.CharField("Заголовок", max_length=300)
    slug = models.SlugField("Slug (URL)", max_length=300, unique=True, blank=True)
    excerpt = models.CharField(
        "Анонс (короткое описание)", max_length=500, blank=True
    )
    cover = models.ImageField(
        "Обложка", upload_to="blog/", blank=True, null=True
    )
    video_url = models.URLField(
        "Видео к статье (YouTube/Vimeo)", blank=True,
        help_text="Опционально — если статья сопровождается видео",
    )
    body = RichTextUploadingField("Тело статьи")
    is_published = models.BooleanField("Опубликовано", default=True)
    published_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-published_at"]
        verbose_name = "Статья блога"
        verbose_name_plural = "Блог / Статьи"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class BusinessTourOffer(SingletonModel):
    """Настройки оффера для бизнес-тура (даты, дедлайн, бонус)."""

    is_active = models.BooleanField("Тур активен", default=True)
    start_date = models.DateField(
        "Дата старта тура", null=True, blank=True,
        help_text="Используется в счётчике и тексте",
    )
    location = models.CharField(
        "Локация", max_length=200, default="Дубай"
    )
    format_text = models.CharField(
        "Формат", max_length=300,
        default="3 дня офлайн + 1 месяц онлайн-сопровождения",
    )
    deadline = models.DateTimeField(
        "Дедлайн раннего бронирования",
        null=True, blank=True,
        help_text="Когда сгорает спец-предложение. Используется в счётчике.",
    )
    bonus_text = models.TextField(
        "Текст бонусного блока",
        blank=True,
        default="При предоплате 10% сегодня — экспресс-коучинг 1 на 1 с Аллегом в подарок.",
    )
    prepayment_offer = RichTextUploadingField(
        "Спец-предложение при предоплате (детальное)", blank=True,
        help_text="Например: '4 зум-встречи + экспресс-коучинг + работа с ограничениями'",
    )

    class Meta:
        verbose_name = "Оффер бизнес-тура"
        verbose_name_plural = "Оффер бизнес-тура"

    def __str__(self):
        return "Оффер бизнес-тура"
