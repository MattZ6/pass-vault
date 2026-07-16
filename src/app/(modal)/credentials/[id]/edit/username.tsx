import { useLocalSearchParams } from "expo-router";

import { EditUsernameScreen } from "@/screens/edit-username";

type Params = {
  id: string;
};

export default function EditCredentialUsernamePage() {
  const params = useLocalSearchParams<Params>();

  return <EditUsernameScreen credentialId={params.id} />;
}
