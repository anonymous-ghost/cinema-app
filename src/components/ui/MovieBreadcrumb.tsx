import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="text-sm text-medium-grey mb-6">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="section-description mx-1"> › </span>}
          {item.href ? (
            <Link href={item.href}>
              <a className="hover:text-white transition">{item.label}</a>
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
