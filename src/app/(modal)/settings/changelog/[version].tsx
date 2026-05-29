import { useLocalSearchParams } from "expo-router";

import { ChangelogVersionScreen } from "@/screens/changelog-version";

type Params = {
  version: string;
};

export default function VersionScreen() {
  const params = useLocalSearchParams<Params>();

  return <ChangelogVersionScreen version={params.version} />;
}
