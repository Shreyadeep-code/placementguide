import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  FileText,
  MessageSquare,
  BarChart3,
  FileDown,
  GraduationCap,
  Play,
  ArrowRight,
  Upload,
  Sparkles,
  Trophy,
  Star,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardMockup from "@/assets/dashboard-mockup.png";
import { useAuth, getDisplayName } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlaceAI — Crack Your Dream Placement" },
      {
        name: "description",
        content:
          "AI-powered resume review and mock interviews for TCS, Infosys, Wipro, Accenture. Built for Indian engineering students.",
      },
      { property: "og:title", content: "PlaceAI — Crack Your Dream Placement" },
      {
        property: "og:description",
        content: "AI-powered resume review and mock interviews for Indian engineering students.",
      },
    ],
  }),
  component: LandingPage,
});

const stats = [
  { value: "10,000+", label: "Students" },
  { value: "95%", label: "Placement Rate" },
  { value: "50+", label: "Companies" },
  { value: "4.9★", label: "Star Rating" },
];

const features = [
  { icon: BarChart3, title: "ATS Score Checker", desc: "Instantly see how applicant tracking systems will rank your resume." },
  { icon: FileText, title: "AI Resume Review", desc: "Detailed, line-by-line feedback to make your resume recruiter-ready." },
  { icon: MessageSquare, title: "Mock Interview", desc: "Practice role-specific questions with real-time AI feedback." },
  { icon: FileDown, title: "PDF Report Download", desc: "A polished report with all insights — perfect to share with mentors." },
];

const steps = [
  { num: "01", icon: Upload, title: "Upload Resume", desc: "Drop in your PDF or DOCX in seconds." },
  { num: "02", icon: Sparkles, title: "Get AI Analysis", desc: "Receive instant ATS score, suggestions, and a mock interview." },
  { num: "03", icon: Trophy, title: "Crack Placement", desc: "Walk into your dream company interview with confidence." },
];

const testimonials = [
  {
    name: "Aarav Sharma",
    college: "IIT Delhi",
    quote:
      "PlaceAI's ATS score feedback transformed my resume. Got shortlisted at TCS Digital and Infosys in the same week.",
  },
  {
    name: "Priya Iyer",
    college: "NIT Trichy",
    quote:
      "The mock interviews were terrifyingly realistic. By placement day, I felt 10x more prepared. Cracked Accenture!",
  },
  {
    name: "Rohan Verma",
    college: "VIT Vellore",
    quote:
      "Every engineering student needs this. The PDF report helped me discuss improvements with my placement cell mentor.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm text-white ring-1 ring-white/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-white">PlaceAI</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-white text-primary hover:bg-white/90">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Floating background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-400/30 blur-3xl animate-float-slow" />
        <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl animate-float-medium" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl animate-pulse-soft" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <div className="text-white animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Made for Indian Engineering Students
            </span>
            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Crack Your Dream{" "}
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Placement
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl">
              AI-powered resume review and mock interviews for TCS, Infosys, Wipro, Accenture.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="lg" className="h-12 px-7 bg-white text-primary hover:bg-white/90 shadow-lg">
                  Get Started Free
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                <Play className="mr-1 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Mockup */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-indigo-500/30 to-blue-500/30 blur-2xl" />
            <img
              src={dashboardMockup}
              alt="PlaceAI dashboard preview showing resume review with ATS score"
              width={1280}
              height={896}
              className="relative rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-background py-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4f46e5] bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to land the offer"
          subtitle="Built specifically for Indian engineering campus placements."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] hover:border-primary/30 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md"
                style={{ background: "var(--gradient-icon)" }}
              >
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="How it works"
          title="Three simple steps to placement-ready"
          subtitle="From upload to offer letter — we've got every step covered."
        />
        <div className="relative mt-16">
          {/* Connector line */}
          <div className="absolute top-10 left-0 right-0 hidden md:block">
            <div className="mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          <div className="relative grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="relative text-center animate-fade-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-white shadow-[var(--shadow-glow)] ring-8 ring-background"
                  style={{ background: "var(--gradient-icon)" }}
                >
                  <s.icon className="h-7 w-7" />
                </div>
                <div className="mt-5 text-xs font-semibold tracking-widest text-primary">
                  STEP {s.num}
                </div>
                <h3 className="mt-1 text-xl font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by students across India"
          subtitle="Real stories from students who cracked their dream placements."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-0.5 text-yellow-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-foreground/90 leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold"
                  style={{ background: "var(--gradient-icon)" }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.college}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-primary">PlaceAI</span>
          </Link>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} PlaceAI. All rights reserved.</div>
          <div>Made for Indian Students 🇮🇳</div>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs font-semibold tracking-widest uppercase text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
