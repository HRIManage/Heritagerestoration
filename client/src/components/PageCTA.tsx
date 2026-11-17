import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

/**
 * The one closing call-to-action used on every inner page, built from the
 * homepage's contact section: ivory band that runs into the white footer,
 * dark green contact card on the left, the page's own message on the right.
 * Each page passes its existing headline, text, links and photo, so content
 * stays page-specific while the design is the same everywhere.
 */
type CtaLink = { href: string; label: string };

export default function PageCTA({
  kicker,
  title,
  children,
  primary,
  secondary,
  image,
}: {
  /** optional short line above the headline (sentence case) */
  kicker?: string;
  title: string;
  children: ReactNode;
  primary: CtaLink;
  secondary?: CtaLink;
  image?: { src: string; alt: string; position?: string };
}) {
  const isExternal = (href: string) => /^(tel:|mailto:|https?:)/.test(href);

  return (
    <section className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F5F0_22%)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div data-reveal-stagger className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-16">
          {/* message */}
          <div className="flex flex-col justify-center lg:order-2 lg:col-span-7">
            {kicker && (
              <p className="mb-4 text-[15px] font-semibold text-[#44781a]">{kicker}</p>
            )}
            <h2 className="font-serif text-[34px] font-bold leading-[1.08] text-[#1f2a24] md:text-[46px]">
              {title}
            </h2>
            <div className="mt-5 max-w-[620px] space-y-4 text-[16px] leading-relaxed text-[#3F4143]/80 md:text-[17px]">
              {children}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaButton link={primary} external={isExternal(primary.href)} variant="primary" />
              {secondary && (
                <CtaButton link={secondary} external={isExternal(secondary.href)} variant="secondary" />
              )}
            </div>
          </div>

          {/* contact card */}
          <div className="lg:order-1 lg:col-span-5">
            <div className="card-3d flex h-full flex-col overflow-hidden bg-[#173d24] text-white">
              {image && (
                <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[16/10]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: image.position ?? "center" }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,61,36,0)_55%,rgba(23,61,36,0.55)_100%)]" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-8 md:p-10">
                <p className="font-serif text-[24px] font-bold leading-tight md:text-[27px]">
                  Fast answers when the damage cannot wait.
                </p>
                <div className="mt-7 space-y-5">
                  <ContactRow href="tel:+13604561886" icon={<Phone size={18} />} label="Call now" value="(360) 456-1886" big />
                  <ContactRow href="mailto:office@firewaterstorm.com" icon={<Mail size={18} />} label="Email" value="office@firewaterstorm.com" />
                  <ContactRow icon={<MapPin size={18} />} label="Local offices" value="Lacey and Chehalis, WA" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaButton({ link, external, variant }: { link: CtaLink; external: boolean; variant: "primary" | "secondary" }) {
  const cls =
    variant === "primary"
      ? "btn-3d inline-flex items-center justify-center gap-2.5 bg-[#8DBD42] px-7 py-4 text-[15px] font-bold text-[#173d24] transition-colors hover:bg-[#97cf4f]"
      : "btn-3d inline-flex items-center justify-center gap-2 border border-[#173d24]/30 bg-white px-7 py-4 text-[15px] font-bold text-[#173d24] transition-colors hover:border-[#173d24]";
  const content = (
    <>
      {variant === "primary" && link.href.startsWith("tel:") && <Phone size={16} />}
      {link.label}
      {variant === "secondary" && <ArrowRight size={16} />}
    </>
  );
  return external ? (
    <a href={link.href} className={cls}>{content}</a>
  ) : (
    <Link href={link.href} className={cls}>{content}</Link>
  );
}

function ContactRow({ href, icon, label, value, big }: { href?: string; icon: ReactNode; label: string; value: string; big?: boolean }) {
  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8DBD42] text-[#173d24] transition-transform duration-300 group-hover:scale-105">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-white/65">{label}</span>
        <span className={`mt-0.5 block font-bold text-white break-words ${big ? "text-[19px]" : "text-[15px]"}`}>{value}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className="group flex items-start gap-4">{inner}</a>
  ) : (
    <div className="flex items-start gap-4">{inner}</div>
  );
}
