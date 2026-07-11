"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { TotalAssetsResponse } from "@/features/transaction/types";
import Image from "next/image";

type Props = {
  totalAssets: TotalAssetsResponse;
  initialHidden: boolean;
};

const COOKIE_NAME = "totalAssetsHidden";

export const TotalAssetsCard = ({ totalAssets, initialHidden }: Props) => {
  const [hidden, setHidden] = useState(initialHidden);

  const toggle = () => {
    const next = !hidden;
    setHidden(next);
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-white/60 p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">総資産</p>
        <div className="flex items-center">
          <p className="mr-4 text-4xl font-bold">
            {hidden
              ? "¥ ---,---"
              : `¥${totalAssets.totalAssets.toLocaleString()}`}
          </p>
          <button
            onClick={toggle}
            className="text-muted-foreground"
            aria-label="総資産の表示切替"
          >
            {hidden ? (
              <EyeOff className="mt-2 h-5 w-5" />
            ) : (
              <Eye className="mt-2 h-5 w-5" />
            )}
          </button>
        </div>
        <p className="text-sm text-gray-500">前日比 →</p>
      </div>
      <Image src="/images/top-cat.png" alt="総資産" width={100} height={100} />
    </div>
  );
};
