import { useLocalSearchParams } from "expo-router";

import { EditWebsiteScreen } from "@/screens/edit-website";

type Params = {
  id: string;
};

export default function EditCredentialWebsitePage() {
  const params = useLocalSearchParams<Params>();

  return <EditWebsiteScreen credentialId={params.id} />;
}
