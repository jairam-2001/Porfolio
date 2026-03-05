import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { images } from "../../assets/images";

interface TechIcon {
  name: string;
  color: string;
  icon: string;
}

const frontEnd: TechIcon[] = [
  { name: "React", color: "#61DAFB", icon: images.reactjs },
  { name: "TypeScript", color: "#3178C6", icon: images.typescript  },
  { name: "JavaScript", color: "#F7DF1E", icon:images.javascript },
  { name: "HTML5", color: "#E34F26", icon: images.html },
  { name: "CSS3", color: "#1572B6", icon: images.css },
  { name: "Tailwind", color: "#38BDF8", icon: images.tailwind},
  { name: "Redux", color: "#764ABC", icon: images.redux},
  { name: "GSAP", color: "#764ABC", icon: images.gsap},
  { name: "Bootstrap", color: "#1572B6", icon: images.bootstrap },
];





const toolsTech: TechIcon[] = [
  { name: "Git", color: "#F05032", icon: images.git },
  { name: "VS Code", color: "#007ACC", icon: images.vscode },
  { name: "Figma", color: "#F24E1E", icon: images.figma },
  { name: "Postman", color: "#FF6C37", icon: images.postman },
  { name: "GitLab", color: "#ffffff", icon: images.gitlab },
  { name: "Vite", color: "#646CFF", icon: images.vite },
    { name: "NPM", color: "#646CFF", icon: images.npm },

];

function TechBadge({ tech, index }: { tech: TechIcon; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
      whileHover={{
        scale: 1.15,
        y: -5,
        boxShadow: `0 0 20px ${tech.color}40`,
      }}
      className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/5 bg-white/5 cursor-pointer group"
      style={{ minWidth: "100px" }}
    >
      <div
        className="w-12 h-12   p-2 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-300"
        style={{
          background: `${tech.color}20`,
          border: `1px solid ${tech.color}40`,
          color: tech.color,
        }}
      >
        <img src={tech.icon} alt=""  />
      </div>
      <span className="text-gray-400 group-hover:text-white transition-colors font-['Poppins']" style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
        {tech.name}
      </span>
    </motion.div>
  );
}

interface CategoryProps {
  title: string;
  emoji: string;
  techs: TechIcon[];
  delay?: number;
}

function TechCategory({ title, emoji, techs, delay = 0 }: CategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-2xl border border-purple-800/20 bg-purple-900/5"
    >
      <h3
        className="text-white mb-5 flex items-center gap-2 font-['Poppins']"
        style={{ fontSize: "1rem", fontWeight: 600 }}
      >
        {title}
        <span>{emoji}</span>
      </h3>
      <div className="flex flex-wrap gap-3">
        {techs.map((tech, i) => (
          <TechBadge key={tech.name} tech={tech} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-24 bg-[#07070f] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, #ec4899)" }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-700/50" />
          <span className="text-[#a855f7] text-2xl">{"<"}</span>
          <h2
            className="text-white font-['Poppins']"
            style={{ fontSize: "1.8rem", fontWeight: 600 }}
          >
            Tech Stack
          </h2>
          <span className="text-[#a855f7] text-2xl">{"/>"}</span>
          <span className="text-2xl">🚀</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-700/50" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TechCategory title="Front-End" emoji="🎨" techs={frontEnd} delay={0.1} />
          <TechCategory title="Tools & Tech" emoji="🛠️" techs={toolsTech} delay={0.4} />
        </div>
      </div>
    </section>
  );
}
