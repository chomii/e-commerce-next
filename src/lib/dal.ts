import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { verifyToken } from "./session";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = verifyToken(cookie) as { userId: string };

  console.log("COOKIE", cookie);
  console.log("SESSION", session);

  if (!session?.userId) {
    redirect("/auth/login");
  }

  return { isAuth: true, userId: session.userId };
});
