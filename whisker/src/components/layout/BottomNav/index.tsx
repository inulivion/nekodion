import Link from "next/link";
import { NAV_ITEMS } from "../Header/const";

export const BottomNav = () => {
  return (
    <nav className="bg-card/95 border-border safe-area-pb fixed right-0 bottom-0 left-0 z-50 flex border-t backdrop-blur-sm md:hidden">
      <div className="flex w-full items-center justify-around p-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-w-[56px] flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.text}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
