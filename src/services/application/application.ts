import * as ExpoApplication from "expo-application";

export const ApplicationService = {
  version: `v${ExpoApplication.nativeApplicationVersion}`,
  build: ExpoApplication.nativeBuildVersion,
  package: ExpoApplication.applicationId,
  getInstallationTime: ExpoApplication.getInstallationTimeAsync,
  getLastUpdateTime: ExpoApplication.getLastUpdateTimeAsync,
};
