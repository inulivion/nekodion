"use server";

import { redirect } from "next/navigation";
import { getGmailAuthUrl } from "./api";

export async function connectGmail() {
  const result = await getGmailAuthUrl();
  if ("error" in result) {
    throw new Error("Failed to get Gmail auth URL");
  }
  redirect((result.body as { url: string }).url);
}
