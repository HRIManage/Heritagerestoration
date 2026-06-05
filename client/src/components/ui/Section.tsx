import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  bg?: "light" | "linen" | "charcoal" | "white" | "none";
}

export default function Section({
  children,
  id,
  className = "",
  style,
  bg = "none",
}: SectionProps) {
  const getBgClass = () => {
    switch (bg) {
      case "linen":
        return "bg-brand-linen";
      case "charcoal":
        return "bg-brand-charcoal text-white";
      case "white":
        return "bg-white";
      case "light":
        return "bg-[#FBFBF9]";
      default:
        return "";
    }
  };

  return (
    <section
      id={id}
      className={`py-10 md:py-20 overflow-hidden relative ${getBgClass()} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
