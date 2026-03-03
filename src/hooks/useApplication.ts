import { useQuery } from "@tanstack/react-query";

import { Application } from "@/lib/application";

export function useApplication() {
	return useQuery({
		queryKey: ["application"],
		queryFn: async () => {
			const { installDate, lastUpdateDate } = await Application.dates();

			return {
				name: Application.name,
				version: Application.version,
				buildNumber: Application.buildNumber,
				package: Application.package,
				installDate,
				lastUpdateDate,
			};
		},
		staleTime: Infinity,
	});
}
