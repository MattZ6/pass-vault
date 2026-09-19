import { z } from "zod";

export const editCredentialPasswordSchema = z.object({
  password: z.string().trim().nonempty(),
});

export type EditCredentialPasswordSchemaType = z.infer<
  typeof editCredentialPasswordSchema
>;
