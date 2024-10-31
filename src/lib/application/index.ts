import * as ExpoApplication from 'expo-application'
import ExpoConstants, { AppOwnership } from 'expo-constants'
import { Platform } from 'react-native'

export const Application = {
  name: ExpoApplication.applicationName,
  version: ExpoApplication.nativeApplicationVersion,
  buildNumber: ExpoApplication.nativeBuildVersion,
  package: ExpoApplication.applicationId,
  isRunningInExpo: ExpoConstants.appOwnership === AppOwnership.Expo,
  dates: async () => {
    const promises = [ExpoApplication.getInstallationTimeAsync()]

    if (Platform.OS === 'android') {
      promises.push(ExpoApplication.getLastUpdateTimeAsync())
    }

    const [installDate, lastUpdateDate] = await Promise.all(promises)

    return {
      installDate,
      lastUpdateDate,
    }
  },
}
