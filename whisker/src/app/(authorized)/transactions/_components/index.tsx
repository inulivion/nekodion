import { Card, CardContent } from "@/components/ui/card";
import { TransactionTable } from "@/features/transaction/components/TransactionTable";
import { DailyTransactionResponse } from "@/features/transaction/types";
import Link from "next/link";
import { AddTransactionButton } from "@/features/transaction/components/AddTransactionButton";

type Props = {
  transactions: DailyTransactionResponse[];
  unreadCount: number;
};

export const TransactionPage = ({ transactions, unreadCount }: Props) => {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">入出金一覧</h2>
      </div>

      {unreadCount > 0 && (
        <Link href="/transactions/unread">
          <div className="mb-4 flex cursor-pointer items-center gap-2 rounded-lg bg-[linear-gradient(90deg,#B7BBC7_3%,#CACCDa_37%,#ABAEB5_100%)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-80">
            新着 {unreadCount}件
          </div>
        </Link>
      )}

      <Card className="shadow-[0_4px_20px_rgba(0,0,0,0.04)] ring-0">
        <CardContent>
          <TransactionTable transactions={transactions} />
        </CardContent>
      </Card>

      <AddTransactionButton />
    </div>
  );
};
