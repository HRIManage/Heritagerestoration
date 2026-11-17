/**
 * Fixed (non-moving) trust bar: every message is visible at once. Replaces the
 * old scrolling ticker strips. One row on desktops; on smaller screens the
 * messages wrap into centred rows.
 */
import { Check } from "lucide-react";

const bodyStyle = { fontFamily: "'Hanken Grotesk', sans-serif" };

export default function StaticTrustBar({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={`relative z-10 bg-[#173d24] border-t-2 border-[#8DBD42] ${className}`} style={bodyStyle}>
      <ul
        aria-label="Why customers choose Heritage Restoration"
        className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 min-[1570px]:px-0 py-2 lg:py-0 flex flex-wrap justify-center gap-x-6 sm:gap-x-0 lg:flex-nowrap"
      >
        {items.map(item => (
          <li
            key={item}
            className="sm:basis-1/3 lg:basis-auto lg:flex-1 flex items-center justify-center gap-2 py-2 sm:px-2 sm:py-3 lg:py-5 short:py-3.5 text-center lg:border-l lg:first:border-l-0 border-white/15"
          >
            <Check size={16} strokeWidth={3} aria-hidden="true" className="shrink-0 text-[#a9d468]" />
            <span className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-semibold leading-snug text-white">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
