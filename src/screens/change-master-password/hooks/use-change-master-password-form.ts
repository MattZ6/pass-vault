import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type ChangeMasterPasswordSchemaType,
  changeMasterPasswordSchema,
} from "./schema";

export type ChangeMasterPasswordFormType = ChangeMasterPasswordSchemaType;

export function useChangeMasterPasswordForm() {
  return useForm({
    resolver: zodResolver(changeMasterPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
}
