import { useRef,ChangeEvent,FormEvent, useState } from "react";
import { motion, useInView } from "motion/react";
import { Send, CheckCircle } from "lucide-react";
import { images } from "../../assets/images";

function FloatingCharacter() {
  return (
    <div className="relative   flex items-end justify-center">
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 80%, #7c3aed, transparent 70%)" }}
      />


      {/* Character */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
      <img src={images.contact} className="h-120" />
      </motion.div>
    </div>
  );
}
 type FormData = {
  name: string;
  email: string;
  message: string;
};

export function ContactSection() {
 
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

   const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true)
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true)
        setForm({
          name: "",
          email: "",
          message: ""
        });
      } else {
       setSubmitted(false)

      }

    } catch (error) {
      console.error(error);
      setSubmitted(false);
    }
    finally{
      setLoading(false)
    }
  };


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setSubmitted(true);
  //     setTimeout(() => setSubmitted(false), 3000);
  //     setForm({ name: "", email: "", message: "" });
  //   }, 800);
  // };

  return (
    <section id="contact" ref={ref} className="py-24 bg-[#07070f] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-700/50 to-transparent" />

      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[100px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #7c3aed, #ec4899, transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-700/50 max-w-xs" />
            <span className="text-[#a855f7] text-2xl">{"<"}</span>
            <h2
              className="text-white font-['Poppins']"
              style={{ fontSize: "1.8rem", fontWeight: 600 }}
            >
              Contact
            </h2>
            <span className="text-[#a855f7] text-2xl">{"/>"}</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-700/50 max-w-xs" />
          </div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-['Poppins'] mb-2"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Let's collaborate!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 font-['Poppins']"
            style={{ fontSize: "0.9rem" }}
          >
            Connect me to kickstart your next web development project,
            <br />
            or let's say hello. 👋
          </motion.p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12 justify-center">
          {/* Character */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <FloatingCharacter />
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-md"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-['Poppins']">
                  Name
                </label>
                <motion.input
                  whileFocus={{ borderColor: "#a855f7", boxShadow: "0 0 15px rgba(168,85,247,0.2)" }}
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 outline-none transition-all duration-300 font-['Poppins']"
                  style={{ fontSize: "14px" }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-['Poppins']">
                  Email
                </label>
                <motion.input
                  whileFocus={{ borderColor: "#a855f7", boxShadow: "0 0 15px rgba(168,85,247,0.2)" }}
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 outline-none transition-all duration-300 font-['Poppins']"
                  style={{ fontSize: "14px" }}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2 font-['Poppins']">
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ borderColor: "#a855f7", boxShadow: "0 0 15px rgba(168,85,247,0.2)" }}
                  placeholder="Enter your message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-600 outline-none transition-all duration-300 resize-none font-['Poppins']"
                  style={{ fontSize: "14px" }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading || submitted}
                className="w-full py-3 rounded-xl text-white font-['Poppins'] text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
                style={{
                  background: submitted
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #7c3aed, #ec4899)",
                  boxShadow: "0 0 25px rgba(168,85,247,0.3)",
                }}
              >
                {submitted ? (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                ) : loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <Send size={14} />
                    Submit
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
