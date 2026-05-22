/**
 * DTO типы данных, отдаваемых бекендом.
 * Меняются только при изменении сериализаторов.
 */

export type ApiImage = string | null;

export interface VideoInfo {
  provider: "youtube" | "vimeo" | "";
  video_id: string;
  embed_url: string;
  thumbnail: string;
}

export interface SiteSettingsDTO {
  whatsapp_number: string;
  whatsapp_prefill: string;
  whatsapp_link: string;
  telegram_username: string;
  contact_email: string;
  phone: string;
  instagram_url: string;
  youtube_url: string;
  facebook_url: string;
  linkedin_url: string;
  tiktok_url: string;

  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_mode: "auto" | "video" | "slides" | "poster";
  hero_video_url: string;
  hero_video_url_info: VideoInfo | null;
  hero_poster: ApiImage;
  hero_mobile_image: ApiImage;
  hero_slide_interval: number;
  hero_primary_cta: string;
  hero_secondary_cta: string;

  about_title: string;
  about_subtitle: string;
  about_text: string;
  about_photo: ApiImage;
  about_photo_2: ApiImage;
  about_photo_3: ApiImage;
  about_video_url: string;
  about_video_url_info: VideoInfo | null;

  projects_title: string;
  projects_subtitle: string;

  seo_title: string;
  seo_description: string;
  og_image: ApiImage;
}

export interface AchievementDTO {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  image: ApiImage;
  size: "small" | "medium" | "large" | "wide";
  accent: boolean;
}

export interface ServiceDTO {
  id: number;
  title: string;
  short_description: string;
  description: string;
  icon: string;
  image: ApiImage;
  formula: string;
}

export interface PainDTO {
  id: number;
  text: string;
}

export interface CaseImageDTO {
  id: number;
  image: ApiImage;
  caption: string;
  order: number;
}

export interface CaseDTO {
  id: number;
  client_name: string;
  industry: string;
  challenge: string;
  result: string;
  metric_before: string;
  metric_after: string;
  image: ApiImage;
  video_url: string;
  video_url_info: VideoInfo | null;
  quote: string;
  gallery: CaseImageDTO[];
}

export interface ProjectImageDTO {
  id: number;
  image: ApiImage;
  caption: string;
  order: number;
}

export interface HoldingProjectDTO {
  id: number;
  name: string;
  tagline: string;
  description: string;
  cover: ApiImage;
  logo: ApiImage;
  video_url: string;
  video_url_info: VideoInfo | null;
  site_url: string;
  instagram_url: string;
  location: string;
  year_founded: string;
  gallery: ProjectImageDTO[];
}

export interface TariffDTO {
  id: number;
  name: string;
  price: string;
  price_note: string;
  description: string;
  features: string;
  features_list: string[];
  is_highlight: boolean;
  cta_text: string;
}

export interface ModuleDTO {
  id: number;
  number: string;
  title: string;
  description: string;
  outcomes: string;
  outcomes_list: string[];
  duration: string;
}

export interface TestimonialDTO {
  id: number;
  name: string;
  role: string;
  photo: ApiImage;
  text: string;
  video_url: string;
  video_url_info: VideoInfo | null;
  rating: number;
}

export interface FAQDTO {
  id: number;
  question: string;
  answer: string;
}

export interface BlogPostDTO {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover: ApiImage;
  video_url: string;
  video_url_info: VideoInfo | null;
  published_at: string;
}

export interface BusinessTourOfferDTO {
  is_active: boolean;
  start_date: string | null;
  location: string;
  format_text: string;
  deadline: string | null;
  bonus_text: string;
  prepayment_offer: string;
}

export interface HeroSlideDTO {
  id: number;
  image: ApiImage;
  alt: string;
  order: number;
}

export interface HomePageData {
  settings: SiteSettingsDTO;
  offer: BusinessTourOfferDTO;
  hero_slides: HeroSlideDTO[];
  achievements: AchievementDTO[];
  services: ServiceDTO[];
  projects: HoldingProjectDTO[];
  pains: PainDTO[];
  cases: CaseDTO[];
  tariffs: TariffDTO[];
  modules: ModuleDTO[];
  testimonials: TestimonialDTO[];
  faqs: FAQDTO[];
  blog: BlogPostDTO[];
}
