import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string, locale = "en") {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  }).format(new Date(dateStr));
}

export function formatShortDate(dateStr: string, locale = "en") {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(dateStr));
}

export function getMonth(dateStr: string, locale = "en") {
  return new Date(dateStr).toLocaleString(locale === "fr" ? "fr-FR" : "en-US", { month: "short" }).toUpperCase();
}

export function getDay(dateStr: string) {
  return new Date(dateStr).getDate().toString();
}
