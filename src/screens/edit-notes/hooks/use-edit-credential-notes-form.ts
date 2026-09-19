import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type EditCredentialNotesSchemaType,
  editCredentialNotesSchema,
} from "./schema";

export type EditCredentialNotesFormType = EditCredentialNotesSchemaType;

export function useEditCredentialNotesForm() {
  return useForm({
    resolver: zodResolver(editCredentialNotesSchema),
    defaultValues: {
      notes: "",
    },
  });
}
