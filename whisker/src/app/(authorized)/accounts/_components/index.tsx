import { Button } from "@/components/ui/button";
import { AccountCard } from "@/features/accounts/components/AccountCard";
import { AccountSummaryResponse } from "@/features/accounts/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  accounts: AccountSummaryResponse[];
};

export const AccountPage = ({ accounts }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">口座一覧</h1>
        <Button asChild size="sm">
          <Link href="/accounts/new" className="flex items-center gap-1.5">
            <PlusCircle className="h-4 w-4" />
            口座を追加
          </Link>
        </Button>
      </div>

      {accounts.map((item) => (
        <AccountCard key={item.accountType} accountGroup={item} />
      ))}
    </div>
  );
};
