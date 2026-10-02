import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type SetupMasterPasswordSchemaType,
  setupMasterPasswordSchema,
} from "./schema";

export type SetupMasterPasswordFormType = SetupMasterPasswordSchemaType;

export function useSetupMasterPasswordForm() {
  return useForm({
    resolver: zodResolver(setupMasterPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
}
