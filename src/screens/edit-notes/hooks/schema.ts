import { z } from "zod";

export const editCredentialNotesSchema = z.object({
  notes: z.string().trim().optional(),
});

export type EditCredentialNotesSchemaType = z.infer<
  typeof editCredentialNotesSchema
>;
