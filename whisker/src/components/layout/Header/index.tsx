"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS } from "./const";
import { LogOut } from "lucide-react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 0);

    // 初期表示時にも現在のスクロール位置を反映する。
    updateScrollState();
    // スクロール時に状態を更新する。
    window.addEventListener("scroll", updateScrollState, { passive: true });
    // コンポーネント終了時にイベント監視を解除する。
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 hidden backdrop-blur-sm transition-shadow md:flex ${
        scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.08)]" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center px-6 py-3">
        <div className="flex-1">
          <Link href="/home">
            <span className="bg-linear-to-r from-[#40c4ff] to-[#2962ff] bg-clip-text text-xl font-bold text-transparent">
              Nekodion
            </span>
          </Link>
        </div>

        <nav className="flex shrink-0 justify-center gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium whitespace-nowrap"
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
            <LogOut />
          </Link>
        </div>
      </div>
    </header>
  );
};
