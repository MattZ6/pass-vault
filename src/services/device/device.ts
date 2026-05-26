import * as ExpoDevice from "expo-device";
import { Platform } from "react-native";

export const DeviceService = {
  os: Platform.select({
    android: "Android",
    ios: "iOS",
    macos: "MacOS",
    windows: "Windows",
    web: "Web",
    default: "Unkwon",
  }),
  osVersion: ExpoDevice.osVersion,
  androidApiLevel: ExpoDevice.platformApiLevel,
  manufacturer: ExpoDevice.manufacturer,
  brand: ExpoDevice.brand,
  modelName: ExpoDevice.modelName,
};
