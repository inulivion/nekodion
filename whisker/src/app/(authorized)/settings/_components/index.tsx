import { connectGmail } from "@/features/gmail/actions";
import { Button } from "@/components/ui/button";

type Props = {
  connected: boolean;
};

export const SettingsPage = ({ connected }: Props) => {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">設定</h1>

      <div className="border-border bg-background space-y-4 rounded-xl border p-5">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="font-medium">Gmail 連携</p>
            <p className="text-muted-foreground text-sm">
              メールから入出金を自動で記録するために Gmail を連携してください
            </p>
          </div>
          {connected ? (
            <span className="text-sm font-medium text-green-600">連携済み</span>
          ) : (
            <form action={connectGmail}>
              <Button type="submit" size="sm">
                連携する
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
