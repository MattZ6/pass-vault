import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type EditCredentialUsernameSchemaType,
  editCredentialUsernameSchema,
} from "./schema";

export type EditWorkoutExerciseFormType = EditCredentialUsernameSchemaType;

export function useEditCredentialUsernameForm() {
  return useForm({
    resolver: zodResolver(editCredentialUsernameSchema),
    defaultValues: {
      username: "",
    },
  });
}
