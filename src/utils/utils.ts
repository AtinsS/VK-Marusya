// Форматирование времени
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

//Рейтинг фильма цвет

export const ratingColor = (value: number | undefined): string => {
  if (!value) return "#777";
  if (value <= 5) return "#C82020";
  if (value <= 6) return "#777";
  if (value <= 7) return "#308E21";
  if (value <= 8) return "#A59400";
  return "#A59400";
};
