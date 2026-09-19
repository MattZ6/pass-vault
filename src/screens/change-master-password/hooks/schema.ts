import { z } from "zod";

export const changeMasterPasswordSchema = z
  .object({
    currentPassword: z.string().trim().nonempty(),
    newPassword: z.string().trim().min(8),
    confirmNewPassword: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    error: "passwords_do_not_match",
  });

export type ChangeMasterPasswordSchemaType = z.infer<
  typeof changeMasterPasswordSchema
>;
