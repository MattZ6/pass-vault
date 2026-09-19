import { z } from "zod";

export const setupMasterPasswordSchema = z
  .object({
    password: z.string().trim().min(8),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "passwords_do_not_match",
  });

export type SetupMasterPasswordSchemaType = z.infer<
  typeof setupMasterPasswordSchema
>;
