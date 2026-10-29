import {
  ShieldCheck,
  FileCheck2,
  Phone,
  ClipboardList,
  Building2,
  Plus,
} from "lucide-react";
import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import {
  COMMERCIAL_FAQ,
  COMMERCIAL_STATS,
  COMMERCIAL_CLIENTS,
  COMMERCIAL_CREDENTIALS,
  MAIN_PHONE,
  MAIN_PHONE_TEL,
} from "@/data/commercial";

const CREDENTIAL_ICONS = [ShieldCheck, null, null, FileCheck2];
// IICRC and warranty use the real badge artwork, as on the printed one-pagers.
const CREDENTIAL_BADGES: (string | null)[] = [
  null,
  "/photo/iicrc-badge-icon.png",
  "/photo/warranty-badge-icon.png",
  null,
];

/** Four-up licensing / certification / warranty / insurance strip. */
export function CredentialStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-y border-[#3F4143]/10 divide-y sm:divide-y-0 divide-[#3F4143]/10 bg-white">
      {COMMERCIAL_CREDENTIALS.map((c, idx) => {
        const Icon = CREDENTIAL_ICONS[idx];
        return (
          <div
            key={c.title}
            className={`flex items-start gap-4 p-6 ${idx % 2 === 1 ? "sm:border-l" : ""} ${idx >= 2 ? "sm:border-t xl:border-t-0" : ""} ${idx === 2 ? "xl:border-l" : ""} border-[#3F4143]/10`}
          >
            <div className="w-11 h-12 flex-shrink-0 flex items-start justify-center">
              {Icon ? (
                <Icon size={32} className="text-[#8DBD42] mt-0.5" />
              ) : (
                <img
                  src={CREDENTIAL_BADGES[idx]!}
                  alt={`${c.title} badge`}
                  width={44}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div>
              <p className="font-bold text-[#2F3335] text-[15px]">{c.title}</p>
              <p className="text-[#3F4143]/65 text-sm leading-snug mt-1">
                {c.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Numbered first-call-to-walkthrough process. */
export function ProcessSteps({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  return (
    <ol className="divide-y divide-[#3F4143]/10 border-y border-[#3F4143]/10">
      {steps.map((s, idx) => (
        <li key={s.title}>
          <FadeIn delay={idx * 0.04} direction="up" className="grid grid-cols-[3.25rem_1fr] md:grid-cols-[5rem_1fr] gap-2 py-6 md:py-7">
            <span className="text-3xl md:text-4xl font-bold text-[#8DBD42] font-serif leading-none">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-bold text-[#2F3335] text-lg md:text-xl">
                {s.title}
              </h3>
              <p className="text-[#3F4143]/75 text-[15px] leading-relaxed mt-1.5 max-w-3xl">
                {s.text}
              </p>
            </div>
          </FadeIn>
        </li>
      ))}
    </ol>
  );
}

/** Recent commercial clients list plus the "we built our own building" note. */
export function ClientsBlock() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#3F4143] font-serif mb-5">
          Recent commercial clients
        </h2>
        <ul className="divide-y divide-[#3F4143]/10 border-y border-[#3F4143]/10">
          {COMMERCIAL_CLIENTS.map(c => (
            <li
              key={c}
              className="flex items-center gap-3 py-3 text-[15px] text-[#2F3335]"
            >
              <span className="w-2 h-2 rounded-full bg-[#8DBD42] flex-shrink-0" />
              {c}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#3F4143]/60 mt-3">
          Also hotels, apartment communities, golf and club facilities, schools
          and other commercial buildings.
        </p>
      </div>
      <div className="border-l-4 border-[#8DBD42] bg-[#8DBD42]/8 p-6">
        <p className="font-bold text-[#2F3335] flex items-center gap-2">
          <Building2 size={18} className="text-[#8DBD42]" /> We built our own
          commercial building
        </p>
        <p className="text-[15px] text-[#3F4143]/75 mt-2 leading-relaxed">
          Our office and showroom at{" "}
          <a
            href="https://maps.google.com/?q=8695+Martin+Way+E+Unit+103+Lacey+WA+98516"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#8DBD42] underline-offset-2 hover:text-[#2F3335]"
          >
            8695 Martin Way E, Suite 103, Lacey
          </a>
          , was built by our own team. Stop by and see the work in person.
        </p>
      </div>
    </div>
  );
}

/** "Before a loss" priority list pitch + what to have ready when calling. */
export function PriorityListBlock({ callChecklist }: { callChecklist: string }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border-l-4 border-[#8DBD42] bg-white p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <p className="font-bold text-[#2F3335] text-lg flex items-center gap-2">
          <ClipboardList size={20} className="text-[#8DBD42]" /> Before a loss:
          get on our priority list
        </p>
        <p className="text-[15px] text-[#3F4143]/75 mt-3 leading-relaxed">
          We'll walk your property at no charge, note shutoff locations, access
          and key contacts, and keep them on file. If something happens, your
          call goes to the front of the line and our crew arrives already
          knowing the building.
        </p>
        <a
          href="#commercial-inquiry"
          className="inline-block mt-5 text-[12px] font-black uppercase tracking-[0.14em] text-[#5f8f22] hover:text-[#2F3335]"
        >
          Request a free site walk →
        </a>
      </div>
      <div className="bg-white p-6 md:p-8 border border-[#3F4143]/8">
        <p className="font-bold text-[#2F3335] text-lg">
          When you call, have ready
        </p>
        <p className="text-[15px] text-[#3F4143]/75 mt-3 leading-relaxed">
          {callChecklist}
        </p>
      </div>
    </div>
  );
}

/** Full-width green call bar. */
export function UrgentCallBar({ line }: { line: string }) {
  return (
    <div className="bg-[#2f6b2a] text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <p className="text-lg md:text-xl font-bold">{line}</p>
          <p className="text-white/80 text-[15px] mt-1">
            Dispatch answers 24/7. Crews on site within 60 minutes of dispatch.
          </p>
        </div>
        <a
          href={MAIN_PHONE_TEL}
          className="inline-flex items-center justify-center gap-3 bg-white text-[#2f6b2a] hover:bg-[#f1f7e8] font-black text-xl md:text-2xl px-6 py-4 transition-colors whitespace-nowrap"
        >
          <Phone size={22} /> {MAIN_PHONE}
        </a>
      </div>
    </div>
  );
}

/** Dark green band of headline numbers. */
export function StatsBand() {
  return (
    <div className="relative bg-[#1f3a24] text-white overflow-hidden">
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#8DBD42]/15 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-[1200px] 2xl:max-w-[1400px] px-6 py-10 md:py-12 grid grid-cols-2 lg:grid-cols-4 gap-y-8">
        {COMMERCIAL_STATS.map((s, idx) => (
          <div
            key={s.label}
            className={`px-2 md:px-6 ${idx % 2 === 1 ? "border-l border-white/15" : ""} ${idx === 2 ? "lg:border-l lg:border-white/15" : ""}`}
          >
            <p className="text-4xl md:text-5xl font-bold font-serif text-[#a9d468] leading-none">
              {s.value}
            </p>
            <p className="mt-2 text-[11px] md:text-xs uppercase tracking-[0.18em] font-bold text-white/70">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Commercial FAQ. Uses native <details> so every answer is in the HTML
 * (crawlers and AI assistants can read it) while staying collapsible.
 */
export function CommercialFAQ() {
  return (
    <div className="divide-y divide-[#3F4143]/10 border-y border-[#3F4143]/10">
      {COMMERCIAL_FAQ.map((f, idx) => (
        <details key={f.question} className="group py-1" open={idx === 0}>
          <summary className="flex items-start justify-between gap-6 cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="font-bold text-[#2F3335] text-[17px] md:text-lg leading-snug">
              {f.question}
            </h3>
            <span className="mt-0.5 w-7 h-7 flex-shrink-0 flex items-center justify-center border border-[#8DBD42]/50 text-[#5f8f22] transition-transform duration-200 group-open:rotate-45">
              <Plus size={15} />
            </span>
          </summary>
          <p className="pb-6 pr-12 text-[15px] text-[#3F4143]/75 leading-relaxed max-w-3xl">
            {f.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

/** Drag / keyboard before-after comparison. */
export function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-[#2F3335] select-none shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      <img
        src={after}
        alt={`After: ${alt}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`Before: ${alt}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <span className="absolute left-3 top-3 bg-[#1f2122]/85 text-white text-[11px] font-black uppercase tracking-[0.14em] px-2.5 py-1">
        Before
      </span>
      <span className="absolute right-3 top-3 bg-[#8DBD42] text-white text-[11px] font-black uppercase tracking-[0.14em] px-2.5 py-1">
        After
      </span>
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
        style={{ left: `calc(${pos}% - 1.5px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#2f6b2a] flex items-center justify-center shadow-lg text-sm font-black">
          ⇆
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={e => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize touch-pan-y"
      />
    </div>
  );
}
