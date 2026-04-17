import Link from "next/link";
import { NAV_ITEMS } from "./const";
import { MdOutlineLogout } from "react-icons/md";

export const Header = () => {
  return (
    <header className="bg-card/80 border-border fixed top-0 right-0 left-0 z-50 hidden border-b backdrop-blur-sm md:flex">
      <div className="mx-auto flex w-full max-w-6xl items-center px-6 py-3">
        <div className="flex-1">
          <Link href="/home">
            <span className="text-lg font-bold">Nekodion</span>
          </Link>
        </div>

        <nav className="flex shrink-0 justify-center gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap"
            >
              <item.icon className="h-4 w-4" />
              {item.text}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-1 text-sm">
          <Link
            href="/auth/logout"
            className="flex items-center gap-1"
            prefetch={false}
          >
            ログアウト
            <MdOutlineLogout className="text-lg" />
          </Link>
        </div>
      </div>
    </header>
  );
};
