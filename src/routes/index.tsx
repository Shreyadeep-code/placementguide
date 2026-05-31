import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  FileText,
  MessageSquare,
  BarChart3,
  FileDown,
  GraduationCap,
  ArrowRight,
  Upload,
  Sparkles,
  Trophy,
  Star,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Zap,
  ShieldCheck,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, getDisplayName } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlaceAI — Crack Your Dream Placement with AI" },
      {
        name: "description",
        content:
          "AI-powered resume review and mock interviews for Indian campus placements at top IT and product based companies.",
      },
      { property: "og:title", content: "PlaceAI — Crack Your Dream Placement with AI" },
      {
        property: "og:description",
        content: "AI-powered resume review and mock interviews for Indian engineering students.",
      },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: BarChart3, title: "ATS Score Checker", desc: "See exactly how applicant tracking systems rank your resume — before recruiters do." },
  { icon: FileText, title: "AI Resume Review", desc: "Line-by-line feedback that turns a draft into a recruiter-ready resume." },
  { icon: MessageSquare, title: "Mock Interview", desc: "Practice role-specific questions with real-time AI feedback and scoring." },
  { icon: FileDown, title: "PDF Report Download", desc: "A polished, shareable report — perfect for mentors and your placement cell." },
];

const steps = [
  { num: "01", icon: Upload, title: "Upload Resume", desc: "Drop in your PDF in seconds. We handle the parsing." },
  { num: "02", icon: Sparkles, title: "Get AI Analysis", desc: "Instant ATS score, deep critique, and a tailored mock interview." },
  { num: "03", icon: Trophy, title: "Crack Placement", desc: "Walk into your dream interview with quiet, prepared confidence." },
];

const why = [
  {
    icon: Zap,
    title: "Built for Indian Placements",
    desc: "Tuned for general Indian campus placements at top IT and product based companies.",
  },
  {
    icon: ShieldCheck,
    title: "Honest, Recruiter-Grade Feedback",
    desc: "No fluff. Clear strengths, clear gaps, and the keywords you're missing.",
  },
  {
    icon: Globe2,
    title: "Free to Get Started",
    desc: "Run your first resume analysis and mock interview at zero cost.",
  },
];

const testimonials = [
  {
    name: "Aarav Sharma",
    college: "IIT Delhi",
    quote:
      "PlaceAI's ATS feedback transformed my resume. Got shortlisted at top IT companies in the same week.",
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

const typingPhrases = ["Analyze Resume...", "Practice Interview...", "Get Placed..."];

const EASE = [0.22, 1, 0.36, 1] as const;

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white overflow-x-hidden antialiased selection:bg-blue-500/30">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <Why />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500"
    />
  );
}

function Nav() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const name = getDisplayName(user);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate({ to: "/" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">PlaceAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#why" className="hover:text-white transition-colors">Why PlaceAI</a>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-white/70 mr-1">Hi, {name}</span>
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white border-0 shadow-lg shadow-blue-500/25">
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-violet-500/40 transition-shadow">
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="md:hidden overflow-hidden glass-strong border-t border-white/10"
          >
            <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3 text-white/80">
              <a href="#features" onClick={() => setOpen(false)} className="py-2">Features</a>
              <a href="#how" onClick={() => setOpen(false)} className="py-2">How it works</a>
              <a href="#why" onClick={() => setOpen(false)} className="py-2">Why PlaceAI</a>
              <div className="flex gap-2 pt-2 border-t border-white/10">
                {user ? (
                  <Link to="/dashboard" className="flex-1" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white border-0">Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="flex-1" onClick={() => setOpen(false)}>
                      <Button variant="ghost" className="w-full text-white hover:bg-white/10">Login</Button>
                    </Link>
                    <Link to="/signup" className="flex-1" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white border-0">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Typewriter() {
  const [pIdx, setPIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typingPhrases[pIdx];
    const tick = deleting ? 40 : 80;
    const pause = deleting ? 400 : 1400;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setPIdx((i) => (i + 1) % typingPhrases.length);
      return;
    }
    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, tick);
    return () => clearTimeout(t);
  }, [text, deleting, pIdx]);

  return (
    <span
      className="caret-blink inline-block font-mono text-base sm:text-lg text-blue-300/90"
      suppressHydrationWarning
    >
      {text}
    </span>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const initialX = reduce ? 0 : 30;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
      {/* Animated gradient base */}
      <div className="absolute inset-0 hero-gradient-anim animate-gradient-shift" />
      {/* Mesh overlay */}
      <div className="absolute inset-0 mesh-bg opacity-90" />
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* Floating orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-blue-500/30 blur-[120px] animate-orb-a" />
        <div className="absolute top-1/3 -right-20 h-[26rem] w-[26rem] rounded-full bg-violet-600/30 blur-[120px] animate-orb-b" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[100px] animate-orb-c" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-white/85"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            Made for Indian Engineering Students
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -initialX }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02]"
          >
            <span className="block text-white">Crack Your Dream</span>
            <span className="block text-gradient-bp">Placement with AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: initialX }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="mt-6 text-lg sm:text-xl text-white/65 max-w-2xl leading-relaxed"
          >
            AI-powered resume review and mock interviews for Indian campus placements at top IT and product based companies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            className="mt-6 flex items-center gap-2 text-white/60"
          >
            <span className="text-white/40 text-sm">PlaceAI helps you</span>
            <Typewriter />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4 relative"
          >
            <Link to="/signup">
              <Button
                size="lg"
                className="h-13 px-7 text-base bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-400 hover:to-violet-500 text-white border-0 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(139,92,246,0.7)] transition-all hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <a href="#how">
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-7 text-base bg-transparent border border-white/25 text-white hover:bg-white/10 hover:text-white hover:border-white/40 transition-all"
              >
                See How It Works
              </Button>
            </a>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.9 }}
              className="glass rounded-full px-3.5 py-1.5 text-xs font-medium text-white/90 flex items-center gap-1.5 shadow-[0_8px_30px_-8px_rgba(139,92,246,0.5)]"
            >
              <span>✨</span> 100% Free to Start
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0a0f1e]" />
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="text-center max-w-2xl mx-auto"
    >
      <div className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-400/90">{eyebrow}</div>
      <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-tight">
        <span className="text-white">{title}</span>
      </h2>
      <p className="mt-4 text-white/60 text-lg leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}

function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-[#0a0f1e]">
      <div className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to land the offer"
          subtitle="Built specifically for Indian engineering campus placements."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl glass p-6 transition-all duration-300 hover:border-blue-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/0 via-violet-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-violet-500/10 group-hover:to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10" />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-white text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.desc}</p>
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
    <section id="how" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 mesh-bg opacity-50" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="How it works"
          title="Three steps to placement-ready"
          subtitle="From upload to offer letter — we've covered every step."
        />
        <div className="relative mt-20">
          {/* Glowing connector */}
          <div className="absolute top-10 left-0 right-0 hidden md:block">
            <div className="mx-auto max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
          </div>
          <div className="relative grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.18 }}
                className="relative group"
              >
                <div className="glass rounded-2xl p-8 text-center transition-all duration-300 group-hover:border-violet-400/40 group-hover:shadow-[0_0_50px_-10px_rgba(139,92,246,0.5)]">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)] ring-8 ring-[#0a0f1e]">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <div className="mt-5 text-5xl font-extrabold text-gradient-bp leading-none">
                    {s.num}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="relative py-24 sm:py-32 bg-[#0a0f1e]">
      <div className="absolute inset-0 dot-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Why PlaceAI"
          title="Designed for outcomes, not noise"
          subtitle="Built by people who've sat on both sides of the campus interview table."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {why.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl glass p-7 transition-all duration-300 hover:border-blue-400/50 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-violet-500/30">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{w.title}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
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
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <div className="relative mx-auto max-w-6xl px-4">
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
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="rounded-2xl glass p-7 sm:p-10 shadow-[0_0_60px_-20px_rgba(99,102,241,0.5)]"
              >
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-lg text-white/90 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.college}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(index - 1)}
            className="absolute -left-2 sm:-left-14 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full glass text-white hover:bg-white/15 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(index + 1)}
            className="absolute -right-2 sm:-right-14 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full glass text-white hover:bg-white/15 transition-colors"
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
                  i === index ? "w-6 bg-gradient-to-r from-blue-400 to-violet-500" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-700 to-fuchsia-700 animate-gradient-shift" />
      <div className="absolute inset-0 mesh-bg opacity-40 mix-blend-overlay" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-blue-400/30 blur-[100px] animate-orb-a" />
        <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-[100px] animate-orb-b" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
        >
          Ready to Get Placed?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-5 text-lg text-white/80 max-w-2xl mx-auto"
        >
          Join students preparing smarter for Indian campus placements at top IT and product based companies.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <Link to="/signup">
            <Button
              size="lg"
              className="h-14 px-9 text-base bg-white text-[#1a1244] hover:bg-white/95 border-0 shadow-[0_0_50px_-5px_rgba(255,255,255,0.7)] hover:shadow-[0_0_70px_-5px_rgba(255,255,255,0.9)] transition-all hover:-translate-y-0.5 font-semibold"
            >
              Get Started Free
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-[#070b18] border-t border-white/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.4)]" />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-white">PlaceAI</span>
          </Link>
          <nav className="flex flex-wrap gap-6 text-sm text-white/60">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#why" className="hover:text-white transition-colors">Why PlaceAI</a>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <div>© {new Date().getFullYear()} PlaceAI. All rights reserved.</div>
          <div>Made with ❤️ for Indian Students 🇮🇳</div>
        </div>
      </div>
    </footer>
  );
}
