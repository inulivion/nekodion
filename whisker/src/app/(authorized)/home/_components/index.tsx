import { Button } from "@/components/ui/button";

import { TransactionTable } from "@/features/transaction/components/TransactionTable";
import {
  TotalAssetsResponse,
  DailyTransactionResponse,
  MonthlySummaryResponse,
} from "@/features/transaction/types";
import { TotalAssetsCard } from "./TotalAssetsCard";

import { ArrowRight, LogOut, PlusCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  transactions: DailyTransactionResponse[];
  totalAssets: TotalAssetsResponse;
  monthlySummary: MonthlySummaryResponse;
  expenseItems: { categoryTypeName: string; totalAmount: number }[];
  initialHidden: boolean;
  unreadCount: number;
};

export const HomePage = ({
  transactions,
  totalAssets,
  monthlySummary,
  expenseItems,
  initialHidden,
  unreadCount,
}: Props) => {
  const limitedTransactions = transactions.slice(0, 3); // 直近日の入出金を表示
  const monthlyBalance =
    monthlySummary.totalIncome - monthlySummary.totalExpense;

  return (
    <div className="space-y-4">
      <TotalAssetsCard
        totalAssets={totalAssets}
        initialHidden={initialHidden}
        monthlySummary={monthlySummary}
        monthlyBalance={monthlyBalance}
        expenseItems={expenseItems}
      />

      <div className="rounded-lg bg-white/60 p-4 shadow-sm">
        <div className="pb-3">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm font-semibold">
              最近の入出金
            </div>
            <Button asChild variant="ghost" size="xs" className="text-primary">
              <Link
                href="/transactions/new"
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                記録する
              </Link>
            </Button>
          </div>
        </div>
        {unreadCount > 0 && (
          <Link href="/transactions/unread">
            <div className="bg-primary/10 border-primary/20 text-primary mb-4 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:opacity-80">
              <span className="bg-primary flex h-2 w-2 rounded-full" />
              新着 {unreadCount}件
            </div>
          </Link>
        )}
        <div>
          {limitedTransactions.length > 0 ? (
            <>
              <TransactionTable transactions={limitedTransactions} />
              <div className="mt-4 text-center">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-primary w-full"
                >
                  <Link
                    href="/transactions"
                    className="flex items-center justify-center gap-1"
                  >
                    すべて見る
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground py-4 text-center text-sm">
              まだ入出金がありません
            </p>
          )}
        </div>
      </div>

      <div className="pt-2 pb-4 md:hidden">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground w-full"
        >
          <Link
            href="/auth/logout"
            prefetch={false}
            className="flex items-center justify-center gap-1.5"
          >
            <LogOut className="h-4 w-4" />
            ログアウト
          </Link>
        </Button>
      </div>
    </div>
  );
};
