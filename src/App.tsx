import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";
import NotesPage from "./pages/NotesPage";
import CoursesPage from "./pages/CoursesPage"; // ✅ Added
import FeaturesPage from "./pages/FeaturesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

/* =============================
   Loading Spinner Component
============================= */
const FullPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

/* =============================
   Protected Route
============================= */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <FullPageLoader />;

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

/* =============================
   Auth Route
============================= */
const AuthRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <FullPageLoader />;

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <AuthPage />
  );
};

/* =============================
   App Component
============================= */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />

            <Routes>
              {/* Root */}
              <Route path="/" element={<Navigate to="/auth" replace />} />

              {/* Auth */}
              <Route path="/auth" element={<AuthRoute />} />

              {/* Protected Dashboard Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardOverview />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/courses" element={<CoursesPage />} /> {/* ✅ New */}
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>

          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;