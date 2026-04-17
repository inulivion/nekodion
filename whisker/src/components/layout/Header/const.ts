import { IconType } from "react-icons";
import { MdHome } from "react-icons/md";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import { AiFillAccountBook } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";

export type NavItem = {
  href: string;
  text: string;
  icon: IconType;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/home", text: "ホーム", icon: MdHome },
  { href: "/transactions", text: "入出金", icon: HiOutlineSwitchVertical },
  { href: "/monthly", text: "月次", icon: GiReceiveMoney },
  { href: "/accounts", text: "口座", icon: AiFillAccountBook },
  { href: "/settings", text: "設定", icon: FaUserTie },
];
