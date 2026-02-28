import { motion } from "framer-motion";
import {
  BookOpen,
  PlayCircle,
  Clock,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

/* =========================
   Mock Realistic Course Data
========================= */
const coursesData = [
  {
    id: "react-advanced",
    title: "Advanced React Architecture",
    lessons: 24,
    completedLessons: 18,
    duration: "6h 30m",
    category: "Frontend",
  },
  {
    id: "ai-web",
    title: "AI-Powered Web Applications",
    lessons: 18,
    completedLessons: 8,
    duration: "4h 10m",
    category: "AI",
  },
  {
    id: "tailwind-2026",
    title: "Tailwind Mastery 2026",
    lessons: 32,
    completedLessons: 32,
    duration: "8h 20m",
    category: "Frontend",
  },
  {
    id: "laravel-vue",
    title: "Fullstack Laravel + Vue",
    lessons: 28,
    completedLessons: 4,
    duration: "7h 45m",
    category: "Backend",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const filters = ["All", "Frontend", "Backend", "AI"];

const CoursesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  /* =========================
     Filtered Courses
  ========================= */
  const filteredCourses = useMemo(() => {
    if (activeFilter === "All") return coursesData;
    return coursesData.filter((c) => c.category === activeFilter);
  }, [activeFilter]);

  /* =========================
     Stats Calculation
  ========================= */
  const totalCourses = coursesData.length;
  const totalCompleted = coursesData.filter(
    (c) => c.completedLessons === c.lessons
  ).length;

  const totalLessons = coursesData.reduce(
    (sum, c) => sum + c.lessons,
    0
  );

  const totalCompletedLessons = coursesData.reduce(
    (sum, c) => sum + c.completedLessons,
    0
  );

  const completionRate = Math.round(
    (totalCompletedLessons / totalLessons) * 100
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 w-full"
    >
      {/* =========================
         Header
      ========================= */}
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Your Learning Hub
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track progress, filter by category, and continue learning.
          </p>
        </div>

        <Button className="glow-primary-sm rounded-xl gap-2">
          <BookOpen className="w-4 h-4" />
          Browse Courses
        </Button>
      </motion.div>

      {/* =========================
         Stats Section
      ========================= */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="glass-panel p-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              Enrolled
            </span>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{totalCourses}</div>
        </div>

        <div className="glass-panel p-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              Completed
            </span>
            <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{totalCompleted}</div>
        </div>

        <div className="glass-panel p-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              Completion Rate
            </span>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{completionRate}%</div>
        </div>
      </motion.div>

      {/* =========================
         Filter Tabs
      ========================= */}
      <motion.div variants={item} className="flex gap-3 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              activeFilter === filter
                ? "bg-primary text-primary-foreground glow-primary-sm"
                : "bg-muted/30 text-muted-foreground hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* =========================
         Courses Grid
      ========================= */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {filteredCourses.map((course) => {
          const progress = Math.round(
            (course.completedLessons / course.lessons) * 100
          );

          const isCompleted = progress === 100;

          return (
            <div
              key={course.id}
              className="glass-panel p-6 space-y-4 hover:border-primary/30 transition-colors group"
            >
              {/* Title */}
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">
                  {course.title}
                </h3>

                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <PlayCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>

              {/* Meta */}
              <div className="flex gap-6 text-xs text-muted-foreground">
                <span>{course.completedLessons}/{course.lessons} Lessons</span>
                <span>{course.duration}</span>
                <span>{course.category}</span>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>

                <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Action */}
              <Button
                className="w-full mt-2 rounded-xl"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                {isCompleted ? "Review Course" : "Continue Learning"}
              </Button>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default CoursesPage;