import { motion } from "motion/react";

export default function Expandable({ children, expand }) {
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
