type Options = {
  language: string;
};

export const DateUtils = {
  toDate: (dateString: string) => {
    return new Date(`${dateString}T00:00:00`);
  },
  formatDate: (date: Date, { language }: Options) => {
    return date.toLocaleString(language, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  },
};
