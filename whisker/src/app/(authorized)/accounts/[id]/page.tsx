import { getAccount, getAccountTemplates } from "@/features/accounts/api";
import { AccountDetailPage } from "./_components";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AccountDetail({ params }: Props) {
  const { id } = await params;
  const [accountResponse, templatesResponse] = await Promise.all([
    getAccount(Number(id)),
    getAccountTemplates(),
  ]);

  if ("error" in accountResponse) {
    throw new Error("データの取得に失敗しました");
  }

  if ("error" in templatesResponse) {
    throw new Error("データの取得に失敗しました");
  }

  return (
    <AccountDetailPage
      account={accountResponse.body}
      templates={templatesResponse.body}
    />
  );
}
