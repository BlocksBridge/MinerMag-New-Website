// app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("auth_email"); // Delete auth email ( This is used to get newsletter email for data )
  redirect("/newsletter/login");
}
