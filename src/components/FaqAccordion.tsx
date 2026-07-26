import type { FaqItem } from "@/content/types";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-8 divide-y divide-black/10 border-t border-black/10">
      {items.map((item) => (
        <details key={item.id} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
            {item.question}
            <span className="ml-4 font-mono text-forest group-open:hidden">+</span>
            <span className="ml-4 hidden font-mono text-forest group-open:inline">–</span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
