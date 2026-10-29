import { Link } from "wouter";
import { Phone, ArrowRight } from "lucide-react";

/**
 * Call bar pinned to the bottom of the screen on phones and small tablets.
 * Hidden from 1024px up, where the header already keeps the call button in view.
 * Any `tel:` link is picked up automatically by the site's call-tracking listener.
 */
export default function MobileCallBar() {
  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-30 flex bg-[#173d24] border-t-2 border-[#8DBD42] shadow-[0_-8px_24px_rgba(0,0,0,0.25)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="tel:+13604561886"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#8DBD42] text-[#12301b] font-black text-[13px] uppercase tracking-[0.1em] active:bg-[#7bb033]"
      >
        <Phone size={16} className="stroke-[2.5]" /> Call 24/7
      </a>
      <Link
        href="/contact"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-bold text-[13px] uppercase tracking-[0.1em] active:bg-white/10"
      >
        Free estimate <ArrowRight size={15} />
      </Link>
    </div>
  );
}
