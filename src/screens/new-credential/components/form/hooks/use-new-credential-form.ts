import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type NewCredentialSchemaType, newCredentialSchema } from "./schema";

export type FormOutput = NewCredentialSchemaType;

export function useNewCredentialForm() {
  const { control, handleSubmit, formState, setFocus } =
    useForm<NewCredentialSchemaType>({
      resolver: zodResolver(newCredentialSchema),
      defaultValues: {
        username: "",
        provider: "",
        password: "",
      },
    });

  return {
    control,
    handleSubmit,
    formState,
    setFocus,
  };
}
