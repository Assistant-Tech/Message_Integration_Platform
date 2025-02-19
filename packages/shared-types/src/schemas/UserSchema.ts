import { z } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  password: z.string().min(8),
  email: z.string().email(),
});

export const userResponseSchema = userSchema
  .extend({
    id: z.string().uuid(),
  })
  .omit({ password: true });

export type IUserType = z.infer<typeof userSchema>;
export type IUserResponseType = z.infer<typeof userResponseSchema>;
