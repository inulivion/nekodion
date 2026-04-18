import { getTotalAssets, getTransactions } from "@/features/transaction/api";
import { HomePage } from "./_components";

export default async function Home() {
  const [transactionResponse, totalAssetsResponse] = await Promise.all([
    getTransactions(),
    getTotalAssets(),
  ]);

  if ("error" in transactionResponse || "error" in totalAssetsResponse) {
    throw new Error("データの取得に失敗しました");
  }

  return (
    <HomePage
      transactions={transactionResponse.body}
      totalAssets={totalAssetsResponse.body}
    />
  );
}
