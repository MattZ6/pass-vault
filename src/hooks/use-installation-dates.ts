import { useQuery } from "@tanstack/react-query";
import { Platform } from "react-native";

import { ApplicationService } from "@/services/device/application";

export function useInstallationDates() {
  return useQuery({
    queryKey: ["installation-dates"],
    queryFn: async () => {
      let updatedAt: Date | null = null;

      const installedAt = await ApplicationService.getInstallationTime();

      if (Platform.OS === "android") {
        updatedAt = await ApplicationService.getLastUpdateTime();
      }

      return {
        installedAt,
        updatedAt,
      };
    },
  });
}
