import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type NewCredentialSchemaType, newCredentialSchema } from "./schema";

export function useNewCredentialForm() {
  const { control, handleSubmit, formState } = useForm<NewCredentialSchemaType>(
    {
      resolver: zodResolver(newCredentialSchema),
      defaultValues: {
        username: "",
        provider: "",
        password: "",
      },
    },
  );

  return {
    control,
    handleSubmit,
    formState,
  };
}
