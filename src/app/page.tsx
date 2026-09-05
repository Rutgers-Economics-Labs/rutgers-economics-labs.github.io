"use client";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import AnimatedStockChart from "../components/AnimatedStockChart";
import MemberOutcomes from "../components/MemberOutcomes";
import projects from "../data/projects.json";
import team from "../data/team.json";
import { useEffect } from "react";

// Partner logos from projects - deduplicated
const partners = [
  { name: "NJ Department of Labor", logo: "/images/logo/njdol.png" },
  { name: "NJ Department of Environmental Protection", logo: "/images/logo/njdep.png" },
  { name: "NJ Board of Public Utilities", logo: "/images/logo/njbpu.png" },
  { name: "Federal HUD", logo: "/images/logo/hud.svg" },
  { name: "Virginia Center for Public Policy", logo: "/images/logo/virginia.png" },
  { name: "USDA", logo: "/images/logo/usda.png" },
  { name: "NJ DCA", logo: "/images/logo/njdca.png" },
  { name: "NJEDA", logo: "/images/logo/njeda.jpg" },
];

const capabilities = [
  {
    icon: "fa-chart-line",
    title: "Econometric Analysis",
    description: "Advanced statistical modeling and causal inference using cutting-edge econometric techniques"
  },
  {
    icon: "fa-database",
    title: "Data Engineering",
    description: "Large-scale data collection, cleaning, and pipeline development for policy research"
  },
  {
    icon: "fa-code",
    title: "Technical Research",
    description: "Python, R, Stata, and SQL expertise for rigorous quantitative analysis"
  },
  {
    icon: "fa-lightbulb",
    title: "Policy Insights",
    description: "Translating complex data into actionable recommendations for policymakers"
  }
];

// Calculate stats from data files
const totalPartners = projects.length;
const completedProjects = projects.filter(p => p.paperStatus === "completed" || p.paperStatus === "withheld").length;
const activeTeams = projects.filter(p => p.paperStatus === "in_progress").length;
const studentAnalysts = team.executiveBoard.length + team.teamLeads.length + team.boardMembers.length + team.members.length;

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach(element => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div>
        {/* Hero Section */}
        <div className="animated-bg rel-hero relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="hero-enter text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
                Rutgers Economics Labs
              </h1>
              <p style={{ animationDelay: '120ms' }} className="hero-enter text-lg md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                A <span className="text-red-300 font-semibold">data-oriented technical research group</span> providing
                pro bono economic analysis for government agencies and policy organizations
              </p>
              <div style={{ animationDelay: '240ms' }} className="hero-enter flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/about" className="bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 inline-block shadow-lg">
                  Learn More
                </Link>
                <Link href="/apply" className="bg-transparent text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/50 hover:bg-white/10 hover:border-white transition-all duration-300 transform hover:scale-105 inline-block">
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>
          <AnimatedStockChart />
        </div>

        <section className="research-width py-8 flex flex-wrap justify-center gap-6" aria-label="Explore REL"><Link className="research-text-link" href="/work-with-rel">Work with REL →</Link><Link className="research-text-link" href="/student-experience">Explore the student experience →</Link></section>
        {/* Partners Logo Section */}
        <div className="py-16 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[var(--text-muted)] text-sm font-medium uppercase tracking-wider mb-10">
              Trusted by Leading Government Agencies & Organizations
            </p>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll gap-16 items-center">
                {[...partners, ...partners].map((partner, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={80}
                      height={80}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <MemberOutcomes />

        {/* Mission Section - Enhanced */}
        <div className="py-24 bg-[var(--bg-primary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-[var(--text-primary)] mb-6">Our Mission</h3>
              <div className="w-24 h-1 bg-red-600 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-[var(--text-secondary)] max-w-4xl mx-auto leading-relaxed">
                We are a <strong>student-led, data-driven research organization</strong> at Rutgers University that provides
                pro bono technical economic analysis for government agencies, think tanks, and public policy organizations.
                Our mission is to bridge the gap between academic rigor and real-world policy impact.
              </p>
            </div>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  data-reveal
                  style={{ transitionDelay: `${idx * 80}ms` }}
                  className="group p-8 bg-[var(--card-bg)] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--card-border)] text-center"
                >
                  <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600/20 transition-colors duration-300 mx-auto">
                    <i className={`fas ${cap.icon} text-2xl text-red-600`}></i>
                  </div>
                  <h4 className="text-xl font-bold text-[var(--text-primary)] mb-3">{cap.title}</h4>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section - Enhanced */}
        <div className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-white mb-4">Our Impact</h3>
              <p className="text-gray-400 text-lg">Making a difference through data-driven research</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl font-bold text-red-500 mb-3">{totalPartners}</div>
                <div className="text-gray-300 font-medium">Partner Organizations</div>
              </div>
              <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl font-bold text-red-500 mb-3">{completedProjects}</div>
                <div className="text-gray-300 font-medium">Completed Projects</div>
              </div>
              <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl font-bold text-red-500 mb-3">{studentAnalysts}</div>
                <div className="text-gray-300 font-medium">Student Analysts</div>
              </div>
              <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-5xl font-bold text-red-500 mb-3">{activeTeams}</div>
                <div className="text-gray-300 font-medium">Active Teams</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-[var(--bg-secondary)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-4xl font-bold text-[var(--text-primary)] mb-6">Ready to Make an Impact?</h3>
            <p className="text-xl text-[var(--text-secondary)] mb-10 leading-relaxed">
              Whether you're a student looking to gain real-world research experience or an organization
              seeking data-driven policy analysis, we'd love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="px-8 py-4 bg-red-600 text-white rounded-full text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Apply to Join
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-full text-lg font-semibold hover:bg-[var(--border-color)] transition-all duration-300 transform hover:scale-105"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Script src="/main.js" strategy="afterInteractive" />
    </>
  );
}
