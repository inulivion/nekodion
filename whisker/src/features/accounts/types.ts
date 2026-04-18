export type AccountSummaryResponse = {
  accountType: string;
  accounts: AccountItem[];
};

export type AccountItem = {
  accountId: number;
  accountName: string;
  totalAmount: number;
};

export type AccountTemplateResponse = {
  id: number;
  accountType: string;
  accountName: string;
};

export type AccountDetailResponse = {
  accountId: number;
  accountName: string;
  accountType: string;
  accountTemplateId: number | null;
  totalAmount: number;
};
