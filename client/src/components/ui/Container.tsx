import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "full";
}

export default function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  const getSizeClass = () => {
    switch (size) {
      case "narrow":
        return "max-w-[960px]";
      case "wide":
        return "max-w-[1400px]";
      case "full":
        return "max-w-full";
      default:
        return "max-w-[1200px]";
    }
  };

  return (
    <div className={`mx-auto px-6 w-full ${getSizeClass()} ${className}`}>
      {children}
    </div>
  );
}
