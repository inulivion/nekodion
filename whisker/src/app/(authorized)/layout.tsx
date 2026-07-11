import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl">
      <Header />
      <main className="px-4 pt-5 pb-24 md:px-8 md:pt-20 md:pb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
