import { useLocalSearchParams } from "expo-router";

import { EditPasswordScreen } from "@/screens/edit-password";

type Params = {
  id: string;
};

export default function EditCredentialPasswordPage() {
  const params = useLocalSearchParams<Params>();

  return <EditPasswordScreen credentialId={params.id} />;
}
