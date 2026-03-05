import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { Github, Twitter, Instagram, Linkedin, Globe } from "lucide-react";
import { images } from "../../assets/images";
// import heroImage from '../../assets/hero_image.png'

const roles = ["Front End Web Developer", "React Developer"];

function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = isDeleting ? 40 : 80;

  useEffect(() => {
    const current = roles[roleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <span className="text-[#a855f7]">
      {displayed}
      <span className="animate-pulse text-[#ec4899]">|</span>
    </span>
  );
}

function FloatingOrb({ size, color, delay, x, y }: { size: number; color: string; delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
      style={{ width: size, height: size, background: color, left: x, top: y }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.15, 0.3, 0.15],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function CircleAvatar() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-[#a855f7]/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#a855f7]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#ec4899]" />
      </motion.div>

      {/* Middle rotating ring */}
      <motion.div
        className="absolute inset-6 rounded-full border border-dashed border-purple-600/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/4 right-0 translate-x-1/2 w-2 h-2 rounded-full bg-[#a855f7]/60" />
        <div className="absolute bottom-1/4 left-0 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ec4899]/60" />
      </motion.div>

      {/* Inner rotating ring */}
      <motion.div
        className="absolute inset-12 rounded-full border border-[#7c3aed]/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Avatar container */}
      <div className="absolute inset-10 rounded-full overflow-hidden bg-gradient-to-br from-[#2d1f50] to-[#0f0a20] border border-purple-700/50 shadow-[0_0_40px_rgba(168,85,247,0.3)] flex items-end justify-center">
        {/* Silhouette figure */}
       <img src={images.heroimage} alt="" className="rounded-full h-60 w-60" />
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(168,85,247,0.2)] pointer-events-none" />
    </div>
  );
}

const socialLinks = [
  { icon: Github, href: "https://github.com/jairam-2001?tab=repositories", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jayaramulu-kuruba-a99b28244/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/home", label: "Twitter" },
  { icon: Globe, href: "", label: "Website" },
];

export function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#070712]">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb size={400} color="#7c3aed" delay={0} x="10%" y="10%" />
      <FloatingOrb size={300} color="#ec4899" delay={2} x="60%" y="60%" />
      <FloatingOrb size={250} color="#4f46e5" delay={4} x="80%" y="10%" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col md:flex-row items-center justify-between gap-12 w-full">
        {/* Left content */}
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-base mb-3 font-['Poppins'] tracking-widest uppercase"
          >
            Hi my name is,
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white font-['Poppins'] mb-2"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, lineHeight: 1.1 }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Jairam.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-300 text-lg md:text-xl mb-2 font-['Poppins']"
          >
            I'm a <TypingText />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-400 text-sm mb-8 font-['Poppins']"
          >
           Building
            <span className="text-[#a855f7] underline underline-offset-4 decoration-dotted"> fast, responsive, and engaging</span>{" "}
          web interfaces.
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-4 mb-10"
          >
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.3, color: "#a855f7" }}
                className="text-gray-400 hover:text-[#a855f7] transition-colors duration-300"
                aria-label={s.label}
              >
                <s.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("#projects")}
              className="px-8 py-3 rounded-full font-['Poppins'] text-sm text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                boxShadow: "0 0 25px rgba(168,85,247,0.4)",
              }}
            >
              View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("#contact")}
              className="px-8 py-3 rounded-full border border-[#a855f7]/50 text-[#a855f7] font-['Poppins'] text-sm hover:border-[#a855f7] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </div>

        {/* Right - Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
          className="flex-shrink-0"
        >
          <CircleAvatar />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase font-['Poppins']">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-[#a855f7] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
