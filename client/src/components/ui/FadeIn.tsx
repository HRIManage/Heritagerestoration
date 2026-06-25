import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  triggerImmediately?: boolean;
  style?: React.CSSProperties;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  triggerImmediately = false,
  style,
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldAnimate = triggerImmediately || inView;

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 34, scale: 0.985 };
      case "down":
        return { y: -34, scale: 0.985 };
      case "left":
        return { x: 34, scale: 0.985 };
      case "right":
        return { x: -34, scale: 0.985 };
      default:
        return { scale: 0.992 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getDirectionOffset() }}
      animate={shouldAnimate ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
