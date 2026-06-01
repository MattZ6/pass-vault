import { PreferencesRepository } from "@/repositories/preferences.repository";
import { ApplicationService } from "@/services/device/application";

import { useChangelogStore } from "@/store/changelog/changelog.store";

export const ChangelogService = {
  initialize: () => {
    const lastSeenVersion = PreferencesRepository.getLastSeenVersion();

    const hasUnreadVersion = lastSeenVersion !== ApplicationService.version;

    useChangelogStore.getState().setHasUnreadVersion(hasUnreadVersion);
  },
  markCurrentVersionAsSeen: () => {
    PreferencesRepository.setLastSeenVersion(ApplicationService.version);
    useChangelogStore.getState().setHasUnreadVersion(false);
  },
};
