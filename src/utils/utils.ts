import { isAxiosError } from "axios";

export const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (!hours) {
    return `${minutes} мин`;
  }

  if (!minutes) {
    return `${hours} ч`;
  }

  return `${hours} ч ${minutes} мин`;
};

export const ratingColor = (value: number | undefined): string => {
  if (!value) return "#777";
  if (value <= 5) return "#C82020";
  if (value <= 6) return "#777";
  if (value <= 7) return "#308E21";
  return "#A59400";
};

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === "object" && data !== null) {
      const maybeError = "error" in data ? data.error : null;
      const maybeMessage = "message" in data ? data.message : null;

      if (typeof maybeError === "string") return maybeError;
      if (typeof maybeMessage === "string") return maybeMessage;
    }
  }

  if (error instanceof Error) return error.message;
  return fallback;
};
