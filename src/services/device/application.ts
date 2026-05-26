import * as ExpoApplication from "expo-application";

export const ApplicationService = {
  version: ExpoApplication.nativeApplicationVersion,
  build: ExpoApplication.nativeBuildVersion,
  getInstallationTime: ExpoApplication.getInstallationTimeAsync,
  getLastUpdateTime: ExpoApplication.getLastUpdateTimeAsync,
};
