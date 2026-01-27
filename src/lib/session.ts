import "server-only";
import { cookies } from "next/headers";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "@/config/config";
import { redirect } from "next/navigation";

export async function createSession(jwt: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  console.log("ENV", process.env.NODE_ENV);
  console.log("CREATE COOKIE JWT ", jwt);

  cookieStore.set("session", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export function verifyToken(jwt: string | undefined = "") {
  console.log("JWT", jwt);
  return jsonwebtoken.verify(jwt, JWT_SECRET!);
}

export async function checkAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/auth/login");
  }

  console.log("session token", sessionToken);

  const sessionData = JSON.parse(sessionToken);
  const { authToken } = sessionData.data;
  console.log("auth token", authToken);

  // const user = verifyToken(token);
}
