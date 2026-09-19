import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type EditCredentialWebsiteSchemaType,
  editCredentialWebsiteSchema,
} from "./schema";

export type EditCredentialWebsiteFormType = EditCredentialWebsiteSchemaType;

export function useEditCredentialWebsiteForm() {
  return useForm({
    resolver: zodResolver(editCredentialWebsiteSchema),
    defaultValues: {
      website: "",
    },
  });
}
