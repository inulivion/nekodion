"use server";

import { fetcher } from "@/util/fetcher";
import { redirect } from "next/navigation";
import {
  MonthlyCategoryTypeSummaryItem,
  MonthlySummaryResponse,
} from "./types";

export type MonthlyPageData = {
  summary: MonthlySummaryResponse;
  categoryTypeSummaries: MonthlyCategoryTypeSummaryItem[];
};

export async function getMonthlyDataAction(
  year: number,
  month: number,
): Promise<MonthlyPageData> {
  const [summaryResult, categoryResult] = await Promise.all([
    fetcher.get(`/transactions/monthly-summary?year=${year}&month=${month}`),
    fetcher.get(
      `/transactions/monthly-category-summary?year=${year}&month=${month}`,
    ),
  ]);

  if ("error" in summaryResult || "error" in categoryResult) {
    throw new Error("データの取得に失敗しました");
  }

  return {
    summary: summaryResult.body as MonthlySummaryResponse,
    categoryTypeSummaries:
      categoryResult.body as MonthlyCategoryTypeSummaryItem[],
  };
}

type TransactionFormValues = {
  direction?: string;
  accountId?: string;
  categoryId?: string;
  transactionName?: string;
  amount?: string;
  transactionDate?: string;
  description?: string;
  isAggregated?: boolean;
};

export type CreateTransactionActionState = {
  success?: boolean;
  errors?: {
    direction?: string;
    accountId?: string;
    categoryId?: string;
    transactionName?: string;
    amount?: string;
    transactionDate?: string;
    global?: string;
  };
  values?: TransactionFormValues;
};

export async function createTransactionAction(
  _prev: CreateTransactionActionState,
  formData: FormData,
): Promise<CreateTransactionActionState> {
  const direction = formData.get("direction") as string;
  const accountId = formData.get("accountId") as string;
  const categoryId = formData.get("categoryId") as string;
  const transactionName = (formData.get("transactionName") as string)?.trim();
  const amountStr = formData.get("amount") as string;
  const transactionDate = formData.get("transactionDate") as string;
  const description = (formData.get("description") as string)?.trim() || null;
  const isAggregated = formData.get("isAggregated") !== "false";

  const values: TransactionFormValues = {
    direction,
    accountId,
    categoryId,
    transactionName,
    amount: amountStr,
    transactionDate,
    description: description ?? "",
    isAggregated,
  };

  const errors: CreateTransactionActionState["errors"] = {};
  if (!direction) errors.direction = "取引種別を選択してください";
  if (!categoryId) errors.categoryId = "カテゴリーを選択してください";
  if (!transactionName) errors.transactionName = "取引名を入力してください";
  if (!amountStr || Number(amountStr) <= 0)
    errors.amount = "1以上の金額を入力してください";
  if (!transactionDate) errors.transactionDate = "取引日を入力してください";
  if (Object.keys(errors).length > 0) return { errors, values };

  const result = await fetcher.post("/transactions", {
    transactionType: "NORMAL",
    direction,
    accountId: accountId ? Number(accountId) : null,
    categoryId: Number(categoryId),
    transactionName,
    amount: Number(amountStr),
    transactionDateTime: `${transactionDate}T00:00:00`,
    description,
    isAggregated,
  });

  if ("error" in result) {
    return { errors: { global: "入出金の記録に失敗しました" }, values };
  }

  return { success: true };
}

export type UpdateTransactionActionState = {
  errors?: {
    direction?: string;
    accountId?: string;
    categoryId?: string;
    transactionName?: string;
    amount?: string;
    transactionDate?: string;
    global?: string;
  };
  values?: TransactionFormValues;
};

export async function updateTransactionAction(
  _prev: UpdateTransactionActionState,
  formData: FormData,
): Promise<UpdateTransactionActionState> {
  const id = formData.get("id") as string;
  const direction = formData.get("direction") as string;
  const accountId = formData.get("accountId") as string;
  const categoryId = formData.get("categoryId") as string;
  const transactionName = (formData.get("transactionName") as string)?.trim();
  const amountStr = formData.get("amount") as string;
  const transactionDate = formData.get("transactionDate") as string;
  const description = (formData.get("description") as string)?.trim() || null;
  const isAggregated = formData.get("isAggregated") !== "false";

  const values: TransactionFormValues = {
    direction,
    accountId,
    categoryId,
    transactionName,
    amount: amountStr,
    transactionDate,
    description: description ?? "",
    isAggregated,
  };

  const errors: UpdateTransactionActionState["errors"] = {};
  if (!direction) errors.direction = "取引種別を選択してください";
  if (!categoryId) errors.categoryId = "カテゴリーを選択してください";
  if (!transactionName) errors.transactionName = "取引名を入力してください";
  if (!amountStr || Number(amountStr) <= 0)
    errors.amount = "1以上の金額を入力してください";
  if (!transactionDate) errors.transactionDate = "取引日を入力してください";
  if (Object.keys(errors).length > 0) return { errors, values };

  const result = await fetcher.put(`/transactions/${id}`, {
    transactionType: "NORMAL",
    direction,
    accountId: accountId ? Number(accountId) : null,
    categoryId: Number(categoryId),
    transactionName: transactionName,
    amount: Number(amountStr),
    transactionDateTime: `${transactionDate}T00:00:00`,
    description,
    isAggregated,
  });

  if ("error" in result) {
    return { errors: { global: "入出金の更新に失敗しました" }, values };
  }

  redirect("/transactions");
}

export async function deleteTransactionAction(id: number): Promise<void> {
  await fetcher.delete(`/transactions/${id}`);
  redirect("/transactions");
}

export async function markAllAsReadAction(ids: number[]): Promise<void> {
  await fetcher.patch("/transactions/read-all", { transactionIds: ids });
  redirect("/transactions");
}
