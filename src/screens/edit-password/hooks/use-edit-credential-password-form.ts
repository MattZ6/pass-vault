import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type EditCredentialPasswordSchemaType,
  editCredentialPasswordSchema,
} from "./schema";

export type EditCredentialPasswordFormType = EditCredentialPasswordSchemaType;

export function useEditCredentialPasswordForm() {
  return useForm({
    resolver: zodResolver(editCredentialPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
}
