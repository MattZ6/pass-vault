import { z } from "zod";

export const newCredentialSchema = z.object({
  provider: z.string().trim().nonempty(),
  website: z.optional(z.url()),
  username: z.string().trim().nonempty(),
  password: z.string().trim().nonempty(),
  notes: z.optional(z.string()),
});

export type NewCredentialSchemaType = z.infer<typeof newCredentialSchema>;
