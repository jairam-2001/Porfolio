import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { images } from "../../assets/images";

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-[#070712] relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-700/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="text-[#a855f7] text-2xl">{"<"}</span>
          <h2
            className="text-white font-['Poppins']"
            style={{ fontSize: "1.8rem", fontWeight: 600 }}
          >
            About Me
          </h2>
          <span className="text-[#a855f7] text-2xl">{"/>"}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-700/50 to-transparent ml-2" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Avatar / 3D Character */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              {/* Glow background */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-30"
                style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
              />
              {/* Character silhouette */}
              <div className="relative w-full h-full flex items-end justify-center">
                  <img src={images.heroimage} alt="" className="rounded-full" />
           
              </div>
              {/* Floating dots */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 4 + 2,
                    height: Math.random() * 4 + 2,
                    background: i % 2 === 0 ? "#a855f7" : "#ec4899",
                    left: `${10 + i * 18}%`,
                    top: `${15 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1"
          >
            <h3
              className="text-white mb-6 font-['Poppins']"
              style={{ fontSize: "1.4rem", fontWeight: 600 }}
            >
              Hey there! 👋
            </h3>
            <div className="space-y-4 text-gray-400 font-['Poppins']" style={{ lineHeight: 1.8 }}>
             <p>
              I'm a Frontend Developer with 3+ years of experience building modern and responsive web applications using React.js.
            </p>

            <p>
              I specialize in JavaScript, React, Redux Toolkit, Tailwind CSS, and creating scalable, user-friendly interfaces.
            </p>

            <p>
              I enjoy turning complex ideas into clean, efficient, and engaging web experiences.
            </p>

            <p>
              Outside of coding, I enjoy music, exploring new technologies, and continuously improving my skills.
            </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { value: "10+", label: "Projects" },
                { value: "3+", label: "Years Exp." },
                { value: "10+", label: "Technologies" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center p-4 rounded-xl border border-purple-800/30 bg-purple-900/10"
                >
                  <div
                    className="font-['Poppins'] mb-1"
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #a855f7, #ec4899)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-xs tracking-wider uppercase font-['Poppins']">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-700/50 to-transparent" />
    </section>
  );
}
