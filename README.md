# Alleg Kim — продающий лендинг

Премиальный лендинг с админкой для управления всем контентом.

**Стек:** Django 5 + DRF (бэкенд/админка) · Next.js 14 + TypeScript + Tailwind + Framer Motion (фронт) · PostgreSQL · Docker.

## Что умеет

- **Полностью контентно-управляемый сайт.** Все тексты, цены, тарифы, отзывы, кейсы, FAQ, фото, видео — редактируются через Django admin.
- **Заявки → WhatsApp + Telegram + Email.** Кнопки CTA ведут в WhatsApp. Контактные формы шлют заявку в Telegram-бот и на почту. Токены и адреса задаются в админке.
- **Маркетинговая структура лендинга:** Hero → социальные доказательства (Bento) → боли → решение → обо мне → кейсы с метриками → блок бизнес-тура с дедлайн-счётчиком → программа (модули) → тарифы с подсветкой "хита" → отзывы → FAQ → форма заявки.
- **Премиальный визуал:** тёмная палитра (`#0A0A0A` / золото / бордо), Playfair Display + Inter, плавный скролл (Lenis), анимации по скроллу (Framer Motion), пульсирующий CTA, sticky-кнопка WhatsApp.

## Быстрый старт (Docker)

```bash
# 1. Скопируйте .env-файлы
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 2. Поднимите всё одной командой
docker compose up --build
```

Откроется:
- **Сайт:** http://localhost:3000
- **Админка:** http://localhost:8000/admin/ (логин/пароль из `backend/.env`)
- **API:** http://localhost:8000/api/home/

Суперпользователь создаётся автоматически при первом запуске (`DJANGO_SUPERUSER_*` из `.env`).

## Засев базового контента

В проекте есть команда, которая заливает в БД готовый контент из ТЗ (Hero, направления, кейсы, тарифы, модули, отзывы, FAQ):

```bash
# первичный засев (idempotent — можно гонять повторно)
docker compose exec backend python manage.py seed_content

# полный сброс + засев заново
docker compose exec backend python manage.py seed_content --reset
```

После этого зайди в админку и поправь под себя — это просто стартовое наполнение.

## Первый запуск — что заполнить в админке

1. Откройте `http://localhost:8000/admin/`.
2. Перейдите в **Настройки сайта**:
   - Введите свой **WhatsApp** (без `+`, например `971501234567`).
   - Введите **Telegram username**, email, телефон.
   - Загрузите **Hero-видео/постер**, фото для блока "Обо мне".
   - Заполните **Telegram-бот для уведомлений** — токен от `@BotFather` и `chat_id`. Сюда придут уведомления о заявках.
   - Заполните `notify_emails` через запятую, если хотите дублирование на почту.
3. Наполните разделы:
   - **Плитки достижений (Bento)** — цифры/иконки для верхнего блока.
   - **Направления деятельности** — 5 услуг.
   - **Боли клиентов** — пункты в блоке "Знакомо?".
   - **Кейсы клиентов** — с метриками до/после.
   - **Оффер бизнес-тура** — дата старта, локация, дедлайн раннего бронирования.
   - **Тарифы** — Базовый/Расширенный/VIP, отметьте флаг "Хит" у нужного.
   - **Модули программы тура** — модули и результаты.
   - **Отзывы** — текст, имя, оценка, фото.
   - **FAQ** — частые вопросы.
   - **Блог / Статьи** — статьи (с CKEditor).

> **Важно:** на пустой БД сайт показывает дефолтный контент-плейсхолдер (см. `frontend/lib/fallbacks.ts`). Как только вы наполните админку — фронт сразу подхватит данные.

## Настройка Telegram-уведомлений

1. Создайте бота через `@BotFather`, получите `BOT_TOKEN`.
2. Откройте чат с ботом, нажмите `/start`.
3. Получите свой `chat_id` через `@userinfobot`.
4. В **Настройках сайта** вставьте токен и chat_id, сохраните.
5. Отправьте тестовую заявку с сайта — бот должен прислать уведомление.

## Структура проекта

```
alleg-site/
├── backend/                Django + DRF + админка
│   ├── apps/
│   │   ├── content/        CMS-модели (SiteSettings, Achievement, Service, Tariff, ...)
│   │   └── leads/          Модель заявки + отправка в TG/email
│   ├── core/               settings, urls, wsgi
│   ├── Dockerfile
│   ├── entrypoint.sh       Миграции + сборка статики + суперюзер
│   └── requirements.txt
├── frontend/               Next.js 14 (App Router) + TS + Tailwind + Framer Motion
│   ├── app/                page.tsx + layout.tsx + globals.css
│   ├── components/         Все секции лендинга
│   ├── lib/                api.ts (клиент к DRF) + fallbacks.ts (дефолтный контент)
│   └── Dockerfile          multi-stage (dev / builder / runner)
├── nginx/                  Конфиг для prod
├── docker-compose.yml      Dev-режим
└── docker-compose.prod.yml Prod (с nginx, без volume-маппинга кода)
```

## Команды (через Docker)

```bash
# Логи
docker compose logs -f backend
docker compose logs -f frontend

# Django shell
docker compose exec backend python manage.py shell

# Создать миграции после изменения моделей
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate

# Создать ещё одного админа
docker compose exec backend python manage.py createsuperuser

# Пересобрать после изменения requirements / package.json
docker compose up --build
```

## Деплой в production

1. На сервере: `docker compose -f docker-compose.prod.yml up -d --build`.
2. Положите `nginx/nginx.conf` рядом с compose-файлом.
3. Настройте `.env` на production-значения:
   - `DEBUG=False`
   - `SECRET_KEY=...` (сгенерируйте новый)
   - `ALLOWED_HOSTS=allegkim.com,www.allegkim.com`
   - `CORS_ALLOWED_ORIGINS=https://allegkim.com`
   - `CSRF_TRUSTED_ORIGINS=https://allegkim.com`
4. Настройте HTTPS (Let's Encrypt) — добавьте `certbot`/`traefik` либо отдельный reverse-proxy.

## Гайд по картинкам и видео

Все картинки загружаются через админку. Next.js сам отдаёт их через `<img>` — конвертация в webp/avif не требуется, **но** ниже даны рекомендации, чтобы сайт был быстрым.

| Что | Где грузить | Формат | Размер (рекомендация) | Вес |
|---|---|---|---|---|
| **Hero — постер видео** | Настройки сайта → Hero | `.jpg` или `.webp` | **1920×1080** (16:9) | до 300 КБ |
| **Hero — фоновое видео** | Настройки сайта → Hero (URL) | `.mp4` (H.264, без звука) | **1920×1080**, ≤ 30 сек | до 5–7 МБ, лучше залить на Bunny/Mux/S3 и вставить прямую ссылку |
| **Фото "Обо мне"** | Настройки сайта → Обо мне | `.jpg` или `.webp` | **1200×1500** (4:5, портрет) | до 250 КБ |
| **Плитки Bento** | Плитки достижений → image | `.jpg` или `.webp` | **800×800** | до 150 КБ |
| **Карточки направлений** | Направления → image | `.jpg` или `.webp` | **1000×750** | до 200 КБ |
| **Обложка кейса** | Кейсы клиентов → image | `.jpg` или `.webp` | **1200×800** | до 200 КБ |
| **Фото для отзыва** | Отзывы → photo | `.jpg` или `.webp`, квадрат | **400×400** | до 80 КБ |
| **Обложка блога** | Блог → cover | `.jpg` или `.webp` | **1600×900** (16:9) | до 250 КБ |
| **OG-картинка (превью при шеринге)** | Настройки сайта → SEO → og_image | `.jpg` | **1200×630** | до 200 КБ |

### Как уменьшить вес и не потерять качество

- **WebP** даёт меньший вес при том же качестве. Конвертеры: [squoosh.app](https://squoosh.app), [tinypng.com](https://tinypng.com).
- **Видео Hero**: всегда кодировать в H.264 (mp4), без звука (`-an`), bitrate ~3-5 Mbps. Без звука = автовоспроизведение работает на всех браузерах. Длина 10–20 секунд, зацикленное.
- **Логотипы и иконки**: используем lucide-иконки прямо в коде, эмодзи и PNG не нужны.

### Иконки направлений и достижений

В админке в поле "Иконка" вписывайте **имя** иконки (без эмодзи). Доступные имена:

`award`, `brain`, `briefcase`, `building`, `chart`, `check`, `compass`, `crown`, `diamond`, `flame`, `gem`, `globe`, `graduation`, `handshake`, `landmark`, `line`, `map`, `medal`, `mountain`, `rocket`, `search`, `settings`, `sparkles`, `star`, `target`, `trending`, `trophy`, `users`, `zap`.

Если оставить пустым или вписать несуществующее имя — отобразится дефолтный `diamond`.

## Где менять что (быстрая шпаргалка)

| Хочу изменить | Где |
|---|---|
| Номер WhatsApp / Telegram | Админка → Настройки сайта |
| Текст и видео Hero | Админка → Настройки сайта → Hero-блок |
| Цены тарифов | Админка → Тарифы |
| Дату старта тура / дедлайн | Админка → Оффер бизнес-тура |
| Кейсы | Админка → Кейсы клиентов |
| Отзывы | Админка → Отзывы |
| Цветовую палитру / шрифты | `frontend/tailwind.config.ts` + `frontend/app/globals.css` |
| Структуру секций главной | `frontend/app/page.tsx` |

---

Любые вопросы по доработкам — пишите.
# alleg-site
