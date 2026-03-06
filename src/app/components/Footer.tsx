import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Instagram, Youtube, Globe } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/jairam-2001?tab=repositories", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/home", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jayaramulu-kuruba-a99b28244/", label: "LinkedIn" },
  { icon: Globe, href: "#", label: "Website" },
];


export function Footer() {
  return (
    <footer className="relative bg-[#050510] pt-16 pb-8 overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-700/50 to-transparent" />

      {/* Background wave/mountain decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: "200px" }}>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full opacity-30">
          <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#1e0a3c" />
            </linearGradient>
          </defs>
          <path d="M0 200 L0 120 Q180 40 360 80 Q540 120 720 60 Q900 0 1080 50 Q1260 100 1440 80 L1440 200 Z" fill="url(#mountainGrad)" />
          <path d="M0 200 L0 150 Q200 100 400 130 Q600 160 720 110 Q840 60 1000 100 Q1200 140 1440 120 L1440 200 Z" fill="#1e0a3c" opacity="0.7" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            {/* J logo */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-3xl font-['Poppins']"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                fontWeight: 800,
                color: "white",
                boxShadow: "0 0 30px rgba(168,85,247,0.5)",
              }}
            >
              J
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-500 font-['Poppins'] mb-8"
          style={{ fontSize: "12px" }}
        >
          Jairam Kuruba
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
              whileHover={{ scale: 1.3, color: "#a855f7" }}
              className="text-gray-500 hover:text-[#a855f7] transition-all duration-300"
              aria-label={link.label}
            >
              <link.icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-900/40 to-transparent mb-6" />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600 font-['Poppins']"
          style={{ fontSize: "12px" }}
        >
          © Copyright 2026  Jairam Kuruba
        </motion.p>
      </div>
    </footer>
  );
}
