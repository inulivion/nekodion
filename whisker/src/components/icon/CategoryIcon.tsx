"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  color?: string;
};

export const CategoryIcon = ({ Icon, color }: Props) => {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: color ?? "#d1d5db" }}
    >
      <Icon size={20} color="white" />
    </div>
  );
};
