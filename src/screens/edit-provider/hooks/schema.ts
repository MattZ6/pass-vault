import { z } from "zod";

export const editCredentialProviderSchema = z.object({
  provider: z.string().trim().nonempty(),
});

export type EditCredentialProviderSchemaType = z.infer<
  typeof editCredentialProviderSchema
>;
