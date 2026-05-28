import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, MessageSquare, GraduationCap, LogOut, Upload, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth, getDisplayName } from "@/hooks/use-auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PlaceAI" },
      { name: "description", content: "Your PlaceAI dashboard." },
    ],
  }),
  component: DashboardPage,
});

type Tab = "resume" | "interview";

function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("resume");

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, loading, navigate]);

  const onLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate({ to: "/" });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const name = getDisplayName(user);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top nav */}
      <header className="bg-card border-b border-border">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-primary">PlaceAI</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-foreground font-medium">Hi, {name}</span>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
          {/* Tabs */}
          <nav className="flex gap-1 -mb-px">
            <TabButton active={tab === "resume"} onClick={() => setTab("resume")} icon={FileText} label="Resume Review" />
            <TabButton active={tab === "interview"} onClick={() => setTab("interview")} icon={MessageSquare} label="Mock Interview" />
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {tab === "resume" ? <ResumePanel /> : <InterviewPanel />}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof FileText; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function ResumePanel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Resume Review</h1>
        <p className="text-muted-foreground mt-1">Upload your resume to get AI feedback and an ATS score.</p>
      </div>
      <div className="rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
          <Upload className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-semibold text-foreground">Upload your resume</h3>
        <p className="mt-1 text-sm text-muted-foreground">PDF or DOCX, up to 5 MB</p>
        <Button className="mt-6" disabled>Choose File (coming soon)</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {["ATS Score", "Suggestions", "PDF Report"].map((t) => (
          <div key={t} className="rounded-xl border border-border bg-card p-5">
            <h4 className="font-medium text-foreground">{t}</h4>
            <p className="mt-1 text-sm text-muted-foreground">Available after your first review.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterviewPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mock Interview</h1>
        <p className="text-muted-foreground mt-1">Practice role-specific questions with instant feedback.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { role: "Software Engineer", count: "30 questions" },
          { role: "Data Analyst", count: "25 questions" },
          { role: "Product Manager", count: "20 questions" },
          { role: "HR Round", count: "15 questions" },
        ].map((r) => (
          <div key={r.role} className="rounded-xl border border-border bg-card p-6 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{r.role}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{r.count}</p>
            </div>
            <Button variant="outline" size="sm" disabled>
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
