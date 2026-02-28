import { motion } from "framer-motion";
import { FileText, Brain, Link2, Bot, RefreshCw, Search } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Note Storage",
    description: "Intelligent note organization that automatically categorizes and tags your knowledge. Every piece of information finds its perfect place.",
  },
  {
    icon: Brain,
    title: "Context-Aware Recall",
    description: "AI understands what you need before you finish asking. Contextual retrieval based on semantic understanding of your knowledge base.",
  },
  {
    icon: Link2,
    title: "Knowledge Linking",
    description: "Automatic connection of related information across your entire knowledge ecosystem. Discover hidden relationships between ideas.",
  },
  {
    icon: Bot,
    title: "AI Memory Assistant",
    description: "A long-term memory that learns and evolves with you. The more you use it, the smarter your personal knowledge graph becomes.",
  },
  {
    icon: RefreshCw,
    title: "Cross-device Sync",
    description: "Access your knowledge seamlessly across all devices. Real-time synchronization ensures you're never without your insights.",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Find by meaning, not just keywords. Our AI understands intent and context to deliver precisely what you're looking for.",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const FeaturesPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 w-full">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Platform <span className="text-gradient-primary">Features</span>
        </h1>
        <p className="text-muted-foreground text-sm">AI-powered capabilities that redefine knowledge management</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={item}
            className="glass-panel p-6 space-y-4 hover:border-primary/30 transition-all group cursor-default"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:glow-primary-sm transition-all">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FeaturesPage;
