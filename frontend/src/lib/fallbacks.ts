/**
 * Дефолтный контент на случай, если backend ещё не наполнен.
 * Сайт остаётся "продающим" даже на свежей установке.
 */
import type { HomePageData } from "@/types/api";

export const fallbackHome = {
  settings: {
    whatsapp_number: "971500000000",
    whatsapp_prefill: "Здравствуйте, Аллег! Хочу записаться на разбор.",
    whatsapp_link:
      "https://wa.me/971500000000?text=" +
      encodeURIComponent("Здравствуйте, Аллег! Хочу записаться на разбор."),
    telegram_username: "alleg_kim",
    contact_email: "info@allegkim.com",
    phone: "",
    instagram_url: "",
    youtube_url: "",
    facebook_url: "",
    linkedin_url: "",
    tiktok_url: "",
    hero_title: "Трансформация мышления. Системный масштаб бизнеса.",
    hero_subtitle: "Международный консалтинг от Аллега Кима",
    hero_description:
      "Ресторатор с 25-летним опытом. Топ-тренер Сюцай Training Institute Dubai. Помогаю предпринимателям перейти на следующий уровень — через мышление, структуру и метрики.",
    hero_mode: "auto",
    hero_video_url: "",
    hero_video_url_info: null,
    hero_poster: null,
    hero_mobile_image: null,
    hero_slide_interval: 5,
    hero_primary_cta: "Записаться на разбор",
    hero_secondary_cta: "Узнать о Бизнес-туре",
    about_title: "Аллег Ким",
    about_subtitle: "Эксперт, который превращает бизнес в систему",
    about_text:
      "<p>25 лет в HORECA, 1000+ консультаций, клиенты из Европы, СНГ, Кореи, Америки, Дубая и Африки. Основатель холдинга «Ассорти Проджект».</p>",
    about_photo: null,
    about_photo_2: null,
    about_photo_3: null,
    about_video_url: "",
    about_video_url_info: null,
    projects_title: "Холдинг |Ассорти Проджект|",
    projects_subtitle: "",
    seo_title: "Аллег Ким — Международный консалтинг и бизнес-тур в Дубае",
    seo_description:
      "Трансформация мышления и масштабирование бизнеса. Консалтинг от Аллега Кима, ресторатора с 25-летним опытом.",
    og_image: null,
  },
  offer: {
    is_active: true,
    start_date: "2026-07-02",
    location: "Дубай",
    format_text: "3 дня офлайн + 1 месяц онлайн-сопровождения",
    deadline: null,
    bonus_text:
      "При предоплате 10% сегодня — экспресс-коучинг 1 на 1 с Аллегом в подарок.",
    prepayment_offer: "",
  },
  achievements: [
    { id: 1, title: "25", subtitle: "лет в бизнесе", icon: "trophy", image: null, size: "large", accent: true },
    { id: 2, title: "1000+", subtitle: "консультаций проведено", icon: "briefcase", image: null, size: "medium", accent: false },
    { id: 3, title: "STI Dubai", subtitle: "Топ-тренер Сюцай Training Institute", icon: "globe", image: null, size: "wide", accent: false },
    { id: 4, title: "KHDA", subtitle: "Сертификат Дубай + Астана", icon: "graduation", image: null, size: "medium", accent: false },
    { id: 5, title: "5 стран", subtitle: "Европа · СНГ · Корея · США · Дубай", icon: "map", image: null, size: "medium", accent: false },
  ],
  services: [
    { id: 1, title: "Консалтинг личностного роста", short_description: "Мышление → Решения → Деньги", description: "", icon: "brain", image: null, formula: "Мышление → Решения → Деньги" },
    { id: 2, title: "Консалтинг бизнеса", short_description: "Точка безубыточности, фин. эффективность, процессы", description: "", icon: "trending", image: null, formula: "" },
    { id: 3, title: "Аудит стартапов", short_description: "Оценка целесообразности, анализ рынка", description: "", icon: "search", image: null, formula: "" },
    { id: 4, title: "Создание стартапов", short_description: "Построение устойчивой модели с нуля", description: "", icon: "rocket", image: null, formula: "" },
    { id: 5, title: "Бизнес-тур", short_description: "Живой интенсив в Дубае. 3 дня + 1 месяц онлайн.", description: "", icon: "compass", image: null, formula: "" },
  ],
  pains: [
    { id: 1, text: "Бизнес вышел на плато — рост остановился, выручка не растёт" },
    { id: 2, text: "Постоянно тушите пожары, нет системы и времени на стратегию" },
    { id: 3, text: "Команда не справляется, выгораете лично, всё держится на вас" },
    { id: 4, text: "Не понимаете точку безубыточности и реальную маржу" },
    { id: 5, text: "Хотите масштаба, но нет ясности — куда вкладывать ресурс" },
    { id: 6, text: "Видите, что нужны перемены, но не знаете с чего начать" },
  ],
  cases: [
    { id: 1, client_name: "Сеть кафе, Алматы", industry: "HORECA", challenge: "Стагнация выручки 2 года", result: "Рост х3 за 8 месяцев после переработки модели и команды", metric_before: "1,2 млн ₽/мес", metric_after: "3,8 млн ₽/мес", image: null, quote: "Аллег буквально вытащил меня и бизнес из ямы." },
    { id: 2, client_name: "Ресторатор, Дубай", industry: "Fine dining", challenge: "Запуск второй точки без потери качества", result: "Открытие за 4 месяца, окупаемость 9 месяцев", metric_before: "1 точка", metric_after: "2 точки + франшиза", image: null, quote: "Системный подход, ничего лишнего." },
    { id: 3, client_name: "Tech-стартап, Сеул", industry: "B2B SaaS", challenge: "Поиск product-market fit", result: "Перепаковка, первые $50K MRR за 5 месяцев", metric_before: "0", metric_after: "$50K MRR", image: null, quote: "Без Аллега мы бы ушли не туда." },
  ],
  tariffs: [
    { id: 1, name: "Базовый", price: "$2 000", price_note: "Приведи друга — $1 600", description: "Доступ ко всей программе тура", features: "", features_list: ["3 дня офлайн в Дубае", "Доступ ко всем модулям", "Чат с участниками", "Раздаточные материалы"], is_highlight: false, cta_text: "Выбрать Базовый" },
    { id: 2, name: "Расширенный", price: "$5 000", price_note: "Хит продаж", description: "Глубокое погружение", features: "", features_list: ["Всё из Базового", "Личный разбор бизнеса 1-на-1", "1 месяц онлайн-сопровождения", "Доступ к закрытому чату Аллега", "Чек-листы и шаблоны"], is_highlight: true, cta_text: "Выбрать Расширенный" },
    { id: 3, name: "VIP Сопровождение", price: "$10 000", price_note: "Только 3 места", description: "Премиум-формат", features: "", features_list: ["Всё из Расширенного", "3 личных сессии с Аллегом", "Доступ к нетворкингу клуба", "Ужин с Аллегом в Дубае", "Сопровождение 3 месяца"], is_highlight: false, cta_text: "Выбрать VIP" },
  ],
  modules: [
    { id: 1, number: "Модуль 1", title: "Диагностика собственника", description: "Где вы и куда движетесь", outcomes: "", outcomes_list: ["Карта личных ограничений", "План выхода из операционки", "Главные точки роста"], duration: "День 1" },
    { id: 2, number: "Модуль 2", title: "Бизнес-модель и метрики", description: "Деньги, маржа, юнит-экономика", outcomes: "", outcomes_list: ["Реальная точка безубыточности", "Юнит-экономика на бумаге", "Топ-3 точки роста маржи"], duration: "День 1-2" },
    { id: 3, number: "Модуль 3", title: "Команда и процессы", description: "Структура, которая работает без вас", outcomes: "", outcomes_list: ["Карта функций", "Найм и удержание сильных", "Регламент на 80% задач"], duration: "День 2" },
    { id: 4, number: "Модуль 4", title: "Масштабирование", description: "Стратегия x3-x10", outcomes: "", outcomes_list: ["3 сценария роста", "План на 12 месяцев", "Источники капитала"], duration: "День 3" },
  ],
  testimonials: [
    { id: 1, name: "Рустам К.", role: "Владелец сети ресторанов", photo: null, text: "За 3 дня с Аллегом я переосмыслил то, что не мог увидеть 5 лет. Уже через месяц — рост чистой прибыли на 40%.", video_url: "", rating: 5 },
    { id: 2, name: "Ольга М.", role: "Founder, beauty-tech", photo: null, text: "Аллег — это редкое сочетание глубокой бизнес-логики и личного видения. Каждая сессия — на вес золота.", video_url: "", rating: 5 },
    { id: 3, name: "Дмитрий В.", role: "Инвестор, серийный предприниматель", photo: null, text: "Прошёл с Аллегом аудит стартапа. Сэкономил минимум $200K на том, во что не вложился по его рекомендации.", video_url: "", rating: 5 },
  ],
  faqs: [
    { id: 1, question: "Для кого этот бизнес-тур?", answer: "Для собственников и топ-менеджеров с выручкой от $300K в год, готовых к серьёзной работе над собой и компанией." },
    { id: 2, question: "Что если я не смогу приехать в Дубай?", answer: "Тур доступен только офлайн в Дубае. Это важная часть результата — окружение, среда, фокус. Подберём ближайшую группу под ваш график." },
    { id: 3, question: "Будут ли возвраты?", answer: "Возврат 100% средств в течение 7 дней с момента оплаты, если вы поняли, что формат не ваш. После старта тура возвраты не предусмотрены." },
    { id: 4, question: "Можно ли в рассрочку?", answer: "Да, обсуждаем индивидуально. Напишите нам — подберём комфортный график." },
  ],
  blog: [],
  projects: [],
  hero_slides: [],
} as unknown as HomePageData;
