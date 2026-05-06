import { z } from "zod";

export const newCredentialSchema = z.object({
  provider: z.string().trim().nonempty(),
  username: z.string().trim().nonempty(),
  password: z.string().trim().nonempty(),
});

export type NewCredentialSchemaType = z.infer<typeof newCredentialSchema>;
