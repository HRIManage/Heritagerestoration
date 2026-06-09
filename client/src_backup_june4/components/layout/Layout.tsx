import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: ReactNode;
}

// FAQ Modal Content
const FAQ_ITEMS = [
  {
    q: "How quickly can you respond to an emergency?",
    a: "We pride ourselves on 24/7 availability and typically arrive within 45 minutes of dispatch. Our emergency hotline is always staffed to coordinate immediate response.",
  },
  {
    q: "Do you work with insurance companies?",
    a: "Yes, we work directly with insurance adjusters and provide detailed Xactimate estimates. We advocate for your interests to ensure full claim approval and coverage.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Federal Way, Auburn, Tacoma, Puyallup, Lacey, Olympia, Chehalis, Centralia, and surrounding areas throughout Washington State.",
  },
  {
    q: "Are you certified and bonded?",
    a: "Yes, we are IICRC certified, fully bonded, and insured. Our contractor license is #HERITRI964J2. We maintain the highest industry standards.",
  },
  {
    q: "What services do you offer?",
    a: "We provide fire damage restoration, water damage mitigation, storm recovery, contents services, emergency board-ups, and complete structural reconstruction.",
  },
];

// Bill of Rights Content
const BILL_OF_RIGHTS = [
  "You have the right to understand the scope of work and restoration process before it begins.",
  "You have the right to receive a detailed, itemized estimate in Xactimate format.",
  "You have the right to work with a restoration company of your choice, not just your insurance company's preferred vendor.",
  "You have the right to a second opinion on damage assessment and repair scope.",
  "You have the right to transparent communication throughout the restoration process.",
  "You have the right to know the qualifications and certifications of the crew working on your property.",
  "You have the right to a warranty on all restoration work performed.",
  "You have the right to have your personal property treated with care and respect.",
];

// Blog Articles
const BLOG_ARTICLES = [
  {
    title: "Understanding Water Damage: Prevention and Restoration",
    excerpt:
      "Learn how to identify water damage early, prevent mold growth, and understand the restoration process.",
  },
  {
    title: "Fire Damage Restoration: What to Expect",
    excerpt:
      "A comprehensive guide to the fire restoration process, from emergency response to final reconstruction.",
  },
  {
    title: "Storm Damage: Preparation and Recovery",
    excerpt:
      "Prepare your home for severe weather and understand the steps for quick recovery after storm damage.",
  },
  {
    title: "Insurance Claims: How to Get Full Coverage",
    excerpt:
      "Tips for working with your insurance adjuster and ensuring your claim is approved for full restoration.",
  },
];

export default function Layout({ children }: LayoutProps) {
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showBillOfRightsModal, setShowBillOfRightsModal] = useState(false);
  const [showBlogsModal, setShowBlogsModal] = useState(false);

  return (
    <div
      className="min-h-screen bg-white text-[#3F4143] flex flex-col"
      style={{ fontFamily: "'Lato', sans-serif" }}
    >
      <Header
        onFaqClick={() => setShowFaqModal(true)}
        onBlogsClick={() => setShowBlogsModal(true)}
        onBillOfRightsClick={() => setShowBillOfRightsModal(true)}
      />

      {/* Main content */}
      <main className="flex-1">{children}</main>

      <Footer
        onFaqClick={() => setShowFaqModal(true)}
        onBlogsClick={() => setShowBlogsModal(true)}
        onBillOfRightsClick={() => setShowBillOfRightsModal(true)}
      />

      {/* FAQ Modal */}
      <Dialog open={showFaqModal} onOpenChange={setShowFaqModal}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3F4143]">
              Frequently Asked Questions
            </DialogTitle>
            <DialogDescription>
              Common questions about our restoration services
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              {FAQ_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <h3 className="font-bold text-[#3F4143] mb-2">{item.q}</h3>
                  <p className="text-[#3F4143]/80 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Bill of Rights Modal */}
      <Dialog
        open={showBillOfRightsModal}
        onOpenChange={setShowBillOfRightsModal}
      >
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3F4143]">
              Homeowner Bill of Rights
            </DialogTitle>
            <DialogDescription>
              Know your rights after a property loss
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-3">
              {BILL_OF_RIGHTS.map((right, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7BB843] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">
                      {idx + 1}
                    </span>
                  </div>
                  <p className="text-[#3F4143]/80 text-sm leading-relaxed pt-0.5">
                    {right}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Blogs Modal */}
      <Dialog open={showBlogsModal} onOpenChange={setShowBlogsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3F4143]">
              Restoration Guides & Articles
            </DialogTitle>
            <DialogDescription>
              Learn more about restoration and recovery
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {BLOG_ARTICLES.map((article, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#7BB843] hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <h3 className="font-bold text-[#3F4143] mb-2">
                    {article.title}
                  </h3>
                  <p className="text-[#3F4143]/70 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <button className="text-[#7BB843] font-semibold text-sm mt-3 hover:text-[#3F4143] transition-colors">
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
