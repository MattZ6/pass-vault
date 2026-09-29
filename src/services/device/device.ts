import * as ExpoDevice from "expo-device";
import { Platform } from "react-native";

type AppDeviceType = "phone" | "tablet" | "desktop" | "tv";

function mapDeviceType(deviceType: ExpoDevice.DeviceType | null): AppDeviceType | null {
  switch (deviceType) {
    case ExpoDevice.DeviceType.UNKNOWN:
      return null;

    case ExpoDevice.DeviceType.PHONE:
      return "phone";

    case ExpoDevice.DeviceType.TABLET:
      return "tablet";

    case ExpoDevice.DeviceType.DESKTOP:
      return "desktop";

    case ExpoDevice.DeviceType.TV:
      return "tv";

    default:
      return null
  }
}

const deviceType = mapDeviceType(ExpoDevice.deviceType);

export const DeviceService = {
  os: Platform.select({
    android: "Android",
    ios: "iOS",
    macos: "MacOS",
    windows: "Windows",
    web: "Web",
    default: "Uknown",
  }),
  type: deviceType,
  isTablet: () => deviceType === "tablet",
  osVersion: ExpoDevice.osVersion,
  androidApiLevel: ExpoDevice.platformApiLevel,
  manufacturer: ExpoDevice.manufacturer,
  brand: ExpoDevice.brand,
  modelName: ExpoDevice.modelName,
};
