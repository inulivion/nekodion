"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  TotalAssetsResponse,
  MonthlySummaryResponse,
} from "@/features/transaction/types";
import Image from "next/image";
import { ExpensePieChart } from "@/features/transaction/components/ExpensePieChart";

type Props = {
  totalAssets: TotalAssetsResponse;
  initialHidden: boolean;
  monthlySummary: MonthlySummaryResponse;
  monthlyBalance: number;
  expenseItems: { categoryTypeName: string; totalAmount: number }[];
};

const COOKIE_NAME = "totalAssetsHidden";

export const TotalAssetsCard = ({
  totalAssets,
  initialHidden,
  monthlySummary,
  monthlyBalance,
  expenseItems,
}: Props) => {
  const [hidden, setHidden] = useState(initialHidden);

  const toggle = () => {
    const next = !hidden;
    setHidden(next);
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-lg bg-white/60 p-4 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">総資産</p>
          <div className="flex items-center">
            <p className="mr-4 text-4xl font-bold">
              {hidden
                ? "¥ ---,---"
                : `¥${totalAssets.totalAssets.toLocaleString()}`}
            </p>
            <button
              onClick={toggle}
              className="text-muted-foreground"
              aria-label="総資産の表示切替"
            >
              {hidden ? (
                <EyeOff className="mt-2 h-5 w-5" />
              ) : (
                <Eye className="mt-2 h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500">前日比 →</p>
        </div>
        <Image
          src="/images/top-cat.png"
          alt="総資産"
          width={100}
          height={100}
        />
      </div>

      <div className="rounded-lg bg-white/60 p-4 shadow-sm">
        <p className="text-muted-foreground mb-2 text-sm font-semibold">
          {monthlySummary.month}月の収支
        </p>
        <div className="flex items-center justify-between gap-4">
          <ExpensePieChart items={expenseItems} hidden={hidden} />
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">収入</p>
              <p className="flex-1 text-right text-2xl font-bold text-blue-600">
                {hidden
                  ? "¥ ---,---"
                  : `¥${monthlySummary.totalIncome.toLocaleString()}`}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">支出</p>
              <p className="flex-1 text-right text-2xl font-bold text-red-500">
                {hidden
                  ? "¥ ---,---"
                  : `¥${monthlySummary.totalExpense.toLocaleString()}`}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">収支</p>
              <p
                className={`flex-1 text-right text-2xl font-bold ${
                  monthlyBalance >= 0 ? "text-blue-600" : "text-red-500"
                }`}
              >
                {hidden
                  ? "¥ ---,---"
                  : `${monthlyBalance >= 0 ? "+" : ""}¥${monthlyBalance.toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
