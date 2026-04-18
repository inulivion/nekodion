import { getTransactions } from "@/features/transaction/api";
import { TransactionPage } from "./_components";

export default async function Transaction() {
  const response = await getTransactions();

  if ("error" in response) {
    throw new Error("データの取得に失敗しました");
  }

  return <TransactionPage transactions={response.body} />;
}
