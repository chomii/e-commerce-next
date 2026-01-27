"use server";

import { API_BASE_URL } from "@/config/config";
import { createSession } from "@/lib/session";
import { treeifyError, z } from "zod";

const RegisterSchema = z.object({
  email: z
    .email({
      message: "Invalid Email",
    })
    .trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .trim(),
});

export type RegisterUserPayload = z.infer<typeof RegisterSchema>;

export type FormState =
  | {
      errors: {
        email: string[];
        password: string[];
      };
      message: string;
    }
  | undefined;

export const registerUser = async (
  _initialState: FormState,
  formData: FormData,
) => {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = RegisterSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const treeified = treeifyError(validatedFields.error);
    return {
      errors: {
        email: treeified.properties?.email?.errors ?? [],
        password: treeified.properties?.password?.errors ?? [],
      },
      message: "Validation failed",
    };
  }

  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return {
      errors: { email: [], password: [] },
      message: errorData.message || "Registration failed on server.",
    };
  }

  const data = await res.json();

  const { access_token } = data;
  await createSession(access_token);
  console.log({ data });

  return {
    errors: { email: [], password: [] },
    message: "Registration successful!",
  };
};
