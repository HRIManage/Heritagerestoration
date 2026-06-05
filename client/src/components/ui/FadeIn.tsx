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
        return { y: 48, scale: 0.97 };
      case "down":
        return { y: -48, scale: 0.97 };
      case "left":
        return { x: 48, scale: 0.97 };
      case "right":
        return { x: -48, scale: 0.97 };
      default:
        return { scale: 0.98 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getDirectionOffset() }}
      animate={shouldAnimate ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
