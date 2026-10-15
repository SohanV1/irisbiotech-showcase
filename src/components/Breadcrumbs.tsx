import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  path?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
};

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  // Do not render breadcrumbs on home page
  if (items.length === 0) return null;

  const fullItems = [{ label: 'Home', path: '/' }, ...items];

  // Schema.org BreadcrumbList structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path ? `https://irisbiotech.com${item.path}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="pt-2 pb-6">
        <ol className="flex items-center flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] font-medium text-[#88928A]">
          {fullItems.map((item, idx) => {
            const isLast = idx === fullItems.length - 1;
            return (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-[#C4AA7D] opacity-70">/</span>}
                {isLast || !item.path ? (
                  <span className="text-[#1E3926] font-semibold">
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => onNavigate(item.path!)}
                    className="hover:text-[#141715] transition-colors focus:outline-none"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
