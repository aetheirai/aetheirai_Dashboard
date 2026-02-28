import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, signup, loginWithGoogle } = useAuth();
  const { toast } = useToast();

  // 🔐 Password Validation Function
  const validatePassword = (password: string, isLoginMode: boolean) => {
    if (isLoginMode) {
      if (password.length < 6) {
        return "Password must be at least 6 characters.";
      }
      return null;
    }

    // Strong validation for Sign Up
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Name (Signup only)
    if (!isLogin && !name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }

    // Validate Password
    const passwordError = validatePassword(password, isLogin);

    if (passwordError) {
      toast({
        title: "Invalid Password",
        description: passwordError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err: any) {
      toast({
        title: "Authentication Error",
        description: err?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (err: any) {
      toast({
        title: "Google Sign-In Error",
        description: err?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-[50%] left-[60%] w-[300px] h-[300px] bg-accent/3 rounded-full blur-[100px] animate-pulse-glow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand */}
        <div className="text-center mb-10">
          <a
            href="https://aetheirai.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/logo.png"
              alt="AetheriAI Logo"
              className="w-32 h-auto object-contain mx-auto"
            />
          </a>
        </div>

        {/* Auth Card */}
        <div className="glass-panel-strong p-8 space-y-6">
          {/* Toggle */}
          <div className="flex bg-muted/50 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isLogin
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5 block">
                  Full Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-muted/30 border-border/50 focus:border-primary/50 h-12 rounded-xl"
                />
              </motion.div>
            )}

            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-muted/30 border-border/50 focus:border-primary/50 h-12 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1.5 block">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  isLogin
                    ? "Enter your password"
                    : "Min 8 chars, 1 uppercase, 1 number, 1 special char"
                }
                className="bg-muted/30 border-border/50 focus:border-primary/50 h-12 rounded-xl"
                required
                minLength={isLogin ? 6 : 8}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl text-base font-semibold glow-primary mt-2"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isSubmitting
                ? "Please wait..."
                : isLogin
                ? "Launch Dashboard"
                : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border/40" />
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-border/40" />
          </div>

          {/* Google Login */}
          <Button
            variant="outline"
            onClick={handleGoogle}
            className="w-full h-12 rounded-xl text-sm font-medium gap-3 border-border/50 hover:bg-muted/40"
          >
            Continue with Google
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/50 mt-6 font-mono uppercase tracking-widest">
          Powered by NVIDIA Riva SDK
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;