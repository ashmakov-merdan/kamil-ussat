"use server";

import { cookies } from "next/headers";

export async function createSession(access: string, refresh: string) {
  const cookieStore = await cookies();
  cookieStore.set("access_token", access);
  cookieStore.set("refresh_token", refresh);
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}
