import { Button } from "@/components/ui/button";
import { TransactionTable } from "@/features/transaction/components/TransactionTable";
import { DailyTransactionResponse } from "@/features/transaction/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  transactions: DailyTransactionResponse[];
};

export const TransactionPage = ({ transactions }: Props) => {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">入出金一覧</h2>
        <Button asChild size="sm">
          <Link href="/transactions/new" className="flex items-center gap-1.5">
            <PlusCircle className="h-4 w-4" />
            記録する
          </Link>
        </Button>
      </div>
      <TransactionTable transactions={transactions} />
    </div>
  );
};
