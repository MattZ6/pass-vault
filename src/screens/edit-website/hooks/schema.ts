import { z } from "zod";

export const editCredentialWebsiteSchema = z.object({
  website: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || z.url().safeParse(value).success, {
      error: "invalid_url",
    }),
});

export type EditCredentialWebsiteSchemaType = z.infer<
  typeof editCredentialWebsiteSchema
>;
