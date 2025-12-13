"use client";

import Link from "next/link";
import {
    ArrowRight,
    Brain,
    Zap,
    ShieldCheck,
    Users,
    XCircle,
    CheckCircle2,
    Map,
    GraduationCap,
    FileCheck,
    AlertTriangle,
    BookOpen,
    BarChart3,
    Workflow,
    TrendingUp,
    Search,
    School,
    Building2,
    LineChart,
    Github,
    Twitter,
    Linkedin
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <div className="min-h-screen text-white relative overflow-hidden font-sans selection:bg-amber-500/30">

            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass border-b border-white/10 transition-all duration-300">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-white">
                            L
                        </div>
                        <span className="text-xl font-bold tracking-tight">Lumina</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
                        <Link href="#problem" className="hover:text-amber-400 transition-colors">Problem</Link>
                        <Link href="#difference" className="hover:text-amber-400 transition-colors">Difference</Link>
                        <Link href="#agents" className="hover:text-amber-400 transition-colors">Agents</Link>
                        <Link href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</Link>
                        <Link href="#analytics" className="hover:text-amber-400 transition-colors">Analytics</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/login" className="hidden sm:flex px-4 py-2 text-sm font-medium hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link href="/get-started" className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-neutral-200 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main className="relative pt-16">

                {/* 1. Hero Section - Positioning & Authority */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                    <div className="container relative z-10 px-4 flex flex-col items-center text-center">

                        <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-500 mb-8 backdrop-blur-sm">
                            <span className="flex w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                            The Future of Adaptive Learning
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 max-w-5xl leading-tight font-heading">
                            Lumina is an <span className="gradient-text">Agentic AI Learning System</span> that adapts in real time.
                        </h1>

                        <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed">
                            Personalized learning powered by multi-agent intelligence, reinforcement learning, and explainable decisions.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-16">
                            <Link href="/start" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center group">
                                Start Learning
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#how-it-works" className="px-8 py-4 glass text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
                                See How It Works
                            </Link>
                        </div>

                        {/* Trust Signals */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            {[
                                { icon: Brain, label: "Agentic AI" },
                                { icon: Zap, label: "Reinforcement Learning" },
                                { icon: ShieldCheck, label: "Explainable Decisions" },
                                { icon: Users, label: "Personalized at Scale" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-3">
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-amber-400">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-medium text-white/80">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Problem Section - "Why Traditional Learning Fails" */}
                <section id="problem" className="py-24 relative">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Why Traditional Learning Fails</h2>
                            <p className="text-white/60 max-w-2xl mx-auto">The old "one-size-fits-all" model is broken.</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                "One-size-fits-all learning paths",
                                "Static content, no adaptation",
                                "Assessments disconnected from understanding",
                                "Late detection of learner failure"
                            ].map((problem, i) => (
                                <div key={i} className="glass-card p-8 rounded-2xl border border-white/10 hover:border-red-500/30 transition-colors group">
                                    <XCircle className="w-10 h-10 text-red-500 mb-6 group-hover:scale-110 transition-transform" />
                                    <p className="font-medium text-lg text-white/90">{problem}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Core Difference - "Why Lumina Exists" */}
                <section id="difference" className="py-24 bg-white/5 border-y border-white/10">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Why Lumina Exists</h2>
                                <p className="text-xl text-white/70 mb-8 leading-relaxed">
                                    Lumina doesn’t just respond to learners. <br />
                                    <span className="text-amber-400 font-bold">It reasons about them.</span>
                                </p>
                                <p className="text-white/60 mb-6">Designed to defend against static notebook LLMs and traditional platforms.</p>
                            </div>

                            <div className="glass rounded-2xl p-1 border border-white/10">
                                <div className="grid grid-cols-2 text-center border-b border-white/10 bg-white/5">
                                    <div className="p-4 font-bold text-white/50 uppercase text-xs tracking-wider">Traditional / Notebook LLM</div>
                                    <div className="p-4 font-bold text-amber-500 uppercase text-xs tracking-wider">Lumina</div>
                                </div>
                                <div className="divide-y divide-white/5 text-sm md:text-base">
                                    {[
                                        { old: "Answers questions", new: "Decides learning actions" },
                                        { old: "Static content", new: "Adaptive pathways" },
                                        { old: "No memory", new: "Persistent learner state" },
                                        { old: "Reactive", new: "Proactive & preventive" }
                                    ].map((row, i) => (
                                        <div key={i} className="grid grid-cols-2 items-center">
                                            <div className="p-6 text-white/60">{row.old}</div>
                                            <div className="p-6 font-medium text-white border-l border-white/5 bg-amber-500/5">{row.new}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Multi-Agent Intelligence - "The Brain of Lumina" */}
                <section id="agents" className="py-24 relative">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">The Brain of Lumina</h2>
                            <p className="text-white/60 max-w-2xl mx-auto">
                                Lumina uses a Multi-Agent AI System where specialized agents collaborate through a shared context.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: Map, name: "Pathway Agent", role: "Decides next step", color: "text-blue-400" },
                                { icon: GraduationCap, name: "Tutor Agent", role: "Explains & scaffolds", color: "text-green-400" },
                                { icon: FileCheck, name: "Assessment Agent", role: "Adapts evaluation", color: "text-purple-400" },
                                { icon: AlertTriangle, name: "Intervention Agent", role: "Prevents failure", color: "text-red-400" },
                                { icon: BookOpen, name: "Content Agent", role: "Personalizes materials", color: "text-yellow-400" },
                                { icon: BarChart3, name: "Analytics Agent", role: "Insights & feedback", color: "text-cyan-400" }
                            ].map((agent, i) => (
                                <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 hover:-translate-y-1 transition-transform">
                                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${agent.color}`}>
                                        <agent.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
                                    <p className="text-white/60">{agent.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. How Lumina Works - "System Flow" */}
                <section id="how-it-works" className="py-24 bg-white/5 border-y border-white/10">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">System Flow</h2>
                            <p className="text-white/60">How complexity becomes simplicity.</p>
                        </div>

                        <div className="relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent -translate-y-1/2 z-0" />

                            <div className="grid md:grid-cols-5 gap-8 relative z-10">
                                {[
                                    { step: "1", title: "Interact", desc: "Learner interacts" },
                                    { step: "2", title: "Context", desc: "MCP builds shared context" },
                                    { step: "3", title: "Reason", desc: "Agents reason independently" },
                                    { step: "4", title: "Optimize", desc: "RL decision selected" },
                                    { step: "5", title: "Act", desc: "Action delivered & logged" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center text-center group">
                                        <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-amber-500/30 flex items-center justify-center font-bold text-2xl mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:border-amber-500 transition-colors cursor-default">
                                            {item.step}
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                                        <p className="text-sm text-white/50">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Reinforcement Learning - "Why It Improves Over Time" */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400 mb-6">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Technical Depth
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Why It Improves Over Time</h2>
                            <p className="text-lg text-white/70 mb-6">
                                Lumina optimizes learning decisions using <span className="text-blue-400 font-bold">Reinforcement Learning</span>.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Optimizes Learning Efficiency",
                                    "Maximizes Engagement",
                                    "Ensures Long-term Retention"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-white/80">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xs text-white/30 uppercase tracking-widest font-mono">
                                Powered by PPO / SAC Algorithms
                            </p>
                        </div>
                        <div className="glass p-8 rounded-3xl border border-white/10 relative">
                            {/* Abstract Visual for RL */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl" />
                            <div className="relative z-10 font-mono text-sm text-blue-200/80 leading-relaxed">
                                <div className="mb-4 text-blue-400">// Optimization Loop</div>
                                <div>Step 1: Observe State (S_t)</div>
                                <div>Step 2: Compare Policies (π)</div>
                                <div>Step 3: Calculate Reward (R)</div>
                                <div className="ml-4 text-green-400">R = efficiency * retention</div>
                                <div>Step 4: Update Weights (θ)</div>
                                <div className="mt-4 animate-pulse">Running Simulation...</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Explainability & Trust - "AI You Can Understand" */}
                <section className="py-24 bg-white/5 border-y border-white/10">
                    <div className="container mx-auto px-4 text-center">
                        <ShieldCheck className="w-12 h-12 text-green-400 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">AI You Can Understand</h2>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                            No black boxes. Full audit trails for every decision.
                        </p>

                        <div className="max-w-3xl mx-auto glass border border-white/10 rounded-xl p-8 text-left">
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-2.5 shrink-0" />
                                <div>
                                    <div className="text-xs text-white/40 uppercase font-mono mb-2">System Log • 10:42 AM</div>
                                    <p className="font-mono text-base md:text-lg text-white/90">
                                        "The <span className="text-green-400">Pathway Agent</span> recommended revision because mastery confidence dropped below threshold (0.65)."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Audience Segmentation - "Who Lumina Is For" */}
                <section id="audience" className="py-24 relative">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Who Lumina Is For</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Users, title: "Students", pain: "Lost in generic content?", benefit: "Personalized mastery paths." },
                                { icon: School, title: "Educators", pain: "Buried in grading?", benefit: "Actionable insights & auto-grading." },
                                { icon: Building2, title: "Institutions", pain: "High dropout rates?", benefit: "Measurable outcomes & retention." }
                            ].map((item, i) => (
                                <div key={i} className="glass-card p-8 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-colors text-center">
                                    <item.icon className="w-10 h-10 mx-auto mb-6 text-white/80" />
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-red-400/80 mb-2 italic">"{item.pain}"</p>
                                    <p className="text-green-400 font-medium">{item.benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 9. Analytics & Outcomes - "Results, Not Promises" */}
                <section id="analytics" className="py-24 bg-white/5 border-y border-white/10">
                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Results, Not Promises</h2>
                            <p className="text-white/60 text-lg mb-8">Designed to measure what matters.</p>

                            <div className="space-y-6">
                                {[
                                    { label: "Learning Proficiency", value: "+45%", color: "bg-green-500" },
                                    { label: "Student Engagement", value: "3.5x", color: "bg-blue-500" },
                                    { label: "Risk Detection Speed", value: "Real-time", color: "bg-purple-500" }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm font-medium mb-2 text-white/80">
                                            <span>{stat.label}</span>
                                            <span>{stat.value}</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className={`h-full ${stat.color} w-[80%] rounded-full`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <LineChart className="w-64 h-64 text-white/20" />
                            {/* Placeholder for complex chart visual */}
                        </div>
                    </div>
                </section>

                {/* 10. Call to Action - "Convert" */}
                <section className="py-32 relative text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl md:text-6xl font-extrabold mb-8 font-heading">Experience Adaptive Learning</h2>
                        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                            Ready to see the future of education?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/get-started" className="px-10 py-5 bg-white text-black font-bold text-xl rounded-full hover:bg-neutral-200 transition-colors">
                                Explore the Platform
                            </Link>
                            <Link href="/architecture" className="px-10 py-5 glass border border-white/20 text-white font-bold text-xl rounded-full hover:bg-white/10 transition-colors">
                                View Architecture
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/10 bg-black py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8 mb-12">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-xs text-white">L</div>
                                    <span className="font-bold">Lumina</span>
                                </div>
                                <p className="text-sm text-white/40">Next-Generation AI-Powered Learning.</p>
                            </div>

                            {[
                                { title: "Platform", links: ["Features", "Architecture", "Security"] },
                                { title: "Company", links: ["About Us", "Contact", "Careers"] },
                                { title: "Legal", links: ["Privacy", "Terms", "Ethics"] }
                            ].map((col, i) => (
                                <div key={i}>
                                    <h4 className="font-bold mb-4 text-white/80">{col.title}</h4>
                                    <ul className="space-y-2 text-sm text-white/50">
                                        {col.links.map((link, j) => (
                                            <li key={j}><Link href="#" className="hover:text-amber-400 transition-colors">{link}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/30 pt-8 border-t border-white/5">
                            <p>© 2024 Lumina Learning Systems. All rights reserved.</p>
                            <div className="flex gap-4 mt-4 md:mt-0">
                                <Github className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                                <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                                <Linkedin className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </footer>

            </main>
        </div>
    );
}
