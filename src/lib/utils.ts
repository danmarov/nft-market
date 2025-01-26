import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(num);
}

export const hexToRgb = (hex: string) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

export const toSlug = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");
};

export const fromSlug = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const forwardTelegramMessage = ({
  message = "Buy and sell your Telegram Gifts simple and fast!💎",
  link,
}: {
  message?: string;
  link: string;
}) => {
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    link
  )}&text=${encodeURIComponent(message)}`;
  window.open(telegramUrl, "_blank");
};
