import { useLocalSearchParams } from "expo-router";

import { EditProviderScreen } from "@/screens/edit-provider";

type Params = {
  id: string;
};

export default function EditCredentialProviderPage() {
  const params = useLocalSearchParams<Params>();

  return <EditProviderScreen credentialId={params.id} />;
}
