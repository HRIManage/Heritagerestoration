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
  const inView = useInView(ref, { once: true, margin: "-20px 0px" });
  const shouldAnimate = triggerImmediately || inView;

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 20, scale: 0.99 };
      case "down":
        return { y: -20, scale: 0.99 };
      case "left":
        return { x: 20, scale: 0.99 };
      case "right":
        return { x: -20, scale: 0.99 };
      default:
        return { scale: 0.995 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getDirectionOffset() }}
      animate={shouldAnimate ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
