export namespace DateUtils {
	type FormatInput = {
		locale: "pt" | "en";
	};

	export function format(date: Date, { locale }: FormatInput) {
		return new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
		}).format(date);
	}
}
