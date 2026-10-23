import Link from "next/link";
import { Plus } from "lucide-react";

export const AddTransactionButton = () => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 mx-auto mb-0! flex w-full max-w-4xl justify-end px-6 md:bottom-8 md:px-12">
      <Link
        href="/transactions/new"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#21C5FD_0%,#2979FF_100%)] text-white shadow-xl"
      >
        <Plus className="size-10 text-white" />
      </Link>
    </div>
  );
};
