"use server";

import { API_BASE_URL } from "@/config/config";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { treeifyError, z } from "zod";

const LoginSchema = z.object({
  email: z
    .email({
      message: "Invalid Email",
    })
    .trim(),
  password: z.string().trim(),
});

export type LoginUserPayload = z.infer<typeof LoginSchema>;

export type FormState =
  | {
      errors: {
        email: string[];
        password: string[];
      };
      message: string;
    }
  | undefined;

export const loginUser = async (
  _initialState: FormState,
  formData: FormData,
) => {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = LoginSchema.safeParse(rawData);

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

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
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
        message: errorData.message || "Login failed on server.",
      };
    }

    const data = await res.json();

    console.log("DATA", data);

    const { accessToken } = data;
    await createSession(accessToken);

    // return {
    //   errors: { email: [], password: [] },
    //   message: "Login successful!",
    // };
  } catch (err) {
    console.log(err);
    return {
      errors: { email: [], password: [] },
      message: err || "Login failed on server.",
    };
  }
  redirect("/");
};
