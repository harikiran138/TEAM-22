import Link from "next/link";
import { ArrowRight, CheckCircle, Globe, Zap, Users, BookOpen, Layers, Star } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <div className="min-h-screen text-white relative overflow-hidden font-sans selection:bg-amber-500/30">

            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass border-b border-white/10 transition-all duration-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        {/* Logo - Text for now or SVG */}
                        <span className="text-xl font-bold tracking-tighter">
                            Lumina<span className="text-amber-500">.</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                        <Link href="#features" className="hover:text-amber-500 transition-colors">Features</Link>
                        <Link href="#for-who" className="hover:text-amber-500 transition-colors">For Who?</Link>
                        <Link href="#how-it-works" className="hover:text-amber-500 transition-colors">How It Works</Link>
                        <Link href="#testimonials" className="hover:text-amber-500 transition-colors">Testimonials</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/login" className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium bg-amber-500 text-black hover:bg-amber-400 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main className="relative pt-16">

                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                    <div className="container relative z-10 px-4 flex flex-col items-center text-center">

                        <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-500 mb-8 backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                            The Future of Learning is Here
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight font-heading">
                            Unlock Your Potential with <span className="gradient-text">Intelligent Learning</span>
                        </h1>

                        <p className="max-w-2xl text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed">
                            Lumina adapts to your unique learning style, providing personalized pathways and real-time feedback driven by advanced AI agents.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link href="/login" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-amber-500 text-black font-semibold text-lg hover:bg-amber-400 transition-transform active:scale-95">
                                Start Learning
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link href="#features" className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-colors">
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Hero Gradient Overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 relative">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text inline-block">why Lumina?</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Built on a foundation of cognitive science and cutting-edge AI to maximize retention and engagement.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Zap className="h-8 w-8 text-amber-500" />,
                                    title: "Adaptive Pacing",
                                    desc: "Our AI agents analyze your performance in real-time to adjust the difficulty and speed of content delivery."
                                },
                                {
                                    icon: <Layers className="h-8 w-8 text-amber-500" />,
                                    title: "Deep Analytics",
                                    desc: "Vizualize your knowledge growth with detailed dashboards that track your cognitive mastery over time."
                                },
                                {
                                    icon: <Globe className="h-8 w-8 text-amber-500" />,
                                    title: "Global Community",
                                    desc: "Connect with learners worldwide and participate in collaborative challenges to reinforcement learning."
                                }
                            ].map((feature, i) => (
                                <div key={i} className="glass-card p-8 rounded-2xl hover:border-amber-500/30 transition-colors group">
                                    <div className="mb-4 p-3 bg-amber-500/10 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Target Audience */}
                <section id="for-who" className="py-24 bg-zinc-900/30 border-y border-white/5">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Who is Lumina For?</h2>
                            <p className="text-gray-400">Designed for anyone serious about mastering complex topics.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Students",
                                    desc: "Ace your exams with personalized study plans and instant explanations for difficult concepts."
                                },
                                {
                                    title: "Educators",
                                    desc: "Scale your impact by using AI to grade, assess, and identify gaps in student understanding automatically."
                                },
                                {
                                    title: "Lifelong Learners",
                                    desc: "From coding to history, master new skills efficiently with a curriculum that adapts to your life."
                                }
                            ].map((item, i) => (
                                <div key={i} className="glass-card p-8 rounded-2xl text-center hover:-translate-y-1 transition-transform duration-300">
                                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-xl">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-gray-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Workflow */}
                <section id="how-it-works" className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text inline-block">How It Works</h2>
                        </div>

                        <div className="relative max-w-4xl mx-auto">
                            {/* Line connecting steps (desktop) */}
                            <div className="hidden md:block absolute top-[2.25rem] left-0 w-full h-0.5 bg-white/10 z-0"></div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                                {[
                                    { title: "Sign Up", desc: "Create your profile and set your learning goals." },
                                    { title: "Assess", desc: "Take a quick diagnostic so our agents understand your level." },
                                    { title: "Master", desc: "Engage with adaptive content and track your mastery." }
                                ].map((step, i) => (
                                    <div key={i} className="flex flex-col items-center text-center">
                                        <div className="w-20 h-20 rounded-full glass border border-amber-500/30 flex items-center justify-center mb-6 bg-black shadow-[0_0_30px_-10px_rgba(245,158,11,0.3)]">
                                            <span className="text-2xl font-bold text-amber-500">{i + 1}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                                        <p className="text-gray-400 max-w-xs">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section id="testimonials" className="py-24 bg-gradient-to-b from-zinc-900/0 to-zinc-900/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Loved by Educators</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {[
                                {
                                    quote: "Lumina has completely transformed how I track student progress. The insights are deeper than any other platform I've used.",
                                    author: "Dr. Sarah Chen",
                                    role: "Professor of Computer Science"
                                },
                                {
                                    quote: "The adaptive pathways ensure no student is left behind. It's like having a teaching assistant for every single student.",
                                    author: "Mark Davis",
                                    role: "High School Principal"
                                }
                            ].map((t, i) => (
                                <div key={i} className="glass-card p-8 rounded-2xl relative">
                                    <div className="absolute top-6 right-8 text-amber-500/20">
                                        <Users className="h-12 w-12" />
                                    </div>
                                    <div className="flex gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 text-amber-500 fill-amber-500" />)}
                                    </div>
                                    <p className="text-lg text-gray-300 mb-6 italic">"{t.quote}"</p>
                                    <div>
                                        <div className="font-bold text-white">{t.author}</div>
                                        <div className="text-sm text-gray-500">{t.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <footer className="py-8 border-t border-white/10 bg-black text-center text-sm text-gray-500">
                <div className="container mx-auto">
                    <p>&copy; {new Date().getFullYear()} Lumina Platform. All rights reserved.</p>
                    <div className="flex justify-center gap-6 mt-4">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
