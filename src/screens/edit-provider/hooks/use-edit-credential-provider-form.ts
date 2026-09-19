import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type EditCredentialProviderSchemaType,
  editCredentialProviderSchema,
} from "./schema";

export type EditCredentialProviderFormType = EditCredentialProviderSchemaType;

export function useEditCredentialProviderForm() {
  return useForm({
    resolver: zodResolver(editCredentialProviderSchema),
    defaultValues: {
      provider: "",
    },
  });
}
