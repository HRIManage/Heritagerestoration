import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { ShieldCheck, Phone } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/seo";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const rights = [
  {
    number: "01",
    title: "No Requirement for 3 Bids",
    body: "You are not required to get 3 bids.",
  },
  {
    number: "02",
    title: "Emergency Protective Steps",
    body: "You may take, and be fully compensated for, the cost of emergency steps to safeguard your property from further damage after a loss. In fact, you have an obligation to do so under the terms of your policy. The insurance company may not be liable for additional expenses if you fail to provide such protection.",
  },
  {
    number: "03",
    title: "Full Restoration to Pre-Damage Condition",
    body: "If you have secured adequate coverage, you are entitled to be paid for the fair cost of fully restoring your home to its pre-damage condition. However, you may not be insured for the repair of unrelated problems, code deficiencies or prior damage.",
  },
  {
    number: "04",
    title: "Licensed & Insured Repair Firm",
    body: "You are entitled to employ, and should insist upon, a fully licensed and insured repair firm of good reputation. However, if you do not choose to employ such a firm, the consequences and liability for any injury, damage or other action may rest with you.",
  },
  {
    number: "05",
    title: "Experienced & Stable Contractor",
    body: "You are entitled to employ a firm with sufficient experience and stability in the community to stand behind its work and warranty responsibilities. The repair contract and its performance are strictly between you and the contractor. Your insurance company does not warrant or guarantee the performance of any firm you hire.",
  },
  {
    number: "06",
    title: "Like Kind & Quality Materials",
    body: "You are entitled to materials and workmanship fully equivalent to your existing installation in like kind and quality. The insurance company has no obligation to improve your existing installation.",
  },
  {
    number: "07",
    title: "No Obligation to Accept Lowest Bid",
    body: "You are not required to accept the lowest bidder. Nowhere in your policy do the words \"cheapest,\" \"low\" or \"lowest price\" occur. However, repair rates should correspond to prevailing standards in your area for quality work.",
  },
  {
    number: "08",
    title: "Detailed Scope of Repairs",
    body: "You are entitled to receive a detailed listing of the scope of repairs and quantities of materials to be provided. Provision for hidden or latent problems relating to the damage should be spelled out in as much detail as possible.",
  },
  {
    number: "09",
    title: "Code-Compliant Contract",
    body: "You are entitled to, and should reject, any contract that does not incorporate all federal, state and local requirements for residential construction work. You must be familiar with these requirements in order to enjoy the protection the law provides. Ask an Industry Certified Restoration Contractor for this important information.",
  },
  {
    number: "10",
    title: "Skill & Experience in Insurance Repair",
    body: "You are entitled to select a firm who can demonstrate skill and experience in insurance damage repair as a full-time professional service. Ask for references, credentials, and association membership that indicate professional training and status in insurance repair, as contrasted with ordinary home improvement work.",
  },
  {
    number: "11",
    title: "Right to Demand Appraisal",
    body: "If a substantial disagreement arises between you and the insurance company over the amount of the loss, you are entitled to demand appraisal. This provision may be invoked at any time prior to settlement, whether or not you have received advanced payments. The insurance company is also entitled to this provision.",
  },
  {
    number: "12",
    title: "Timely Payment",
    body: "You are entitled to receive payment from the insurance company within the time specified by the policy and your state insurance regulations, which are designed to prevent insurance companies from using delay and personal hardship to compel a lower settlement. However, the policy also has time requirements for the policyholder, within which you must prepare and submit your claim.",
  },
];

export default function BillOfRights() {
  return (
    <Layout>
      <Helmet>
        <title>Homeowner Bill of Rights | Heritage Restoration</title>
        <meta
          name="description"
          content="Know your 12 legal rights as a homeowner after property damage. Heritage Restoration helps you understand and exercise every right your insurance policy provides."
        />
      </Helmet>

      <div className="min-h-screen bg-canvas-textured pt-[142px]">
        {/* ── Hero ── */}
        <section className="relative py-24 md:py-36 bg-[#3F4143] text-white overflow-hidden">
          <img
            src="/photo/bill-of-rights-hero.jpg"
            alt="Disaster recovery team supporting homeowner"
            className="absolute inset-0 h-full w-full object-cover object-[70%_45%] brightness-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e2020]/95 via-[#292b2d]/70 to-[#292b2d]/30" />

          {/* Decorative angled stripe (Aligned Left to clear the rescue scene on the right) */}
          <div className="absolute left-0 top-0 bottom-0 w-1/3 hidden md:block overflow-hidden pointer-events-none">
            <div className="absolute left-[-80px] top-[-80px] w-[160px] h-[600px] bg-[#3F4143] rotate-[-28deg] opacity-90 shadow-2xl" />
            <div className="absolute left-[90px] top-[-80px] w-[64px] h-[600px] bg-[#8DBD42] rotate-[-28deg] opacity-70" />
            <div className="absolute left-[175px] top-[-80px] w-[32px] h-[600px] bg-[#7BB843] rotate-[-28deg] opacity-50" />
          </div>

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <FadeUp className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#8DBD42]/15 border border-[#8DBD42]/40 text-[#8DBD42] text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 mb-6">
                <ShieldCheck size={13} />
                <span>Know Your Rights</span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Homeowner{" "}
                <span className="text-[#8DBD42]">Bill of Rights</span>
              </h1>

              <p className="text-lg text-white/85 leading-relaxed max-w-2xl">
                Fire and water damage disrupts the normal pattern of life and
                can involve a lot of emotional stress. People often feel
                confused and vulnerable after events of this type. However, it
                is important to make good decisions — you will be living with
                the results long after the stress and confusion have passed.
              </p>

              <p
                className="mt-4 text-white/65 text-sm leading-relaxed max-w-2xl"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                The standard homeowner's policy generally contains the same
                provisions throughout the United States and Canada. Below are
                your rights and obligations under its terms.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Before You Sign Banner ── */}
        <section className="relative overflow-hidden bg-[#3A3D3A] text-white">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-[url('/photo/hero-new.jpg')] bg-cover bg-center brightness-[0.08] opacity-40 pointer-events-none" />
          {/* Green left border accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8DBD42]" />

          <div className="max-w-[1280px] mx-auto px-8 md:px-16 py-14 md:py-16 relative z-10">
            <FadeUp>
              <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">

                {/* Left: Title + label */}
                <div className="md:w-2/5 flex-shrink-0">
                  <div
                    className="inline-block text-[#8DBD42] text-xs font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    Important Notice
                  </div>
                  <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white"
                    style={{ fontFamily: "'Libre Caslon Text', serif" }}
                  >
                    Before You Sign,{" "}
                    <span className="text-[#8DBD42]">Know Your Rights.</span>
                  </h2>
                </div>

                {/* Right: Body copy */}
                <div
                  className="md:w-3/5 space-y-4 text-white leading-relaxed"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  <p className="text-base md:text-lg text-white">
                    <span className="font-semibold">1-800-Board Up</span> is the only national disaster recovery company that works closely with first responders to assist with catastrophes.
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#8DBD42] flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-white">Talk to your Fire Chief about who is safe in securing your property.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#8DBD42] flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-white">Do not feel pressured to sign anything on site.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#8DBD42] flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-white">Know your rights — all 12 of which are outlined below.</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 12 Rights Grid ── */}
        <section className="py-20 md:py-28 bg-transparent">
          <div className="max-w-[1280px] mx-auto px-6">

            {/* Section label */}
            <FadeUp>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-[#3F4143]/12" />
                <span
                  className="text-xs font-bold uppercase tracking-[0.2em] text-[#3F4143]/40"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  12 Protected Rights
                </span>
                <div className="h-px flex-1 bg-[#3F4143]/12" />
              </div>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {rights.map((right, idx) => (
                <FadeUp
                  key={idx}
                  delay={Math.min(idx * 0.05, 0.3)}
                  className="group relative bg-white/50 backdrop-blur-[2px] border border-[#3F4143]/10 hover:border-[#8DBD42]/60 transition-all duration-500 p-7 flex gap-5 shadow-sm hover:shadow-md"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3F4143]/10 group-hover:bg-[#8DBD42] transition-colors duration-500" />

                  {/* Number */}
                  <div
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#3F4143] group-hover:bg-[#8DBD42] transition-colors duration-400 text-white font-black text-sm tracking-wide"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    {right.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base md:text-lg font-bold text-[#3F4143] mb-2 leading-snug"
                      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                    >
                      {right.title}
                    </h3>
                    <p
                      className="text-[#3F4143]/70 text-sm leading-relaxed"
                      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                    >
                      {right.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="relative bg-white pt-24 pb-36 overflow-hidden">
          {/* Background image */}
          <div className="absolute top-0 left-0 w-full h-[320px] md:h-[400px]">
            <img
              src="/photo/bill-of-rights-cta.jpg"
              alt="Heritage Restoration reconstruction team showing project progress to homeowners"
              className="w-full h-full object-cover object-[center_28%] brightness-70"
            />
            <div className="absolute inset-0 bg-black/38" />

            {/* Diagonal stripes (Aligned Left to clear the couple and house frame on the right) */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 hidden md:block overflow-hidden pointer-events-none">
              <div className="absolute left-[-100px] top-[-100px] w-[180px] h-[600px] bg-[#3F4143] rotate-[-35deg] opacity-90 shadow-2xl" />
              <div className="absolute left-[100px] top-[-100px] w-[80px] h-[600px] bg-[#8DBD42] rotate-[-35deg] opacity-75" />
              <div className="absolute left-[200px] top-[-100px] w-[40px] h-[600px] bg-[#7BB843] rotate-[-35deg] opacity-60" />
            </div>
          </div>

          {/* Overlapping card */}
          <div className="relative max-w-[960px] mx-auto px-6 pt-[180px] md:pt-[240px] z-10">
            <FadeUp>
              <div className="bg-white border border-[#3F4143]/10 p-8 md:p-12 shadow-[0_24px_50px_rgba(0,0,0,0.09)] text-center">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#3F4143] mb-5"
                  style={{ fontFamily: "'Libre Caslon Text', serif" }}
                >
                  Need an Advocate on Your Side?
                </h2>
                <p
                  className="text-sm md:text-base text-[#3F4143]/80 leading-relaxed max-w-2xl mx-auto mb-8"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  Don't let the insurance company dictate your recovery. Heritage
                  Restoration will fight for every right listed above — from the
                  first emergency call through your final settlement. Contact us
                  today for a free, no-pressure consultation.
                </p>

                <div
                  className="flex flex-wrap gap-4 justify-center"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  <a
                    href="tel:+13603451015"
                    id="bor-call-cta"
                    className="bg-[#8DBD42] hover:bg-[#7BB843] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors shadow-md flex items-center gap-2"
                  >
                    <Phone size={14} />
                    Call 360-345-1015
                  </a>
                  <a
                    href="mailto:office@firewaterstorm.com"
                    id="bor-email-cta"
                    className="bg-[#3F4143] hover:bg-[#292b2d] text-white font-bold px-8 py-4 uppercase tracking-[0.14em] text-xs transition-colors shadow-md"
                  >
                    Email Us Now
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </Layout>
  );
}
