import { PreferencesRepository } from "@/repositories/preferences.repository";

const DEFAULT_VALUE = true;

function resolveStoredValue(value: boolean | null) {
  if (value === null || value === undefined) {
    return DEFAULT_VALUE;
  }

  return value;
}

export const PerformanceMonitoringService = {
  isEnabled: () => {
    const isActive = PreferencesRepository.getPerformanceMonitoring();
    return resolveStoredValue(isActive);
  },
  toggle: () => {
    const storedValue = PreferencesRepository.getPerformanceMonitoring();
    const updatedValue = resolveStoredValue(storedValue);
    PreferencesRepository.savePerformanceMonitoring(!updatedValue);
  },
};
