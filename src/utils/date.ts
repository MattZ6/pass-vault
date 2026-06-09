type FormatDateOptions = {
  language: string;
  hideYear?: boolean;
};

export const DateUtils = {
  toDate: (dateString: string) => {
    return new Date(`${dateString}T00:00:00`);
  },

  formatDate: (date: Date, { language, hideYear }: FormatDateOptions) => {
    return date.toLocaleString(language, {
      day: "numeric",
      month: "short",
      year: hideYear ? undefined : "numeric",
    });
  },

  formatDateTime: (date: Date, { language, hideYear }: FormatDateOptions) => {
    return date.toLocaleString(language, {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
      year: hideYear ? undefined : "numeric",
    });
  },
};
