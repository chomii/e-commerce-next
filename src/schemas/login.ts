import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

export type Login = z.infer<typeof schema>;
