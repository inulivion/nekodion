"use server";

import { fetcher } from "@/util/fetcher";
import { redirect } from "next/navigation";

export type AccountActionState = {
  errors?: {
    accountType?: string;
    accountName?: string;
    global?: string;
  };
};

export type CreateAccountActionState = AccountActionState;

export async function createAccountAction(
  _prev: CreateAccountActionState,
  formData: FormData,
): Promise<CreateAccountActionState> {
  const accountType = formData.get("accountType") as string;
  const accountTemplateId = formData.get("accountTemplateId") as string | null;
  const accountName = (formData.get("accountName") as string)?.trim();
  const initialAmountRaw = formData.get("initialAmount") as string | null;

  const errors: CreateAccountActionState["errors"] = {};
  if (!accountType) errors.accountType = "口座種別を選択してください";
  if (!accountName) errors.accountName = "口座名を入力してください";
  if (Object.keys(errors).length > 0) return { errors };

  const result = await fetcher.post("/accounts", {
    accountType,
    accountTemplateId: accountTemplateId ? Number(accountTemplateId) : null,
    accountName,
    initialAmount:
      initialAmountRaw !== null && initialAmountRaw !== ""
        ? Number(initialAmountRaw)
        : null,
  });

  if ("error" in result) {
    return { errors: { global: "口座の作成に失敗しました" } };
  }

  redirect("/accounts");
}

export type UpdateAccountActionState = AccountActionState;

export async function updateAccountAction(
  _prev: UpdateAccountActionState,
  formData: FormData,
): Promise<UpdateAccountActionState> {
  const id = formData.get("id") as string;
  const accountType = formData.get("accountType") as string;
  const accountTemplateId = formData.get("accountTemplateId") as string | null;
  const accountName = (formData.get("accountName") as string)?.trim();

  const errors: UpdateAccountActionState["errors"] = {};
  if (!accountType) errors.accountType = "口座種別を選択してください";
  if (!accountName) errors.accountName = "口座名を入力してください";
  if (Object.keys(errors).length > 0) return { errors };

  const result = await fetcher.put(`/accounts/${id}`, {
    accountType,
    accountTemplateId: accountTemplateId ? Number(accountTemplateId) : null,
    accountName,
  });

  if ("error" in result) {
    return { errors: { global: "口座の更新に失敗しました" } };
  }

  redirect("/accounts");
}

export async function deleteAccountAction(id: number): Promise<void> {
  await fetcher.delete(`/accounts/${id}`);
  redirect("/accounts");
}
