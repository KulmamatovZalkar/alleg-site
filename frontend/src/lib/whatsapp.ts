/**
 * Сборка ссылок на WhatsApp с предзаполненным текстом.
 */

export function buildWhatsAppLink(number: string, text: string): string {
  if (!number) return "";
  const cleanNumber = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

export const WA_TEMPLATES = {
  default: "Здравствуйте, Аллег! Хочу записаться на разбор.",
  tour: "Здравствуйте! Хочу узнать подробнее о Бизнес-туре в Дубае.",
  tariff: (name: string) =>
    `Здравствуйте! Хочу записаться на тариф «${name}» бизнес-тура.`,
};
