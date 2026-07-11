import { Home, ArrowUpDown, ChartPie, Wallet, UserCog } from "lucide-react";

export type NavItem = {
  href: string;
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/home", text: "ホーム", icon: Home },
  { href: "/transactions", text: "入出金", icon: ArrowUpDown },
  { href: "/monthly", text: "月次", icon: ChartPie },
  { href: "/accounts", text: "口座", icon: Wallet },
  { href: "/settings", text: "設定", icon: UserCog },
];
