import * as ExpoLocaAuthentication from "expo-local-authentication";

export const LocalAuthenticationService = {
  checkIfDeviceHasHardware: () => {
    return ExpoLocaAuthentication.hasHardwareAsync();
  },
  checkIfDeviceIsEnrolled: () => {
    return ExpoLocaAuthentication.isEnrolledAsync();
  },
  getDeviceEnrollmentSecurityLevel: () => {
    return ExpoLocaAuthentication.getEnrolledLevelAsync();
  },
  getDeviceSupportedAuthenticationTypes: () => {
    return ExpoLocaAuthentication.supportedAuthenticationTypesAsync();
  },
  authenticate: () => {
    return ExpoLocaAuthentication.authenticateAsync();
  },
};
