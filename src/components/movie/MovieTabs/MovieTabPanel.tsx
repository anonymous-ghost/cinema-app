import { motion } from "framer-motion";

interface MovieTabPanelProps {
  children: React.ReactNode;
  name: string;
}

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const MovieTabPanel = ({ children, name }: MovieTabPanelProps) => (
  <motion.div
    key={name}
    variants={tabVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
  </motion.div>
);

export default MovieTabPanel;
