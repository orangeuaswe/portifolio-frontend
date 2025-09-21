import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, Github, Linkedin, ExternalLink, Code, Database, Server,
  ChevronDown, ArrowUpRight, Sparkles, Zap, Terminal, Cloud
} from 'lucide-react';
import '../styles/portifolio.css';
import ContactSection from './ContactSection';
import devPhoto from '../resources/dev1.jpg';

// Helper to avoid dynamic Tailwind class strings
const dotColorClass = (c) =>
  ({ green: 'bg-green-400', yellow: 'bg-yellow-400', blue: 'bg-blue-400' }[c] || 'bg-gray-400');

const API_BASE = 'http://localhost:8080';

const PersonalWebsite = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const observerRef = useRef(null);
  const [isVisible, setIsVisible] = useState({});

  // Cursor-follow light (throttled with rAF)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // IntersectionObserver (you’re not using isVisible yet, but safe to keep)
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.1 }
    );
    const targets = document.querySelectorAll('[data-observe="true"]');
    targets.forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="floating-particle animate-pulse-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );

  const GlassMorphCard = ({ children, className = '', delay = 0, id }) => (
    <div
      id={id}
      data-observe="true"
      className={`glass-card rounded-2xl p-8 transition-shadow duration-500 ease-out group ${className}`}
      style={{ animation: `slideUp 0.8s ease-out ${delay}s both` }}
    >
      {children}
    </div>
  );

  const AnimatedText = ({ children, delay = 0 }) => (
    <div className="animate-text-reveal" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-70" />
      <FloatingParticles />

      {/* Cursor Following Light — always behind content */}
      <div
        aria-hidden
        className="cursor-light -z-10 pointer-events-none"
        style={{ left: mousePosition.x - 192, top: mousePosition.y - 192 }}
      />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="nav-glass rounded-2xl px-8 py-4">
              <div className="flex justify-between items-center">
                <a
                  href="#hero"
                  className="gradient-text font-bold text-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 rounded"
                >
                  Portifolio
                </a>
                <div className="hidden md:flex space-x-8">
                  <a href="#about" className="text-white/70 hover:text-white transition-colors">About</a>
                  <a href="#experience" className="text-white/70 hover:text-white transition-colors">Experience</a>
                  <a href="#projects" className="text-white/70 hover:text-white transition-colors">Projects</a>
                  <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section id="hero" data-observe="true" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <AnimatedText delay={0.2}>
              <div className="mb-8">
                <span className="status-badge inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                  Looking For Fulltime Roles!
                </span>
              </div>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="gradient-text">Anirudh Deveram</span>
              </h1>
            </AnimatedText>

            <AnimatedText delay={0.6}>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Computer Science &amp; Data Science Student at <span className="text-blue-400 font-semibold">Rutgers University</span>
              </p>
            </AnimatedText>

            <AnimatedText delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="#contact"
                  className="btn-primary relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-colors duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center">
                    Let's Connect <ArrowUpRight className="ml-2 h-5 w-5" />
                  </span>
                </a>

                <a
                  href="#projects"
                  className="group relative px-8 py-4 border-2 border-white/20 rounded-2xl font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-colors duration-300"
                >
                  <span className="flex items-center">
                    View Projects <Code className="ml-2 h-5 w-5" />
                  </span>
                </a>
              </div>
            </AnimatedText>
          </div>

          
        </section>

        {/* About Me */}
        <div id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="gradient-text">Me</span>
              </h2>
              <p className="text-xl text-white/70">Get to know the person behind the screen</p>
            </div>

            <GlassMorphCard delay={0.1} className="relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Profile Image */}
                <div className="lg:col-span-1 text-center">
                  <div className="relative inline-block">
                        <div className="profile-wrap mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img
                        src={devPhoto}
                        alt="Anirudh Deveram"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* About Content */}
                <div className="lg:col-span-2">
                  <h3 className="text-3xl font-bold text-white mb-6">Hi, I'm Anirudh Deveram</h3>

                  <div className="space-y-4 text-white/80 leading-relaxed">
                    <p>
                      I'm a passionate Computer Science & Data Science student at Rutgers University with a love for building
                      innovative solutions that make a real impact. Currently looking for full-time roles and completing my final year!
                    </p>
                    <p>
                      I’ve explored everything from Android to cloud infra, with a focus on clean, efficient code and solving real problems.
                    </p>
                    <p>
                      When I'm not coding, I'm cooking family recipes, wrenching on my project car, or building small quality-of-life tools.
                    </p>
                    <p>
                      I care about the intersection of technical problem-solving and human impact; software that quietly saves people time.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">3+</div>
                      <div className="text-white/70 text-sm">Years Coding</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">10+</div>
                      <div className="text-white/70 text-sm">Projects Built</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">2</div>
                      <div className="text-white/70 text-sm">Internships</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-400">May 2026</div>
                      <div className="text-white/70 text-sm">Graduation</div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassMorphCard>
          </div>
        </div>

        {/* Tech Stack */}
        <section id="tech" data-observe="true" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Technical <span className="gradient-text">Skills</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Cutting-edge technologies from enterprise work and personal projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Frontend */}
              <GlassMorphCard delay={0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Frontend</h3>
                  <div className="space-y-3">
                    {[
                      ['React & Next.js', 'green'],
                      ['Java (Spring Boot)', 'green'],
                      ['C# & .NET', 'yellow'],
                      ['Android Development', 'blue'],
                    ].map(([label, color]) => (
                      <div key={label} className="skill-indicator flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                        <span className="text-white/90">{label}</span>
                        <div className={`w-2 h-2 ${dotColorClass(color)} rounded-full animate-pulse`} />
                      </div>
                    ))}
                  </div>
                </div>
              </GlassMorphCard>

              {/* Backend */}
              <GlassMorphCard delay={0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Server className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Backend</h3>
                  <div className="space-y-3">
                    {[
                      ['Spring Boot & APIs', 'green'],
                      ['Node.js', 'green'],
                      ['Terraform & DevOps', 'yellow'],
                      ['Agile/Scrum', 'blue'],
                    ].map(([label, color]) => (
                      <div key={label} className="skill-indicator flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                        <span className="text-white/90">{label}</span>
                        <div className={`w-2 h-2 ${dotColorClass(color)} rounded-full animate-pulse`} />
                      </div>
                    ))}
                  </div>
                </div>
              </GlassMorphCard>

              {/* Data & Cloud */}
              <GlassMorphCard delay={0.3}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Data &amp; Cloud</h3>
                  <div className="space-y-3">
                    {[
                      ['PostgreSQL & Redis', 'green'],
                      ['MongoDB & SQL', 'green'],
                      ['Docker & AWS', 'yellow'],
                      ['Git & CI/CD', 'blue'],
                    ].map(([label, color]) => (
                      <div key={label} className="skill-indicator flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
                        <span className="text-white/90">{label}</span>
                        <div className={`w-2 h-2 ${dotColorClass(color)} rounded-full animate-pulse`} />
                      </div>
                    ))}
                  </div>
                </div>
              </GlassMorphCard>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" data-observe="true" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Professional <span className="gradient-text">Journey</span>
              </h2>
              <p className="text-xl text-white/70">Real-world impact through internships and externships</p>
            </div>

            <div className="space-y-12">
              <GlassMorphCard delay={0.1} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                <div className="pl-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Software Development Intern</h3>
                      <p className="text-blue-400 font-semibold text-lg">Samsung SDSA</p>
                      <p className="text-white/60">Ridgefield Park, NJ</p>
                    </div>
                    <span className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mt-4 lg:mt-0">
                      June 2025 – August 2025
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>Built a full-stack VDI management tool using Spring Boot + React</li>
                        <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>Automated VDI generation with Terraform and scripts</li>
                        <li className="flex items-start"><span className="text-blue-400 mr-2">•</span>Designed PostgreSQL schema for cost dashboards</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Terminal className="h-5 w-5 text-green-400 mr-2" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Spring Boot', 'React', 'PostgreSQL', 'Terraform', 'Git', 'Agile'].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm border border-white/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassMorphCard>

              <GlassMorphCard delay={0.2} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
                <div className="pl-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Data Analytics Extern</h3>
                      <p className="text-purple-400 font-semibold text-lg">Colgate Palmolive</p>
                      <p className="text-white/60">Piscataway, NJ</p>
                    </div>
                    <span className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium mt-4 lg:mt-0">
                      Sep 2024 – Dec 2024
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
                        Impact Delivered
                      </h4>
                      <ul className="space-y-2 text-white/80">
                        <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Automated weekly dashboards (Google Apps Script)</li>
                        <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Cleaned & merged marketing/finance datasets</li>
                        <li className="flex items-start"><span className="text-purple-400 mr-2">•</span>Performed SQL for strategic analysis</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Cloud className="h-5 w-5 text-blue-400 mr-2" />
                        Tools &amp; Methods
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['SQL', 'Google Apps Script', 'Data Analysis', 'Dashboard Design', 'Excel'].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm border border-white/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassMorphCard>
            </div>
          </div>
        </section>

        {/* Education (id fixed to avoid duplicate “about”) */}
        <section id="education" data-observe="true" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <GlassMorphCard delay={0.1} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center animate-glow">
                  <span className="text-white font-bold text-2xl">R</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Rutgers University</h2>
                <p className="text-xl text-blue-400 font-semibold mb-2">Bachelor of Science</p>
                <p className="text-lg text-purple-400 mb-4">Computer Science &amp; Data Science</p>
                <div className="flex justify-center items-center space-x-6">
                  <span className="px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-sm font-medium">
                    Expected: May 2026
                  </span>
                  <span className="text-white/60">New Brunswick, NJ</span>
                </div>
              </div>
            </GlassMorphCard>
          </div>
        </section>

        {/* Projects */}
        <div id="projects" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Full-stack builds, system design, and delightful UX
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pulse Reader */}
              <GlassMorphCard delay={0.1} className="project-card hover:shadow-lg transition-shadow duration-500 h-full">
                <div className="relative h-full flex flex-col">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 pr-16">Pulse Reader</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'AWS'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-blue-500/20 border border-blue-400/30 rounded-md text-blue-300 text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-white/80 mb-6 leading-relaxed flex-grow">
                    High-performance RSS aggregator with PostgreSQL, Redis caching, and automated refresh for 1,000+ sources.
                  </p>

                  <div className="space-y-4 mt-auto">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2 flex items-center">
                        <Zap className="h-4 w-4 text-yellow-400 mr-2" />
                        Performance Highlights
                      </h4>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li>• Sub-100ms queries with Redis</li>
                        <li>• Automated scheduling</li>
                        <li>• Graceful retries</li>
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <a href="https://github.com/orangeuaswe/pulse-reader" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                      <a href="https://pulse-reader-demo.herokuapp.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-green-400 hover:text-green-300 transition-colors">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </GlassMorphCard>

              {/* Window Jumper */}
              <GlassMorphCard delay={0.2} className="project-card hover:shadow-lg transition-shadow duration-500 h-full">
                <div className="relative h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-4 pr-16">Window Jumper</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {['C#', '.NET', 'WebView2', 'JSON', 'Windows API'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded-md text-purple-300 text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-white/80 mb-6 leading-relaxed flex-grow">
                    Lightweight custom browser with global hotkeys, tray integration, multi-tab, and JSON settings.
                  </p>

                  <div className="space-y-4 mt-auto">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2 flex items-center">
                        <Terminal className="h-4 w-4 text-green-400 mr-2" />
                        Key Features
                      </h4>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li>• Global hotkey navigation</li>
                        <li>• Session restoration</li>
                        <li>• WebView2 rendering</li>
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <a href="https://github.com/orangeuaswe/window-jumper" target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                      <a href="https://github.com/orangeuaswe/window-jumper/releases" target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </GlassMorphCard>

              {/* Fast Food App */}
              <GlassMorphCard delay={0.3} className="project-card hover:shadow-lg transition-shadow duration-500 h-full">
                <div className="relative h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-4 pr-16">Fast Food App</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Android', 'Java', 'MVC', 'RecyclerView', 'Material Design'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-green-500/20 border border-green-400/30 rounded-md text-green-300 text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-white/80 mb-6 leading-relaxed flex-grow">
                    Android POS rebuilt from JavaFX with clean MVC and smooth RecyclerView UX.
                  </p>

                  <div className="space-y-4 mt-auto">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2 flex items-center">
                        <Code className="h-4 w-4 text-blue-400 mr-2" />
                        Architecture
                      </h4>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li>• Clean MVC</li>
                        <li>• Optimized RecyclerViews</li>
                        <li>• Material components</li>
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <a href="https://github.com/orangeuaswe/fast-food-app" target="_blank" rel="noopener noreferrer" className="flex items-center text-green-400 hover:text-green-300 transition-colors">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                      <a href="https://github.com/orangeuaswe/fast-food-app/releases" target="_blank" rel="noopener noreferrer" className="flex items-center text-orange-400 hover:text-orange-300 transition-colors">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        APK Download
                      </a>
                    </div>
                  </div>
                </div>
              </GlassMorphCard>

              {/* Bank App */}
              <GlassMorphCard delay={0.4} className="project-card hover:shadow-lg transition-shadow duration-500 h-full">
                <div className="relative h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-4 pr-16">Bank App</h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {['JavaFX', 'JUnit', 'FXML', 'Scene Builder', 'Testing'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-md text-indigo-300 text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-white/80 mb-6 leading-relaxed flex-grow">
                    GUI banking with multiple accounts, robust validation, and strong JUnit coverage.
                  </p>

                  <div className="space-y-4 mt-auto">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
                        Quality Assurance
                      </h4>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li>• Comprehensive tests</li>
                        <li>• Multiple account types</li>
                        <li>• Transaction logging</li>
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <a href="https://github.com/orangeuaswe/bank-app" target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                      
                    </div>
                  </div>
                </div>
              </GlassMorphCard>
            </div>
          </div>
        </div>

        {/* Contact */}
        <section id="contact" data-observe="true" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <ContactSection apiBase={API_BASE} />
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <p className="text-white/60 mb-2">© {new Date().getFullYear()} Anirudh Deveram - CS &amp; Data Science Student at Rutgers University.</p>
                <p className="text-white/40 text-sm">Built with React, Spring Boot, and lots of chai</p>
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://github.com/oranngeuaswe"
                  target="_blank" rel="noopener noreferrer"
                  className="group p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6 text-white/70 group-hover:text-white" />
                </a>
                <a
                  href="https://linkedin.com/in/anirudhdeveram"
                  target="_blank" rel="noopener noreferrer"
                  className="group p-3 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/30 rounded-xl transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-white/70 group-hover:text-blue-400" />
                </a>
                <a
                  href="mailto:anirudhdeveram@gmail.com"
                  className="group p-3 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/30 rounded-xl transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6 text-white/70 group-hover:text-purple-400" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PersonalWebsite;
