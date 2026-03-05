import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { TechStack } from "./components/TechStack";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

// Particle background
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }[] = [];

    const colors = ["#a855f7", "#7c3aed", "#ec4899", "#6366f1"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}

// Cursor effects
function CursorEffects() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const pointerX = useMotionValue(-200);
  const pointerY = useMotionValue(-200);

  const glowX = useSpring(pointerX, { stiffness: 110, damping: 24 });
  const glowY = useSpring(pointerY, { stiffness: 110, damping: 24 });
  const ringX = useSpring(pointerX, { stiffness: 360, damping: 30 });
  const ringY = useSpring(pointerY, { stiffness: 360, damping: 30 });
  const dotX = useSpring(pointerX, { stiffness: 650, damping: 40 });
  const dotY = useSpring(pointerY, { stiffness: 650, damping: 40 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };

    const targetIsInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          "a, button, [role='button'], input, textarea, select, label, .cursor-pointer",
        ),
      );
    };

    const handleOver = (e: MouseEvent) => setInteractive(targetIsInteractive(e.target));
    const handleMouseDown = () => setPressed(true);
    const handleMouseUp = () => setPressed(false);
    const handleWindowLeave = () => {
      pointerX.set(-200);
      pointerY.set(-200);
      setInteractive(false);
      setPressed(false);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("blur", handleWindowLeave);
    document.addEventListener("mouseleave", handleWindowLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("blur", handleWindowLeave);
      document.removeEventListener("mouseleave", handleWindowLeave);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <>
      {!reduceMotion && (
        <motion.div
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
          style={{
            x: glowX,
            y: glowY,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          }}
        />
      )}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 rounded-full border border-[#ec4899]/80 bg-[#a855f7]/10"
        style={{
          x: ringX,
          y: ringY,
          width: 34,
          height: 34,
        }}
        animate={{
          scale: pressed ? 0.85 : interactive ? 1.25 : 1,
          opacity: interactive ? 0.95 : 0.7,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
      />
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 rounded-full bg-[#ec4899]"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
        }}
        animate={{
          scale: pressed ? 1.7 : interactive ? 0.75 : 1,
          opacity: pressed ? 1 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 650, damping: 38 }}
      />
    </>
  );
}

// Loading screen
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    setTimeout(onDone, 2200);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#070712" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-['Poppins']"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              fontWeight: 800,
              color: "white",
              boxShadow: "0 0 40px rgba(168,85,247,0.6)",
            }}
          >
            J
          </div>
          {/* Rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{ borderTopColor: "#a855f7", borderRightColor: "#ec4899" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div
            className="font-['Poppins'] mb-1"
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Jairam Kuruba
          </div>
          <div className="text-gray-500 text-sm font-['Poppins'] tracking-widest">
            FRONT END DEVELOPER
          </div>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-0.5 rounded-full overflow-hidden bg-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #ec4899)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#070712] overflow-x-hidden">
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ParticleField />
          <CursorEffects />
          <Navbar />
          <main className="relative z-20">
            <HeroSection />
            <AboutSection />
            <TechStack />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
