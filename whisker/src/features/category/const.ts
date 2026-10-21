import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  Gamepad2,
  Bus,
  Scissors,
  HeartPulse,
  BookOpen,
  Package,
  Home,
  Smartphone,
  Car,
  FileText,
  MoreHorizontal,
  HelpCircle,
} from "lucide-react";

type CategoryIconConfig = {
  Icon: LucideIcon;
  color: string;
};

export const CATEGORY_ICON_MAP: Record<string, CategoryIconConfig> = {
  給与: { Icon: Banknote, color: "#0023A2" },
  食費: { Icon: UtensilsCrossed, color: "#FF0000" },
  日用品: { Icon: ShoppingBag, color: "#F33581" },
  交際費: { Icon: Users, color: "#00E03C" },
  "趣味・娯楽": { Icon: Gamepad2, color: "#00E1FF" },
  交通費: { Icon: Bus, color: "#FFD000" },
  "美容・衣服": { Icon: Scissors, color: "#FF6F00" },
  "医療・健康": { Icon: HeartPulse, color: "#FF2727" },
  "教育・教養": { Icon: BookOpen, color: "#0063CE" },
  大型出費: { Icon: Package, color: "#CEE42C" },
  "住宅・水道光熱費": { Icon: Home, color: "#00B121" },
  通信費: { Icon: Smartphone, color: "#CD3796" },
  自動車: { Icon: Car, color: "#2AB4DA" },
  "税金・社会保険": { Icon: FileText, color: "#788300" },
  その他: { Icon: MoreHorizontal, color: "#555681" },
  未分類: { Icon: HelpCircle, color: "#516160" },
};

const DEFAULT_ICON_CONFIG: CategoryIconConfig = {
  Icon: HelpCircle,
  color: "#d1d5db",
};

export const getCategoryIconConfig = (
  categoryTypeName: string,
): CategoryIconConfig => {
  return CATEGORY_ICON_MAP[categoryTypeName] ?? DEFAULT_ICON_CONFIG;
};

export const getCategoryColor = (categoryTypeName: string): string => {
  return getCategoryIconConfig(categoryTypeName).color;
};
