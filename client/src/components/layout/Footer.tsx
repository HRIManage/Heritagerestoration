import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

const LOGO = "/photo/heritage-logo.png";

interface FooterProps {
  onFaqClick?: () => void;
  onBlogsClick?: () => void;
  onBillOfRightsClick?: () => void;
}

export default function Footer({
  onFaqClick = () => {},
  onBlogsClick = () => {},
  onBillOfRightsClick = () => {},
}: FooterProps) {
  const serviceItems = [
    { label: "Fire Restoration", href: "/services/fire-restoration" },
    { label: "Water Restoration", href: "/services/water-restoration" },
    { label: "Storm Restoration", href: "/services/storm-recovery" },
    { label: "Contents Services", href: "/services/contents-services" },
  ];

  const resourceItems = [
    { label: "FAQ", href: "/resources/faq", action: onFaqClick },
    { label: "Blogs", href: "/resources/blog", action: onBlogsClick },
    {
      label: "Homeowner Bill of Rights",
      href: "/resources/bill-of-rights",
      action: onBillOfRightsClick,
    },
  ];

  return (
    <footer className="bg-[#FAF9F6] text-[#3F4143] pt-20 pb-10 border-t-2 border-[#8DBD42]/40">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/">
              <img
                src={LOGO}
                alt="Heritage Restoration"
                className="h-[84px] w-auto mb-6 cursor-pointer"
              />
            </Link>
            <p className="text-[#3F4143]/65 text-sm leading-relaxed mb-6">
              Professional fire, water, and storm restoration services serving
              Washington State since 2004. Locally owned and operated,
              representing your interests, not the insurance company's.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/heritagerestorationinc/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3F4143]/8 flex items-center justify-center hover:bg-[#8DBD42] hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/heritagerestorationwa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3F4143]/8 flex items-center justify-center hover:bg-[#8DBD42] hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[#2f3133] font-black uppercase text-xs tracking-widest mb-6">
              Services
            </h4>
            <ul className="space-y-4">
              {serviceItems.map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#3F4143]/65 hover:text-[#8DBD42] text-sm font-bold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#2f3133] font-black uppercase text-xs tracking-widest mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              {resourceItems.map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#3F4143]/65 hover:text-[#8DBD42] text-sm font-bold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-[#3F4143]/65 hover:text-[#8DBD42] text-sm font-bold transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#2f3133] font-black uppercase text-xs tracking-widest mb-6">
              Office Locations
            </h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-[#8DBD42] flex-shrink-0 mt-1"
                />
                <span className="text-[#3F4143]/65 font-medium">
                  <strong className="text-[#2f3133] block mb-1">
                    North (Lacey · Olympia):
                  </strong>
                  <a
                    href="https://maps.google.com/?q=8695+Martin+Way+E+Unit+102+Lacey+WA+98516"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#8DBD42] hover:underline transition-colors"
                  >
                    8695 Martin Way E, Unit 102
                    <br />
                    Lacey, WA 98516
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-[#8DBD42] flex-shrink-0 mt-1"
                />
                <span className="text-[#3F4143]/65 font-medium">
                  <strong className="text-[#2f3133] block mb-1">
                    South (Chehalis · Lewis County):
                  </strong>
                  <a
                    href="https://maps.google.com/?q=1581+N.+National+Ave+Chehalis+WA+98532"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#8DBD42] hover:underline transition-colors"
                  >
                    1581 N. National Ave
                    <br />
                    Chehalis, WA 98532
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#8DBD42] flex-shrink-0" />
                <a
                  href="tel:+13603451015"
                  className="text-[#3F4143]/65 hover:text-[#8DBD42] font-bold transition-colors"
                >
                  (360) 345-1015
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#8DBD42] flex-shrink-0" />
                <a
                  href="mailto:office@firewaterstorm.com"
                  className="text-[#3F4143]/65 hover:text-[#8DBD42] font-bold transition-colors"
                >
                  office@firewaterstorm.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-[#3F4143]/15 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#3F4143]/40 text-[10px] font-black uppercase tracking-widest">
            © 2026 Heritage Restoration Inc. All Rights Reserved. | License
            #HERITRI964J2 | IICRC Certified Firm
          </p>
          <div className="flex gap-6 text-[#3F4143]/40 text-[10px] font-black uppercase tracking-widest">
            <Link href="#" className="hover:text-[#3F4143]">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#3F4143]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
