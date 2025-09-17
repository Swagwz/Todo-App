// eslint-disable-next-line
import { motion } from "motion/react";

interface ExpandableProps {
  children: React.ReactNode;
  expand: boolean;
}

export default function Expandable({ children, expand }: ExpandableProps) {
  return (
    <motion.div
      initial={false}
      animate={{ height: expand ? "auto" : 0, opacity: expand ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}
