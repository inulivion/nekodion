import {
  getTotalAssets,
  getTransactions,
  getMonthlySummary,
  getMonthlyCategorySummary,
} from "@/features/transaction/api";
import { getUnreadCount } from "@/features/transaction/api";
import {
  MonthlyCategoryTypeSummaryItem,
  UnreadCountResponse,
} from "@/features/transaction/types";
import { HomePage } from "./_components";
import { cookies } from "next/headers";

export default async function Home() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const [
    transactionResponse,
    totalAssetsResponse,
    monthlySummaryResponse,
    categorySummaryResponse,
    unreadCountResponse,
  ] = await Promise.all([
    getTransactions(),
    getTotalAssets(),
    getMonthlySummary(year, month),
    getMonthlyCategorySummary(year, month),
    getUnreadCount(),
  ]);

  if (
    "error" in transactionResponse ||
    "error" in totalAssetsResponse ||
    "error" in monthlySummaryResponse ||
    "error" in categorySummaryResponse ||
    "error" in unreadCountResponse
  ) {
    throw new Error("データの取得に失敗しました");
  }

  const expenseItems = (
    categorySummaryResponse.body as MonthlyCategoryTypeSummaryItem[]
  ).filter((i) => !i.isIncome);

  const cookieStore = await cookies();
  const initialHidden = cookieStore.get("totalAssetsHidden")?.value === "true";

  const unreadCount =
    "error" in unreadCountResponse
      ? 0
      : (unreadCountResponse.body as UnreadCountResponse).count;

  return (
    <HomePage
      transactions={transactionResponse.body}
      totalAssets={totalAssetsResponse.body}
      monthlySummary={monthlySummaryResponse.body}
      expenseItems={expenseItems}
      initialHidden={initialHidden}
      unreadCount={unreadCount}
    />
  );
}
