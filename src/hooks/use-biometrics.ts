import { useQuery } from "@tanstack/react-query";

import { LocalAuthenticationService } from "@/services/device/local-authentication";

export function useBiometrics() {
  return useQuery({
    queryKey: ["biometrics"],
    queryFn: async () => {
      const [supportedAuthTypes, hasHardware, isEnrolled, enrolledLevel] =
        await Promise.all([
          LocalAuthenticationService.getDeviceSupportedAuthenticationTypes(),
          LocalAuthenticationService.checkIfDeviceHasHardware(),
          LocalAuthenticationService.checkIfDeviceIsEnrolled(),
          LocalAuthenticationService.getDeviceEnrollmentSecurityLevel(),
        ]);

      return {
        supportedAuthTypes,
        hasHardware,
        isEnrolled,
        enrolledLevel,
      };
    },
    staleTime: 1 * 60 * 60 * 1000, // 1hr
  });
}
