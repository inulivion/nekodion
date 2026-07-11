"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p>ただいまアクセスできません。しばらくお待ちください。</p>
      <Link
        href="/auth/logout"
        className="flex items-center gap-1"
        prefetch={false}
      >
        ログアウト
        <LogOut className="text-lg" />
      </Link>
    </div>
  );
}
