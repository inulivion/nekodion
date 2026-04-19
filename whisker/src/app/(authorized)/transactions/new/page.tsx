import { CreateTransactionPage } from "./_components";
import { getAccounts } from "@/features/accounts/api";

export default async function CreateTransaction() {
  const accountsResponse = await getAccounts();

  if ("error" in accountsResponse) {
    throw new Error("データの取得に失敗しました");
  }

  return <CreateTransactionPage accounts={accountsResponse.body} />;
}
