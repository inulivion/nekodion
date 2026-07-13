export const formatAmount = (amount: number, direction: string) => {
  const abs = Math.abs(amount).toLocaleString();
  if (direction === "OUT") return `¥-${abs}`;
  return `¥${abs}`;
};
