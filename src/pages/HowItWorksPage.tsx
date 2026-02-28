import { motion } from "framer-motion";
import { FileInput, Cpu, GitBranch, Zap } from "lucide-react";

const steps = [
  {
    icon: FileInput,
    title: "Capture Knowledge",
    description: "Save notes, links, ideas, and any information. Our system accepts all forms of knowledge input seamlessly.",
    phase: "Input",
  },
  {
    icon: Cpu,
    title: "AI Organizes Information",
    description: "Automatic categorization, tagging, and contextual analysis powered by NVIDIA Riva inference engines.",
    phase: "Processing",
  },
  {
    icon: GitBranch,
    title: "Context Gets Connected",
    description: "Related knowledge is linked intelligently across your entire ecosystem, creating a living semantic graph.",
    phase: "Linking",
  },
  {
    icon: Zap,
    title: "Retrieve Anytime",
    description: "Instant recall when you need it. AI understands your intent and surfaces the most relevant knowledge instantly.",
    phase: "Output",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const HowItWorksPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 w-full">
      <motion.div variants={item} className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          How It <span className="text-gradient-primary">Works</span>
        </h1>
        <p className="text-muted-foreground text-sm">Four steps from raw knowledge to instant recall</p>
      </motion.div>

      <div className="relative space-y-6">
        {/* Connecting line */}
        <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />

        {steps.map((s, i) => (
          <motion.div key={i} variants={item} className="flex gap-6 items-start relative">
            {/* Number + icon */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative z-10 glow-primary-sm">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="glass-panel p-6 flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Step {String(i + 1).padStart(2, "0")} — {s.phase}
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HowItWorksPage;
