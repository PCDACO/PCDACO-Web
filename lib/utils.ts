import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export const formatDateToHour = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedDate = `${hours}:${minutes}`;
  return formattedDate;
};

export enum FormatType {
  DATE = "date",
  TIME = "time",
  DATETIME = "datetime",
}

export function formatFromISOString(
  isoString: string | Date,
  format: FormatType
): string {
  const date = new Date(isoString);
  let formattedDateTime = "";

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  };

  switch (format) {
    case FormatType.DATE:
      formattedDateTime = date.toLocaleDateString("en-US", dateOptions);
      break;
    case FormatType.TIME:
      formattedDateTime = date.toLocaleTimeString("en-US", timeOptions);
      break;
    case FormatType.DATETIME:
      formattedDateTime = date.toLocaleString("en-US", {
        ...dateOptions,
        ...timeOptions,
      });
      break;
    default:
      throw new Error("Invalid format type");
  }

  return formattedDateTime;
}
