import { useLocalSearchParams } from "expo-router";

import { CredentialDetailsScreen } from "@/screens/credential-details";

type Params = {
  id: string;
};

export default function CredentialDetailsPage() {
  const params = useLocalSearchParams<Params>();

  return <CredentialDetailsScreen id={params.id} />;
}
