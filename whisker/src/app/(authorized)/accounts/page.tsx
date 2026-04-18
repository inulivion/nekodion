import { getAccounts } from "@/features/accounts/api";
import { AccountPage } from "./_components";

export default async function Account() {
  const accountsResponse = await getAccounts();

  if ("error" in accountsResponse) {
    throw new Error("データの取得に失敗しました");
  }

  return <AccountPage accounts={accountsResponse.body} />;
}
