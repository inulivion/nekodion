import { fetcher } from "@/util/fetcher";

export async function getTransactions() {
  return await fetcher.get("/transactions");
}

export async function getTotalAssets() {
  return await fetcher.get("/transactions/total-assets");
}

export async function getTransaction(id: number) {
  return await fetcher.get(`/transactions/${id}`);
}
