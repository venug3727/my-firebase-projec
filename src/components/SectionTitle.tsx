import React from "react";
import { motion } from "framer-motion";

// Define the type for the props
interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16">
      {/* Main Title */}
      <motion.h2
        className="text-4xl font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-lg text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default SectionTitle;
