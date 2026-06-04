import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Phone,
  MapPin,
  Droplets,
  Flame,
  CloudLightning,
  Star,
  ChevronsLeftRight,
  ShieldCheck,
  House,
  FlaskConical,
  Layers,
  Calculator,
  ClipboardCheck,
  HardHat,
  BadgeCheck,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { buildBreadcrumbSchema } from "@/seo";

const HERO_IMAGE = "/photo/hero-new.jpg";
const ABOUT_IMAGE = "/photo/who-we-are.jpg";
const SERVICE_FIRE = "/photo/hero-new.jpg";
const SERVICE_WATER = "/photo/20240403_095638.jpg";
const SERVICE_STORM = "/photo/hero-tarp.jpg";
const SERVICE_CONTENTS = "/photo/recent-project-4.jpg";
const PROJECT_ONE = "/photo/recent-project-1.jpg";
const PROJECT_TWO = "/photo/recent-project-2.jpg";
const DECK_KITCHEN = "/photo/Before-After-Kitchen.jpg";
const DECK_STAIRS = "/photo/Before-After-staircase.jpg";
const BEFORE_IMAGE = "/photo/Monnett Fire Before.jpg";
const AFTER_IMAGE = "/photo/Monnett Fire After.jpg";

function FadeUp({
  children,
  delay = 0,
  className = "",
  style,
  triggerImmediately = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  triggerImmediately?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const shouldAnimate = triggerImmediately || inView;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.21, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: [0.21, 1, 0.36, 1],
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [value, suffix, inView]);

  return <span ref={ref}>0{suffix}</span>;
}

function PhotoDeck() {
  const images = [
    "/photo/contents-gallery-5.jpg",
    "/photo/contents-gallery-4.jpg",
    "/photo/contents-gallery-9.jpg",
    "/photo/contents-gallery-2.jpg",
    "/photo/contents-gallery-10.jpg",
    "/photo/contents-gallery-3.jpg",
    "/photo/contents-gallery-8.jpg",
    "/photo/contents-gallery-6.jpg",
    "/photo/contents-gallery-11.jpg",
    "/photo/contents-gallery-7.jpg",
    "/photo/contents-gallery-12.jpg",
    "/photo/contents-gallery-13.jpg",
    "/photo/contents-gallery-14.jpg",
    "/photo/contents-gallery-15.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="relative w-full max-w-[710px] aspect-[1.5] cursor-pointer select-none group"
      onClick={handleNext}
    >
      {images.map((img, idx) => {
        const stackPos = (idx - currentIndex + images.length) % images.length;
        const isVisible = stackPos < 4;
        
        let rotate = 0;
        let zIndex = 10 - stackPos;
        let scale = 1 - stackPos * 0.03;
        let translateY = stackPos * 10;
        let translateX = stackPos * 6;

        if (stackPos === 0) {
          rotate = 5;
        } else if (stackPos === 1) {
          rotate = 1;
        } else {
          rotate = -3;
        }

        return (
          <motion.div
            key={img}
            style={{ 
              zIndex, 
              originX: 0.5, 
              originY: 0.5,
              display: isVisible ? "flex" : "none" 
            }}
            animate={{
              rotate: rotate,
              scale: scale,
              y: translateY,
              x: translateX,
              opacity: stackPos === 3 ? 0.8 : 1,
            }}
            whileHover={stackPos === 0 ? { scale: 1.02, rotate: rotate + 1 } : {}}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-white p-3 md:p-4 flex items-center justify-center"
          >
            <img
              src={img}
              alt={`Gallery image ${idx + 1}`}
              className="w-full h-full object-contain rounded-lg pointer-events-none"
            />
            {stackPos === 0 && (
              <div className="absolute inset-0 bg-black/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [sliderPercent, setSliderPercent] = useState(50);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const services = [
    {
      number: "01",
      title: "Fire Restoration",
      image: SERVICE_FIRE,
      description:
        "Comprehensive cleaning, structural repair, and odor removal to return your property to pre-loss condition.",
      href: "/services/fire-restoration",
      icon: <Flame size={20} />,
    },
    {
      number: "02",
      title: "Water Restoration",
      image: SERVICE_WATER,
      description:
        "Rapid extraction, structural drying, and mold prevention using IICRC-certified mitigation standards.",
      href: "/services/water-restoration",
      icon: <Droplets size={20} />,
    },
    {
      number: "03",
      title: "Storm Recovery",
      image: SERVICE_STORM,
      description:
        "Emergency tarping, debris removal, and structural rebuilds following severe PNW weather events.",
      href: "/services/storm-recovery",
      icon: <CloudLightning size={20} />,
    },
    {
      number: "04",
      title: "Contents Cleaning",
      image: SERVICE_CONTENTS,
      description:
        "Specialized cleaning and restoration of personal contents, textiles, and salvageable valuables.",
      href: "/services/contents-services",
      icon: <ShieldCheck size={20} />,
    },
  ];

  const process = [
    {
      number: "01",
      title: "Day of Loss",
      description:
        "Contact your insurance company and open a claim. We will board up and secure your property as needed.",
      position: "top",
      icon: <Flame size={24} />,
    },
    {
      number: "02",
      title: "Testing",
      description:
        "We can provide testing for asbestos, lead and other hazardous materials if warranted.",
      position: "bottom",
      icon: <FlaskConical size={24} />,
    },
    {
      number: "03",
      title: "3D Modeling",
      description:
        "Our all-in-one platform transforms real-life spaces into immersive digital twin models.",
      position: "top",
      icon: <Layers size={24} />,
    },
    {
      number: "04",
      title: "Estimate",
      description:
        "We will write a scope of repairs and submit an estimate to your insurance provider.",
      position: "bottom",
      icon: <Calculator size={24} />,
    },
    {
      number: "05",
      title: "Contract",
      description:
        "Once an undisputed estimate is approved by your insurance provider a contract is signed and restoration begins. Start dates may vary.",
      position: "top",
      icon: <ClipboardCheck size={24} />,
    },
    {
      number: "06",
      title: "Project Manager",
      description:
        "Once the contract is signed a project manager is assigned and will meet with you to discuss scheduling, repairs and materials to be used.",
      position: "bottom",
      icon: <HardHat size={24} />,
    },
    {
      number: "07",
      title: "QA",
      description:
        "Our quality assurance team will inspect the quality of work at key times throughout construction.",
      position: "top",
      icon: <BadgeCheck size={24} />,
    },
    {
      number: "08",
      title: "Completion of Project",
      description:
        "Once the restoration of your home is completed and you are happy and satisfied with our work, a signed certificate of completion will be provided and your stored contents will be returned.",
      position: "bottom",
      icon: <House size={24} />,
    },
  ];

  const updateSlider = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    const boundedPercent = Math.max(0, Math.min(100, rawPercent));
    setSliderPercent(boundedPercent);
  };

  const headlineStyle = { fontFamily: "'Libre Caslon Text', serif" };
  const bodyStyle = { fontFamily: "'Hanken Grotesk', sans-serif" };

  return (
    <Layout>
      <Helmet>
        <title>Heritage Restoration | Fire, Water &amp; Storm Damage Experts – Washington State</title>
        <meta name="description" content="Heritage Restoration provides 24/7 emergency fire, water, and storm damage restoration across Western Washington. IICRC certified, 60-minute response, direct insurance billing since 2004. Serving Lacey, Tacoma, Chehalis, Federal Way &amp; more." />
        <meta name="keywords" content="fire damage restoration Washington, water damage restoration Tacoma, storm damage repair Olympia, emergency restoration 24/7, mold remediation Thurston County, IICRC certified restoration contractor" />
        <link rel="canonical" href="https://www.firewaterstorm.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.firewaterstorm.com/" />
        <meta property="og:title" content="Heritage Restoration | 24/7 Fire, Water &amp; Storm Damage Experts" />
        <meta property="og:description" content="Professional fire, water, and storm damage restoration across Western Washington. IICRC certified, 60-minute emergency response, direct insurance billing since 2004." />
        <meta property="og:image" content="https://www.firewaterstorm.com/photo/hero-new.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Heritage Restoration | 24/7 Fire, Water &amp; Storm Damage Experts" />
        <meta name="twitter:description" content="Professional fire, water, and storm damage restoration across Western Washington. IICRC certified, 60-minute emergency response." />
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema([{ name: "Home", url: "/" }]))}
        </script>
      </Helmet>

      <div className="bg-white">
        {/* Homepage Hero */}
        <section className="relative min-h-screen overflow-hidden bg-[#F4F6F2] pt-32">
          <img
            src={HERO_IMAGE}
            alt="Professional restoration specialist"
            className="absolute inset-0 h-full w-full object-cover object-left"
          />
          {/* Delicate, high-end warm off-white light overlay gradient (reduced by 30% for more background image visibility) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f6f2]/82 via-[#f4f6f2]/65 to-[#f4f6f2]/18" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f4f6f2]/12 to-[#eef2ea] pointer-events-none" />
          <div className="absolute -left-20 top-24 w-72 h-72 rounded-full bg-[#8DBD42]/20 blur-[110px] pointer-events-none" />
          <div className="absolute right-[-70px] bottom-10 w-72 h-72 rounded-full bg-[#3F4143]/14 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 lg:py-32 min-h-[calc(100vh-8rem)]">
            <div className="max-w-[760px] text-[#3F4143]">
              <FadeUp triggerImmediately={true} delay={0.1}>
                <p
                  className="inline-flex items-center gap-3 border border-[#8DBD42]/35 bg-white/55 backdrop-blur-sm px-4 py-2 uppercase tracking-[0.14em] text-[11px] font-extrabold mb-6 text-[#7BB843]"
                  style={bodyStyle}
                >
                  <span className="w-5 h-[2px] bg-[#8DBD42]" />
                  Professional Property Restoration
                </p>
              </FadeUp>
              <FadeUp triggerImmediately={true} delay={0.25}>
                <h1
                  className="text-4xl md:text-6xl leading-[1.02] text-[#2f3133]"
                  style={headlineStyle}
                >
                  Restoring Your Home.
                  <br />
                  Restoring Your Peace of Mind.
                </h1>
              </FadeUp>
              <FadeUp triggerImmediately={true} delay={0.4}>
                <p
                  className="mt-6 text-lg text-[#2f3133]/82 max-w-xl leading-relaxed font-medium"
                  style={bodyStyle}
                >
                  As dedicated homeowner advocates, we handle the complexity of
                  disaster recovery so you do not have to. Locally owned and
                  operated since 2004.
                </p>
              </FadeUp>

              <FadeUp
                triggerImmediately={true}
                delay={0.55}
                className="mt-8 flex flex-wrap gap-4 shrink-0"
              >
                <a
                  href="tel:+13603451015"
                  className="bg-[#8DBD42] hover:bg-[#2f3133] text-white px-8 py-4 uppercase tracking-[0.16em] text-xs font-bold transition-colors shadow-[0_12px_30px_rgba(141,189,66,0.35)]"
                  style={bodyStyle}
                >
                  Start Your Recovery
                </a>
                <Link
                  href="/projects"
                  className="border-2 border-[#2f3133] bg-white/70 hover:bg-[#2f3133] px-8 py-4 uppercase tracking-[0.16em] text-xs font-bold transition-colors text-[#2f3133] hover:text-white"
                  style={bodyStyle}
                >
                  View Our Work
                </Link>
              </FadeUp>
            </div>

            {/* Premium Floating Office Locations Card (Unified Glassmorphism Panel with Animation & Green Highlight Accent) */}
            <div className="mt-12 xl:mt-0 xl:absolute xl:-right-14 2xl:-right-20 xl:bottom-44 2xl:bottom-48 w-full xl:w-[500px] relative z-20">
              <FadeUp triggerImmediately={true} delay={0.7}>
                <motion.div 
                  className="bg-[#2b2d2f]/84 backdrop-blur-lg border border-white/15 border-t-4 border-t-[#8DBD42] rounded-2xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.32)] text-white"
                  whileHover={{
                    scale: 1.015,
                    y: -10,
                    boxShadow: "0 30px 70px rgba(141, 189, 66, 0.12)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    boxShadow: {
                      duration: 0.3
                    }
                  }}
                >
                  <span className="text-[#8DBD42] uppercase tracking-[0.2em] text-[10px] font-black block mb-4 flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-[#8DBD42]" /> Local Office Locations
                  </span>
                  
                  <div className="grid md:grid-cols-2 gap-8 relative">
                    {/* Vertical Divider for desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-neutral-200" />
                    
                    {/* North Office */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2" style={headlineStyle}>
                        North Office
                      </h3>
                      <p className="text-white/85 text-xs leading-relaxed" style={bodyStyle}>
                        <MapPin size={12} className="inline mr-1 text-[#8DBD42]" />
                        <a
                          href="https://maps.google.com/?q=7895%20Martin%20Way%20E%2C%20Unit%20103%2C%20Lacey%20WA%2098516"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-white font-semibold"
                        >
                          7895 Martin Way E, Unit 103<br />Lacey WA 98516
                        </a>
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <a
                          href="tel:+13603451015"
                          className="bg-[#8DBD42] hover:bg-[#3F4143] text-white px-3 py-2 uppercase tracking-wider text-[9px] font-bold transition-colors shadow-sm"
                          style={bodyStyle}
                        >
                          Call North
                        </a>
                        <span className="text-[#8DBD42] text-[11px] font-bold">24/7</span>
                      </div>
                    </div>

                    {/* South Office */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2" style={headlineStyle}>
                        South Office
                      </h3>
                      <p className="text-white/85 text-xs leading-relaxed" style={bodyStyle}>
                        <MapPin size={12} className="inline mr-1 text-[#8DBD42]" />
                        <a
                          href="https://maps.google.com/?q=1581%20N.%20National%20Ave%2C%20Chehalis%20WA%2098532"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-white font-semibold"
                        >
                          1581 N. National Ave<br />Chehalis WA 98532
                        </a>
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <a
                          href="tel:+13603451015"
                          className="bg-[#8DBD42] hover:bg-[#3F4143] text-white px-3 py-2 uppercase tracking-wider text-[9px] font-bold transition-colors shadow-sm"
                          style={bodyStyle}
                        >
                          Call South
                        </a>
                        <span className="text-[#8DBD42] text-[11px] font-bold">24/7</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            </div>
          </div>
        </section>

        <div className="relative z-30 -mt-56 max-w-[1200px] mx-auto px-2 md:px-6">
          <div className="mt-1 flex flex-wrap items-start justify-start gap-1.5 md:gap-2.5 px-0.5">
            <FadeUp triggerImmediately={true} delay={1.05} className="w-[156px] md:w-[178px] px-0.5 py-1 flex flex-col items-center justify-center text-center">
              <img
                src="/photo/emergency-badge-new-2.png"
                alt="Emergency response badge"
                className="h-[4.96rem] md:h-[5.8rem] w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
              />
              <p
                className="mt-1.5 font-bold uppercase tracking-[0.1em] text-[10px] md:text-[11px] text-[#3F4143]"
                style={bodyStyle}
              >
                Emergency Response
              </p>
            </FadeUp>
            <FadeUp
              triggerImmediately={true}
              delay={1.15}
              className="w-[156px] md:w-[178px] px-0.5 py-1 flex flex-col items-center justify-center text-center"
            >
              <img
                src="/photo/iicrc-badge-new-3.png"
                alt="IICRC certified badge"
                className="h-[4.96rem] md:h-[5.8rem] w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
              />
              <p
                className="mt-1.5 font-bold uppercase tracking-[0.1em] text-[10px] md:text-[11px] text-[#3F4143]"
                style={bodyStyle}
              >
                IICRC Certified
              </p>
            </FadeUp>
            <FadeUp
              triggerImmediately={true}
              delay={1.25}
              className="w-[156px] md:w-[178px] px-0.5 py-1 flex flex-col items-center justify-center text-center"
            >
              <img
                src="/photo/warranty-badge-new-3.png"
                alt="5 year warranty badge"
                className="h-[4.96rem] md:h-[5.8rem] w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
              />
              <p
                className="mt-1.5 font-bold uppercase tracking-[0.1em] text-[10px] md:text-[11px] text-[#3F4143]"
                style={bodyStyle}
              >
                5 Year Warranty
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Specialized Restoration Cards Section */}
        <section className="pt-24 pb-24 md:pt-32 md:pb-32 bg-transparent" id="services">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-16">
              <FadeUp>
                <p
                  className="text-[#8DBD42] uppercase tracking-[0.15em] text-xs font-extrabold"
                  style={bodyStyle}
                >
                  Our Expertise
                </p>
                <h2 className="text-[27px] md:text-[45px] mt-2" style={headlineStyle}>
                  Specialized Restoration
                </h2>
                <p
                  className="mt-4 text-[#3F4143]/70 text-sm md:text-base max-w-2xl leading-relaxed"
                  style={bodyStyle}
                >
                  Select a service line to explore your options. Crafted for
                  clarity, speed, and premium guidance when every decision
                  matters.
                </p>
              </FadeUp>
              <Link
                href="/services/fire-restoration"
                className="border-b-2 border-[#3F4143] pb-1 uppercase tracking-[0.14em] text-xs font-bold hover:text-[#8DBD42] hover:border-[#8DBD42] transition-colors"
                style={bodyStyle}
              >
                All Services
              </Link>
            </div>

            {/* Custom line separator with highlight accent */}
            <div className="relative w-full h-[2px] bg-[#3F4143]/10 mb-12">
              <div className="absolute top-0 left-0 h-full bg-[#8DBD42] w-1/4 rounded-full" />
            </div>

            {/* Service grid grids without photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
              {services.map((service, idx) => (
                <FadeUp
                  key={service.title}
                  delay={idx * 0.07}
                  className="group"
                >
                  <Link href={service.href}>
                    <div className="cursor-pointer">
                      <div className="mb-6 inline-flex w-12 h-12 items-center justify-center rounded-full bg-[#8DBD42]/10 text-[#8DBD42] group-hover:bg-[#8DBD42] group-hover:text-white transition-all duration-300">
                        {service.icon}
                      </div>
                      <p
                        className="text-[#8DBD42] uppercase tracking-[0.2em] text-[10px] font-bold mb-2"
                        style={bodyStyle}
                      >
                        {service.number}
                      </p>
                      <h3
                        className="text-2xl leading-snug text-[#3F4143] group-hover:text-[#8DBD42] transition-colors"
                        style={headlineStyle}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="text-[#3F4143]/70 text-sm mt-3 leading-relaxed max-w-[24ch]"
                        style={bodyStyle}
                      >
                        {service.description}
                      </p>
                      <p
                        className="mt-6 uppercase tracking-[0.14em] text-xs font-bold inline-flex items-center gap-1.5 text-[#3F4143]/80 group-hover:text-[#8DBD42] group-hover:translate-x-1.5 transition-all duration-300"
                        style={bodyStyle}
                      >
                        Explore <ArrowRight size={13} />
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Our Promise Section */}
        <section className="py-24 md:py-32 text-[#3F4143] relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #F4F6F2 0%, #FBFBF9 100%)" }}>

          {/* Soft Seattle Green Glow */}
          <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[#8DBD42]/4.5 blur-[130px] pointer-events-none select-none z-0" />
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
            <FadeUp className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-start">
              <PhotoDeck />
            </FadeUp>
            
            <FadeUp delay={0.08} className="lg:col-span-6 order-1 lg:order-2">
              <p
                className="text-[#8DBD42] uppercase tracking-[0.15em] text-xs font-extrabold"
                style={bodyStyle}
              >
                Our Promise
              </p>
              <h2
                className="text-[27px] md:text-[45px] mt-3 leading-[1.08] text-[#3F4143]"
                style={headlineStyle}
              >
                We Are Not Just Technicians.
                <br />
                We Are Your Neighbors.
              </h2>
              <p
                className="mt-6 text-[#3F4143]/80 text-lg leading-relaxed"
                style={bodyStyle}
              >
                We are proudly local and homeowner focused. When you call
                Heritage, you are not getting an out-of-town franchise. You are
                getting a team that lives in this community and stands behind
                every repair decision.
              </p>

              <div
                className="mt-8 border-l-4 border-[#8DBD42] pl-6 py-1 my-8 italic text-xl text-[#3F4143]/90 font-medium leading-relaxed"
                style={bodyStyle}
              >
                Most importantly, we are advocates for you. Our priority is
                protecting your home and your best interests, not the insurance
                company.
              </div>

              {/* Action Buttons styled like Golden Coast CTA */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:+13603451015"
                  className="bg-[#8DBD42] hover:bg-[#3F4143] text-white px-8 py-4 uppercase tracking-[0.16em] text-xs font-bold transition-colors inline-flex items-center gap-2"
                  style={bodyStyle}
                >
                  <Phone size={12} /> Start Your Recovery
                </a>
                <a
                  href="mailto:office@firewaterstorm.com"
                  className="border-2 border-[#3F4143] hover:bg-[#3F4143]/5 px-8 py-4 uppercase tracking-[0.16em] text-xs font-bold transition-colors text-[#3F4143]"
                  style={bodyStyle}
                >
                  Email Us
                </a>
              </div>

              <div className="mt-12 grid sm:grid-cols-2 gap-8 border-t border-gray-900/10 pt-8">
                <div>
                  <p
                    className="uppercase tracking-[0.14em] text-xs font-bold text-[#3F4143]"
                    style={bodyStyle}
                  >
                    Local Accountability
                  </p>
                  <p
                    className="mt-2 text-[#3F4143]/70 text-sm leading-relaxed"
                    style={bodyStyle}
                  >
                    Direct access to our local leadership and project management
                    teams.
                  </p>
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-gray-900/10 pt-6 sm:pt-0 sm:pl-8">
                  <p
                    className="uppercase tracking-[0.14em] text-xs font-bold text-[#3F4143]"
                    style={bodyStyle}
                  >
                    Homeowner Advocacy
                  </p>
                  <p
                    className="mt-2 text-[#3F4143]/70 text-sm leading-relaxed"
                    style={bodyStyle}
                  >
                    Insurance guidance to keep your claim and rebuild fair and
                    transparent.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Process Timeline Section (Bespoke Borderless Steps) */}
        <section
          className="py-24 md:py-32 overflow-hidden relative"
          id="process"
          style={{ background: "linear-gradient(180deg, #eef2ea 0%, #ffffff 30%, #ffffff 100%)" }}
        >
          <div className="absolute left-[-120px] top-[12%] w-[380px] h-[380px] rounded-full bg-[#8DBD42]/8 blur-[140px] pointer-events-none" />
          <div className="absolute right-[-120px] bottom-[10%] w-[420px] h-[420px] rounded-full bg-[#3F4143]/6 blur-[150px] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
              <p
                className="text-[#7BB843] uppercase tracking-[0.15em] text-xs font-extrabold"
                style={bodyStyle}
              >
                What To Expect
              </p>
              <h2
                className="text-[27px] md:text-[36px] mt-3 text-[#3F4143] font-bold"
                style={headlineStyle}
              >
                Restoration Process
              </h2>
              <p
                className="text-[#3F4143]/72 mt-4 leading-relaxed text-sm md:text-base max-w-xl mx-auto"
                style={bodyStyle}
              >
                While each project is unique, this process keeps your
                restoration efficient and transparent from first call to final
                walkthrough.
              </p>
            </div>

            {/* Elegant Vertical Timeline */}
            <div className="relative hidden lg:block my-10">
              {/* Central vertical line */}
              <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#7BB843]/5 via-[#7BB843]/20 to-[#7BB843]/5 -translate-x-1/2" />

              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, pairIdx) => {
                  const step1 = process[pairIdx * 2];
                  const step2 = process[pairIdx * 2 + 1];
                  return (
                    <div
                      key={step1.title}
                      className="relative grid grid-cols-9 gap-8 items-start group"
                    >
                      {/* Left Side Content */}
                      <div className="col-span-4 flex flex-col items-end">
                        <FadeUp
                          delay={0.05}
                          className="group/card flex flex-col items-end w-full"
                        >
                          <div className="bg-white/92 backdrop-blur-md rounded-2xl p-6 shadow-[0_16px_35px_rgba(0,0,0,0.07)] hover:shadow-[0_22px_45px_rgba(123,184,67,0.16)] hover:-translate-y-1 transition-all duration-300 max-w-[460px] text-left relative overflow-hidden border border-[#3F4143]/8">
                            {/* Watermark Number */}
                            <div className="absolute top-4 right-4 text-3xl font-extrabold text-[#7BB843]/15 select-none font-serif">
                              {step1.number}
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[#7BB843]/10 text-[#7BB843] flex items-center justify-center mb-4 transition-transform duration-300 group-hover/card:scale-110">
                              {step1.icon}
                            </div>
                            <h3
                              className="text-xl text-[#3F4143] font-bold group-hover/card:text-[#7BB843] transition-colors duration-300"
                              style={bodyStyle}
                            >
                              {step1.title}
                            </h3>
                            <p
                              className="text-sm text-[#3F4143]/70 leading-relaxed mt-2"
                              style={bodyStyle}
                            >
                              {step1.description}
                            </p>
                          </div>
                        </FadeUp>
                      </div>

                      {/* Center Node */}
                      <div className="col-span-1 flex flex-col items-center justify-start h-full relative">
                        {/* Left Card Horizontal Line Connector */}
                        <div className="absolute right-1/2 top-[42px] w-[calc(50%+32px)] h-[2px] bg-[#7BB843]/15 group-hover:bg-[#7BB843]/40 transition-colors duration-300 pointer-events-none" />

                        {/* Dot 1 */}
                        <div className="w-3.5 h-3.5 rounded-full bg-[#7BB843]/40 group-hover:bg-[#7BB843] group-hover:scale-125 transition-all duration-300 z-10 mt-[35px]" />

                        {/* Right Card Horizontal Line Connector */}
                        <div className="absolute left-1/2 top-[102px] w-[calc(50%+32px)] h-[2px] bg-[#7BB843]/15 group-hover:bg-[#7BB843]/40 transition-colors duration-300 pointer-events-none" />

                        {/* Dot 2 */}
                        <div className="w-3.5 h-3.5 rounded-full bg-[#7BB843]/40 group-hover:bg-[#7BB843] group-hover:scale-125 transition-all duration-300 z-10 mt-[46px]" />
                      </div>

                      {/* Right Side Content */}
                      <div className="col-span-4 flex flex-col items-start pt-16">
                        <FadeUp
                          delay={0.08}
                          className="group/card flex flex-col items-start w-full"
                        >
                          <div className="bg-white/92 backdrop-blur-md rounded-2xl p-6 shadow-[0_16px_35px_rgba(0,0,0,0.07)] hover:shadow-[0_22px_45px_rgba(123,184,67,0.16)] hover:-translate-y-1 transition-all duration-300 max-w-[460px] relative overflow-hidden border border-[#3F4143]/8">
                            {/* Watermark Number */}
                            <div className="absolute top-4 right-4 text-3xl font-extrabold text-[#7BB843]/15 select-none font-serif">
                              {step2.number}
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[#7BB843]/10 text-[#7BB843] flex items-center justify-center mb-4 transition-transform duration-300 group-hover/card:scale-110">
                              {step2.icon}
                            </div>
                            <h3
                              className="text-xl text-[#3F4143] font-bold group-hover/card:text-[#7BB843] transition-colors duration-300"
                              style={bodyStyle}
                            >
                              {step2.title}
                            </h3>
                            <p
                              className="text-sm text-[#3F4143]/70 leading-relaxed mt-2"
                              style={bodyStyle}
                            >
                              {step2.description}
                            </p>
                          </div>
                        </FadeUp>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile/Tablet Vertical Timeline */}
            <div className="lg:hidden relative pl-8 sm:pl-12 space-y-5 my-8">
              {/* Vertical timeline line */}
              <div className="absolute left-[16px] sm:left-[20px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#7BB843]/10 via-[#7BB843]/20 to-[#7BB843]/10" />

              {process.map((step, idx) => (
                <FadeUp
                  key={step.title}
                  delay={idx * 0.05}
                  className="relative group"
                >
                  {/* Circle dot on the timeline track */}
                  <div className="absolute -left-8 sm:-left-12 top-[18px] w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#7BB843]/30 bg-white flex items-center justify-center z-10 shadow-sm transition-all duration-300 group-hover:border-[#7BB843] group-hover:scale-105">
                    <span className="text-[11px] font-bold text-[#7BB843]">
                      {step.number}
                    </span>
                  </div>

                  {/* Card Container */}
                  <div className="bg-white rounded-2xl p-6 shadow-[0_8px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_30px_rgba(123,184,67,0.06)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden border border-[#3F4143]/5">
                    {/* Watermark Number on mobile */}
                    <div className="absolute top-4 right-4 text-2xl font-extrabold text-[#7BB843]/15 select-none font-serif">
                      {step.number}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#7BB843]/10 text-[#7BB843] flex items-center justify-center shrink-0">
                        {step.icon}
                      </div>
                      <h3
                        className="text-base text-[#3F4143] font-bold"
                        style={bodyStyle}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p
                      className="text-sm text-[#3F4143]/70 leading-relaxed"
                      style={bodyStyle}
                    >
                      {step.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Header (Light Section) */}
        <section className="pt-24 md:pt-32 pb-0 text-[#3F4143] relative overflow-hidden" id="case-study" style={{ background: "#FFFFFF" }}>

          {/* Soft Seattle Green Glow */}
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#8DBD42]/4 blur-[140px] pointer-events-none select-none z-0" />
          
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <div className="lg:col-span-7">
                <FadeUp>
                  <p
                    className="text-[#8DBD42] uppercase tracking-[0.15em] text-xs font-extrabold flex items-center gap-2"
                    style={bodyStyle}
                  >
                    <span className="w-6 h-[2px] bg-[#8DBD42] inline-block" /> Case Study
                  </p>
                  <h2
                    className="text-[27px] md:text-[45px] mt-3 leading-tight text-[#3F4143] font-bold"
                    style={headlineStyle}
                  >
                    Proven Transformation
                  </h2>
                </FadeUp>
              </div>
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
                <FadeUp delay={0.08} className="w-full flex flex-col items-start lg:items-end">
                  <p
                    className="text-[#3F4143]/80 text-sm md:text-base leading-relaxed lg:text-right max-w-xl"
                    style={bodyStyle}
                  >
                    See the difference of meticulous craftsmanship and dedicated homeowner advocacy on a real fire damage rebuild project.
                  </p>
                  <Link
                    href="/projects"
                    className="mt-6 inline-flex items-center gap-2 bg-[#8DBD42] hover:bg-[#3F4143] text-white px-8 py-4 uppercase tracking-[0.16em] text-xs font-bold transition-all duration-300"
                    style={bodyStyle}
                  >
                    Our Portfolio <ArrowRight size={13} />
                  </Link>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Content (Centered on Canvas Base) */}
        <section className="pt-0 pb-32 relative z-20" style={{ background: "#FFFFFF" }}>

          {/* Ambient Background Glow behind slider */}
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8DBD42]/2.5 blur-[140px] pointer-events-none select-none z-0" />
          
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Before/After Slider container */}
            <div className="relative">
              <FadeUp>
                <div
                  ref={sliderRef}
                  className="relative rounded-2xl overflow-hidden select-none cursor-col-resize shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] border-4 border-white"
                  onMouseMove={event => updateSlider(event.clientX)}
                  onTouchMove={event => updateSlider(event.touches[0].clientX)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={AFTER_IMAGE}
                      alt="After restoration"
                      className="w-full h-[360px] md:h-[560px] object-cover"
                    />
                    <div
                      className="absolute top-0 left-0 h-full overflow-hidden"
                      style={{ width: `${sliderPercent}%` }}
                    >
                      <img
                        src={BEFORE_IMAGE}
                        alt="Before restoration"
                        className="w-full h-[360px] md:h-[560px] object-cover max-w-none"
                        style={{
                          width: sliderRef.current
                            ? `${sliderRef.current.clientWidth}px`
                            : "100%",
                        }}
                      />
                    </div>

                    <div
                      className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#8DBD42]/40 via-[#8DBD42] to-[#8DBD42]/40 shadow-[0_0_8px_rgba(141,189,66,0.6)]"
                      style={{
                        left: `${sliderPercent}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#8DBD42] text-[#8DBD42] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.15),0_0_15px_rgba(141,189,66,0.35)] transition-all duration-300 hover:scale-110">
                        <ChevronsLeftRight size={20} className="animate-pulse" />
                      </div>
                    </div>

                    <span
                      className="absolute top-5 left-5 rounded-full bg-[#292b2d]/85 backdrop-blur-md text-white border border-white/20 px-5 py-2 uppercase tracking-[0.2em] text-[10px] font-black shadow-md select-none"
                      style={bodyStyle}
                    >
                      Before
                    </span>
                    <span
                      className="absolute top-5 right-5 rounded-full bg-[#8DBD42]/95 text-white border border-[#9fd546]/30 px-5 py-2 uppercase tracking-[0.2em] text-[10px] font-black shadow-md shadow-[#8DBD42]/15 select-none"
                      style={bodyStyle}
                    >
                      After
                    </span>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Testimonial Quote */}
            <FadeUp delay={0.08}>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-4 md:px-6 relative z-10">
                <div className="md:col-span-8 border-l-4 border-[#8DBD42] pl-6 py-2">
                  <p
                    className="italic text-[#3F4143]/95 text-lg md:text-2xl leading-relaxed font-serif"
                    style={bodyStyle}
                  >
                    "Heritage worked to make the process as easy and painless as
                    possible. The restoration turned out much nicer than we
                    expected."
                  </p>
                </div>
                <div className="md:col-span-4 md:justify-self-end flex items-center gap-4">
                  <div className="text-right">
                    <p
                      className="uppercase font-extrabold tracking-[0.12em] text-xs text-[#3F4143]"
                      style={bodyStyle}
                    >
                      Private Residence
                    </p>
                    <p className="text-xs text-[#3F4143]/60 font-semibold mt-1" style={bodyStyle}>
                      Full Structural Fire Rebuild
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#8DBD42]/20 text-[#8DBD42] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(141,189,66,0.15)]">
                    <House size={20} />
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Testimonials (Editorial Layout) */}
        <section className="py-24 md:py-32 bg-transparent border-y border-gray-200/40 relative overflow-hidden">
          {/* Ambient Background Glow behind Testimonials frame */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#8DBD42]/3.5 blur-[140px] pointer-events-none select-none z-0" />
          <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
            <FadeUp>
              <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <p
                  className="text-[#8DBD42] uppercase tracking-[0.16em] text-xs font-extrabold"
                  style={bodyStyle}
                >
                  Testimonials
                </p>
              </div>
              <h2
                className="text-[27px] md:text-[36px] mt-3 text-[#3F4143] font-bold"
                style={headlineStyle}
              >
                Rebuilding Dreams, One Story At A Time
              </h2>
            </FadeUp>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
              {[
                {
                  name: "D. Butler",
                  role: "Homeowner Restoration",
                  quote:
                    "From the start, you worked to make the process as easy and painless as possible. The restoration turned out much nicer than expected.",
                },
                {
                  name: "Linda H.",
                  role: "Master Bath Fire Recovery",
                  quote:
                    "Thank you again for everything during a very stressful time. Their work was first rate and I would enthusiastically recommend Heritage.",
                },
                {
                  name: "Skip & Alpha Beard",
                  role: "Dupont, WA",
                  quote:
                    "Heritage was on scene within 45 minutes. The end result was beautiful and better than before the fire. Professional and honest team.",
                },
              ].map((testimonial, idx) => (
                <FadeUp key={testimonial.name} delay={idx * 0.06}>
                  <article className="relative h-full rounded-2xl border-l-4 border-l-[#8DBD42] bg-white p-8 shadow-[0_12px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.045)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group border border-[#3F4143]/5 border-l-0">
                    {/* Big Decorative Quote Mark */}
                    <span className="absolute right-6 top-1 text-8xl font-serif text-[#8DBD42]/10 select-none pointer-events-none transition-transform duration-300 group-hover:scale-110">
                      “
                    </span>

                    <div>
                      {/* Rating Stars */}
                      <div className="flex text-[#8DBD42] gap-1">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={starIndex} size={16} fill="currentColor" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p
                        className="mt-6 text-[#3F4143]/85 text-sm md:text-base leading-relaxed italic"
                        style={bodyStyle}
                      >
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Reviewer Details */}
                    <div className="mt-8 pt-5 border-t border-gray-200/40 flex items-center justify-between">
                      <div>
                        <p
                          className="uppercase tracking-[0.15em] text-xs font-bold text-[#3F4143]"
                          style={bodyStyle}
                        >
                          {testimonial.name}
                        </p>
                        <p
                          className="text-xs text-[#3F4143]/65 mt-0.5"
                          style={bodyStyle}
                        >
                          {testimonial.role}
                        </p>
                      </div>
                      <div
                        className="flex items-center gap-1.5 text-[10px] font-bold text-[#8DBD42] bg-[#8DBD42]/10 px-2 py-0.5 rounded-full select-none"
                        style={bodyStyle}
                      >
                        <ShieldCheck size={11} /> Verified
                      </div>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Statistics Banner (Single Row Column Layout) */}
        <section className="py-20 md:py-28 border-t border-[#8DBD42] relative overflow-hidden text-white" style={{ background: "linear-gradient(to bottom, #FAF9F6 0%, #3F4143 25%, #252628 100%)" }}>

          <div className="max-w-[1100px] mx-auto px-6 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center text-white relative">
              {[
                {
                  val: 20,
                  suffix: "+",
                  label: "Years Service",
                },
                {
                  val: 2100,
                  suffix: "+",
                  label: "Projects Completed",
                },
                {
                  val: 60,
                  suffix: " mins",
                  label: "Response Time",
                },
                {
                  val: 100,
                  suffix: "%",
                  label: "Local Team",
                },
              ].map((stat, idx) => (
                <FadeUp key={stat.label} delay={idx * 0.05} className="relative flex flex-col justify-center py-4">
                  {/* Divider line for desktop */}
                  {idx > 0 && <div className="hidden md:block absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-white/15" />}
                  
                  <p className="text-4xl lg:text-5xl font-bold text-[#8DBD42]" style={headlineStyle}>
                    <Counter value={stat.val} suffix={stat.suffix} />
                  </p>
                  <p
                    className="uppercase tracking-[0.15em] text-[10px] lg:text-[11px] text-white/60 mt-2 font-bold"
                    style={bodyStyle}
                  >
                    {stat.label}
                  </p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <a
          href="tel:+13603451015"
          className="fixed bottom-7 right-7 z-50 bg-[#E32B2B] text-white inline-flex items-center gap-2 px-5 py-4 uppercase tracking-[0.12em] text-xs font-bold shadow-2xl hover:scale-105 transition-transform"
          style={bodyStyle}
        >
          <Phone size={16} />
          24/7 Dispatch
        </a>

        <section className="sr-only" id="resources">
          <div>
            <h2>Resources</h2>
            <p>
              Visit FAQ, blogs, and homeowner rights from the navigation menu.
            </p>
          </div>
        </section>

        <section className="sr-only" id="contact">
          <div>
            <h2>Contact</h2>
            <p>
              Call 360-345-1015 or use the contact page for service requests.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
