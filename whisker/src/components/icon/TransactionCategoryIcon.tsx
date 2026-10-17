"use client";

import { getCategoryIconConfig } from "@/features/category/const";
import { CategoryIcon } from "./CategoryIcon";

type Props = {
  categoryTypeName: string;
};

export const TransactionCategoryIcon = ({ categoryTypeName }: Props) => {
  const { Icon, color } = getCategoryIconConfig(categoryTypeName);
  return <CategoryIcon Icon={Icon} color={color} />;
};
