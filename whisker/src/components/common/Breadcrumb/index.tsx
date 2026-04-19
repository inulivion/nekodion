import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumb = ({ items }: Props) => {
  return (
    <nav className="mb-6 flex items-center gap-1 text-sm">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-primary font-medium hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-muted-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};
