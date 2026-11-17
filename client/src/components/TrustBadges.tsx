/**
 * The site-wide trust badge bar: 24/7 response, IICRC, warranty and insurance.
 * Used on the home page, Contact, Service Areas and the city pages so the
 * badges, wording and layout stay the same everywhere.
 */
import { motion } from "framer-motion";

const bodyStyle = { fontFamily: "'Hanken Grotesk', sans-serif" };

export const TRUST_BADGES = [
  {
    src: "/photo/emergency-badge-icon.png",
    alt: "24 HR Emergency Response",
    title: "24/7 Emergency Response",
    text: "Dispatch answers day and night, every day of the year.",
  },
  {
    src: "/photo/iicrc-badge-icon.png",
    alt: "IICRC Certified",
    title: "IICRC Certified Firm",
    text: "Industry-standard fire, smoke and water restoration.",
  },
  {
    src: "/photo/warranty-badge-icon.png",
    alt: "5-Year Workmanship Warranty",
    title: "5-Year Workmanship Warranty",
    text: "Written warranty terms available on request.",
  },
  {
    src: "/photo/insurance-badge-icon.svg",
    alt: "Works directly with your insurance",
    title: "Works Directly With Insurance",
    text: "We bill your carrier and work with your adjuster through the claim.",
  },
];

/** Four badges in one bordered bar: a row on desktop, 2×2 on tablets, stacked on phones. */
export default function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full bg-white border border-[#3F4143]/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] ${className}`}
    >
      {TRUST_BADGES.map((badge, i) => (
        <div
          key={badge.alt}
          className="flex sm:flex-col items-center gap-5 sm:gap-4 px-6 py-6 sm:py-8 text-left sm:text-center border-[#3F4143]/10 border-b last:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
        >
          <motion.img
            src={badge.src}
            alt={badge.alt}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 0.7, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.16, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04, y: -3 }}
            className="h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
          />
          <div>
            <p className="font-extrabold text-[#2F3335] text-[15px] md:text-[16px] leading-snug" style={bodyStyle}>
              {badge.title}
            </p>
            <p className="mt-1.5 text-[14px] text-[#3F4143]/80 leading-snug" style={bodyStyle}>
              {badge.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
