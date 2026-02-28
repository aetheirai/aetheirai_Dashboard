import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, FileText, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Getting Started with AetheriAI", content: "AetheriAI helps you organize your knowledge using AI-powered semantic linking. Start by creating notes and watch the connections form automatically.", createdAt: new Date(Date.now() - 86400000) },
    { id: "2", title: "Research: Neural Architecture Patterns", content: "Transformer-based architectures continue to dominate NLP tasks. Key areas: attention mechanisms, positional encoding, and efficient inference strategies.", createdAt: new Date(Date.now() - 172800000) },
  ]);
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { toast } = useToast();

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!newTitle.trim()) {
      toast({ title: "Title required", description: "Please enter a note title.", variant: "destructive" });
      return;
    }
    const note: Note = {
      id: crypto.randomUUID(),
      title: newTitle.trim(),
      content: newContent.trim(),
      createdAt: new Date(),
    };
    setNotes((prev) => [note, ...prev]);
    setNewTitle("");
    setNewContent("");
    setIsCreating(false);
    toast({ title: "Note created", description: `"${note.title}" has been saved.` });
  };

  const handleDelete = (id: string) => {
    const note = notes.find((n) => n.id === id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
    toast({ title: "Note deleted", description: `"${note?.title}" has been removed.` });
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 w-full">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My <span className="text-gradient-primary">Notes</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{notes.length} notes in your knowledge base</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="glow-primary-sm rounded-xl gap-2">
          <Plus className="w-4 h-4" /> New Note
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={item} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="pl-11 bg-muted/30 border-border/50 focus:border-primary/50 h-12 rounded-xl"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </motion.div>

      {/* Create Note Modal */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-panel-strong p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Create New Note</h3>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Note title..."
                className="bg-muted/30 border-border/50 focus:border-primary/50 h-12 rounded-xl"
                autoFocus
              />
              <Textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Write your note content..."
                className="bg-muted/30 border-border/50 focus:border-primary/50 rounded-xl min-h-[120px] resize-none"
              />
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => { setIsCreating(false); setNewTitle(""); setNewContent(""); }} className="rounded-xl border-border/40">
                  Cancel
                </Button>
                <Button onClick={handleCreate} className="rounded-xl glow-primary-sm">
                  Save Note
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Note Detail */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel-strong p-6 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">{selectedNote.title}</h2>
                <p className="text-xs text-muted-foreground font-mono mt-1">{formatDate(selectedNote.createdAt)}</p>
              </div>
              <button onClick={() => setSelectedNote(null)} className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {selectedNote.content || "No content."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Grid */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((note) => (
          <motion.div
            key={note.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setSelectedNote(note)}
            className="glass-panel p-5 space-y-3 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary shrink-0" />
                <h3 className="text-sm font-semibold tracking-tight line-clamp-1">{note.title}</h3>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">{note.content || "No content."}</p>
            <p className="text-[10px] font-mono text-muted-foreground/60">{formatDate(note.createdAt)}</p>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.div variants={item} className="text-center py-16 text-muted-foreground">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{search ? "No notes match your search." : "No notes yet. Create your first one!"}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NotesPage;
