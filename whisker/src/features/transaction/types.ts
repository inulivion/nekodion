export type DailyTransactionResponse = {
  transactionDate: string;
  dailyTransactions: TransactionItem[];
};

export type TransactionItem = {
  id: number;
  amount: number;
  transactionType: string;
  transactionName: string;
  transactionDescription: string;
};

export type TotalAssetsResponse = {
  totalAssets: number;
};

export type TransactionDetailResponse = {
  id: number;
  accountId: number;
  transactionType: string;
  transactionName: string | null;
  amount: number;
  transactionDate: string;
  description: string | null;
};
