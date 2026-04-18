const DAY_OF_WEEK = ["日", "月", "火", "水", "木", "金", "土"] as const;

export const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = DAY_OF_WEEK[date.getDay()];
  return `${y}年${m}月${d}日（${day}）`;
};
