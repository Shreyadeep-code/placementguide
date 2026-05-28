import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, MessageSquare, BarChart3, FileDown, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlaceAI — Crack Your Dream Placement" },
      { name: "description", content: "AI-powered placement prep for Indian engineering students. Resume review, mock interviews, ATS scoring, and detailed PDF reports." },
      { property: "og:title", content: "PlaceAI — Crack Your Dream Placement" },
      { property: "og:description", content: "AI-powered placement prep for Indian engineering students." },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: FileText, title: "Resume Review", desc: "Get instant, detailed feedback on your resume from our AI." },
  { icon: MessageSquare, title: "Mock Interview", desc: "Practice with realistic interview questions tailored to your role." },
  { icon: BarChart3, title: "ATS Score", desc: "See how your resume scores against applicant tracking systems." },
  { icon: FileDown, title: "PDF Report", desc: "Download a polished report with all your insights and improvements." },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-primary">PlaceAI</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="px-4 py-20 sm:py-28 text-primary-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Crack Your Dream Placement
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-primary-foreground/80">
            India's smartest placement prep platform for engineering students.
            Resume review, mock interviews, and ATS insights — powered by AI.
          </p>
          <div className="mt-10 flex justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-base h-12 px-8">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything you need to land the offer
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built specifically for Indian engineering campus placements.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PlaceAI. Made for India's future engineers.
        </div>
      </footer>
    </div>
  );
}
