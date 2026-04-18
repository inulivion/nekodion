export const formatAmount = (amount: number, transactionType: string) => {
  const abs = Math.abs(amount).toLocaleString();
  if (transactionType === "INCOME") return `¥${abs}`;
  if (transactionType === "EXPENSE") return `¥-${abs}`;
  return `¥${abs}`;
};
