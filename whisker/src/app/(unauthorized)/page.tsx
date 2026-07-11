import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 py-2">
      <h1 className="text-4xl font-bold md:text-6xl">
        子猫を<span className="text-blue-600">こねこね</span>する
      </h1>
      <div className="flex items-center justify-center gap-2">
        <Button asChild variant="default" className="px-8 py-5 text-xl">
          <Link href="/auth/login?screen_hint=signup">新規登録</Link>
        </Button>
        <Button asChild variant="outline" className="px-8 py-5 text-xl">
          <Link href="/auth/login">ログイン</Link>
        </Button>
      </div>
    </div>
  );
}
