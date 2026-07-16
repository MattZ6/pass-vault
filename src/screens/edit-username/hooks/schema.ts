import { z } from "zod";

export const editCredentialUsernameSchema = z.object({
  username: z.string().trim().nonempty(),
});

export type EditCredentialUsernameSchemaType = z.infer<
  typeof editCredentialUsernameSchema
>;
