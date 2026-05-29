import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  FileText,
  MessageSquare,
  GraduationCap,
  LogOut,
  Upload,
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { generateResumePdf } from "@/lib/resume-pdf";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth, getDisplayName } from "@/hooks/use-auth";
import { useServerFn } from "@tanstack/react-start";
import { analyzeResume, type ResumeAnalysis } from "@/lib/resume.functions";

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
    if (!loading && !user) navigate({ to: "/login" });
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
          <nav className="flex gap-1 -mb-px">
            <TabButton active={tab === "resume"} onClick={() => setTab("resume")} icon={FileText} label="Resume Review" />
            <TabButton active={tab === "interview"} onClick={() => setTab("interview")} icon={MessageSquare} label="Mock Interview" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {tab === "resume" ? <ResumePanel studentName={name} /> : <InterviewPanel />}
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

function ResumePanel({ studentName }: { studentName: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);
  const analyze = useServerFn(analyzeResume);

  const onPick = (f: File | null) => {
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please upload a PDF file");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5 MB.");
      return;
    }
    setFile(f);
    setResult(null);
  };

  const onAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    try {
      const text = await extractPdfText(file);
      if (text.trim().length < 50) {
        throw new Error("Could not read enough text from this PDF.");
      }
      const data = await analyze({ data: { resumeText: text, studentName } });
      setResult(data);
      toast.success("Analysis complete!");
    } catch (e: any) {
      toast.error(e?.message || "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Resume Review</h1>
        <p className="text-muted-foreground mt-1">Upload your resume to get AI feedback and an ATS score.</p>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onPick(e.dataTransfer.files?.[0] ?? null);
        }}
        onClick={() => inputRef.current?.click()}
        className="rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
          <Upload className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-semibold text-foreground">Drop your resume here or click to upload</h3>
        <p className="mt-1 text-sm text-muted-foreground">PDF only, up to 5 MB</p>
        {file && (
          <p className="mt-4 text-sm font-medium text-primary">{file.name}</p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={onAnalyze} disabled={!file || analyzing}>
          {analyzing ? (
            <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Analyzing your resume...</>
          ) : (
            <><Sparkles className="h-4 w-4 mr-2" /> Analyze My Resume</>
          )}
        </Button>
      </div>

      {analyzing && (
        <div className="rounded-xl border border-border bg-card p-10 text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-foreground font-medium">Analyzing your resume...</p>
          <p className="text-sm text-muted-foreground mt-1">This may take 10–20 seconds</p>
        </div>
      )}

      {result && <Results result={result} studentName={studentName} />}
    </div>
  );
}

function Results({ result }: { result: ResumeAnalysis }) {
  const score = Math.max(0, Math.min(100, Math.round(result.ats_score)));
  const color = score <= 40 ? "#ef4444" : score <= 70 ? "#f97316" : "#22c55e";
  const colorLabel = score <= 40 ? "Needs work" : score <= 70 ? "Decent" : "Excellent";

  const sections: { key: keyof ResumeAnalysis["section_scores"]; label: string }[] = [
    { key: "education", label: "Education" },
    { key: "skills", label: "Skills" },
    { key: "projects", label: "Projects" },
    { key: "experience", label: "Experience" },
    { key: "formatting", label: "Formatting" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-8 flex flex-col sm:flex-row items-center gap-8">
        <CircularScore value={score} color={color} />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">ATS Score</p>
          <h2 className="text-3xl font-bold text-foreground mt-1">{score} / 100</h2>
          <p className="mt-2 font-medium" style={{ color }}>{colorLabel}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">Section Scores</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {sections.map((s) => {
            const v = Number(result.section_scores?.[s.key] ?? 0);
            return (
              <div key={s.key} className="rounded-xl border border-border bg-card p-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                  <span className="text-sm font-bold text-primary">{v}/10</span>
                </div>
                <Progress value={v * 10} className="mt-2 h-2" />
              </div>
            );
          })}
        </div>
      </div>

      <ListCard
        title="Strengths"
        items={result.strengths}
        icon={<CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />}
      />
      <ListCard
        title="Weaknesses"
        items={result.weaknesses}
        icon={<XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />}
      />
      <ListCard
        title="Suggestions"
        items={result.suggestions}
        icon={<ArrowRight className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />}
      />

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground">Missing Keywords</h3>
        <p className="text-sm text-muted-foreground mt-1">Consider adding these to your resume</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {result.keywords_missing.map((k, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ListCard({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3 text-sm text-foreground">
            {icon}
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CircularScore({ value, color }: { value: number; color: string }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
      <circle cx="70" cy="70" r={r} stroke="hsl(var(--muted))" strokeWidth="12" fill="none" opacity="0.3" />
      <circle
        cx="70"
        cy="70"
        r={r}
        stroke={color}
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 70 70)"
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      <text x="70" y="78" textAnchor="middle" fontSize="28" fontWeight="700" fill={color}>
        {value}
      </text>
    </svg>
  );
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjs: any = await import("pdfjs-dist");
  // Use bundled worker
  const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

  const buf = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buf }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it: any) => it.str).join(" ") + "\n";
  }
  return text;
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
