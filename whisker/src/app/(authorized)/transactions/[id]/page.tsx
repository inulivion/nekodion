import { getTransaction } from "@/features/transaction/api";
import { getAccounts } from "@/features/accounts/api";
import { TransactionDetailPage } from "./_components";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TransactionDetail({ params }: Props) {
  const { id } = await params;
  const [transactionResponse, accountsResponse] = await Promise.all([
    getTransaction(Number(id)),
    getAccounts(),
  ]);

  if ("error" in transactionResponse) {
    throw new Error("データの取得に失敗しました");
  }

  if ("error" in accountsResponse) {
    throw new Error("データの取得に失敗しました");
  }

  return (
    <TransactionDetailPage
      transaction={transactionResponse.body}
      accounts={accountsResponse.body}
    />
  );
}
