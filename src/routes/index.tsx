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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardMockup from "@/assets/dashboard-mockup.png";
import { useAuth, getDisplayName } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlaceAI — Crack Your Dream Placement" },
      {
        name: "description",
        content:
          "AI-powered resume review and mock interviews for Indian campus placements at top IT and product based companies. Built for Indian engineering students.",
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

const highlights = [
  { icon: Sparkles, label: "AI Powered Analysis" },
  { icon: Star, label: "Made for Indian Students \u{1F1EE}\u{1F1F3}" },
  { icon: GraduationCap, label: "Top IT Companies Focused" },
  { icon: ArrowRight, label: "Free to Get Started" },
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
      "PlaceAI's ATS score feedback transformed my resume. Got shortlisted at top IT companies in the same week.",
  },
  {
    name: "Priya Iyer",
    college: "NIT Trichy",
    quote:
      "The mock interviews were terrifyingly realistic. By placement day, I felt 10x more prepared. Cracked my dream company!",
  },
  {
    name: "Rohan Verma",
    college: "VIT Vellore",
    quote:
      "Every engineering student needs this. The PDF report helped me discuss improvements with my placement cell mentor.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const name = getDisplayName(user);

  const onLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate({ to: "/" });
  };

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
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-white/90 mr-1">Hi, {name}</span>
              <Link to="/dashboard">
                <Button className="bg-white text-primary hover:bg-white/90">Dashboard</Button>
              </Link>
              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-white text-primary hover:bg-white/90">Get Started Free</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const initialX = reduce ? 0 : 40;
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
          <div className="text-white">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/20 backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Made for Indian Engineering Students
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, x: -initialX }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
            >
              Crack Your Dream{" "}
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Placement
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: initialX }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl"
            >
              AI-powered resume review and mock interviews for Indian campus placements at top IT and product based companies.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-3"
            >
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
            </motion.div>
          </div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: initialX * 1.5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-indigo-500/30 to-blue-500/30 blur-2xl" />
            <img
              src={dashboardMockup}
              alt="PlaceAI dashboard preview showing resume review with ATS score"
              width={1280}
              height={896}
              className="relative rounded-2xl shadow-2xl ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-background py-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="flex items-center justify-center gap-2.5 text-center rounded-xl border border-border bg-card/60 px-4 py-5 transition-shadow duration-300 hover:shadow-md"
            >
              <h.icon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-medium text-foreground">{h.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to land the offer"
          subtitle="Built specifically for Indian engineering campus placements."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-glow)] hover:border-primary/30"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md"
                  style={{ background: "var(--gradient-icon)" }}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
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
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.2 }}
                className="relative text-center"
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[index];

  return (
    <section className="py-20 sm:py-28 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by students across India"
          subtitle="Real stories from students who cracked their dream placements."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative mt-14 mx-auto max-w-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="rounded-2xl border border-border bg-card p-7 sm:p-10"
              >
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-lg text-foreground/90 leading-relaxed">"{t.quote}"</p>
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
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(index - 1)}
            className="absolute -left-2 sm:-left-12 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(index + 1)}
            className="absolute -right-2 sm:-right-12 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="text-center max-w-2xl mx-auto"
    >
      <div className="text-xs font-semibold tracking-widest uppercase text-primary">{eyebrow}</div>
      <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    </motion.div>
  );
}
