import { fetcher } from "@/util/fetcher";

export async function getGmailStatus() {
  return await fetcher.get("/gmail/status");
}

export async function getGmailAuthUrl() {
  return await fetcher.get("/gmail/auth-url");
}
