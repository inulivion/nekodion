import { fetcher } from "@/util/fetcher";

export async function getAccounts() {
  return await fetcher.get("/accounts");
}

export async function getAccountTemplates() {
  return await fetcher.get("/accounts/templates");
}

export async function getAccount(id: number) {
  return await fetcher.get(`/accounts/${id}`);
}
