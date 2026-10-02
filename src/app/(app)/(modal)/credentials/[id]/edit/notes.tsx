import { useLocalSearchParams } from "expo-router";

import { EditNotesScreen } from "@/screens/edit-notes";

type Params = {
  id: string;
};

export default function EditCredentialNotesPage() {
  const params = useLocalSearchParams<Params>();

  return <EditNotesScreen credentialId={params.id} />;
}
