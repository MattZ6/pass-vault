import * as ExpoLocaAuthentication from "expo-local-authentication";

export type SupportedType = "fingerprint" | "facial_recognition" | "iris";

const AUTH_TYPES_MAP: Record<
  ExpoLocaAuthentication.AuthenticationType,
  SupportedType
> = {
  [ExpoLocaAuthentication.AuthenticationType.FINGERPRINT]: "fingerprint",
  [ExpoLocaAuthentication.AuthenticationType.FACIAL_RECOGNITION]:
    "facial_recognition",
  [ExpoLocaAuthentication.AuthenticationType.IRIS]: "iris",
};

export type EnrollmentLevel =
  | "none"
  | "secret"
  | "biometric_weak"
  | "biometric_strong";

const ENROLLMENT_LEVELS_MAP: Record<
  ExpoLocaAuthentication.SecurityLevel,
  EnrollmentLevel
> = {
  [ExpoLocaAuthentication.SecurityLevel.NONE]: "none",
  [ExpoLocaAuthentication.SecurityLevel.SECRET]: "secret",
  [ExpoLocaAuthentication.SecurityLevel.BIOMETRIC_WEAK]: "biometric_weak",
  [ExpoLocaAuthentication.SecurityLevel.BIOMETRIC_STRONG]: "biometric_strong",
};

export const LocalAuthenticationService = {
  checkIfDeviceHasHardware: () => {
    return ExpoLocaAuthentication.hasHardwareAsync();
  },
  checkIfDeviceIsEnrolled: () => {
    return ExpoLocaAuthentication.isEnrolledAsync();
  },
  getDeviceEnrollmentSecurityLevel: async () => {
    const enrollmentLevel =
      await ExpoLocaAuthentication.getEnrolledLevelAsync();
    return ENROLLMENT_LEVELS_MAP[enrollmentLevel];
  },
  getDeviceSupportedAuthenticationTypes: async () => {
    const supportedTypes =
      await ExpoLocaAuthentication.supportedAuthenticationTypesAsync();

    return supportedTypes.map((type) => AUTH_TYPES_MAP[type]);
  },
  authenticate: () => {
    return ExpoLocaAuthentication.authenticateAsync();
  },
};
