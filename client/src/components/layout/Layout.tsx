import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileCallBar from "./MobileCallBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white text-[#3F4143] flex flex-col">
      <Header />

      {/* Main content */}
      <main className="flex-1">{children}</main>

      <Footer />

      {/* keeps the footer from sitting under the pinned call bar on phones */}
      <div className="lg:hidden h-[56px]" style={{ marginBottom: "env(safe-area-inset-bottom)" }} aria-hidden="true" />
      <MobileCallBar />
    </div>
  );
}
