import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import Problem from "@/components/landing/Problem";
import PullQuote from "@/components/landing/PullQuote";
import Services from "@/components/landing/Services";
import CaseStudy from "@/components/landing/CaseStudy";
import About from "@/components/landing/About";
import HowItWorks from "@/components/landing/HowItWorks";
import Faq from "@/components/landing/Faq";
import CtaFooter from "@/components/landing/CtaFooter";
import CalendlyLoader from "@/components/landing/CalendlyLoader";

export default function LandingPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        background: "#ffffff",
        color: "#0d0d0d",
        overflowX: "hidden",
      }}
    >
      <Nav />
      <Hero />
      <StatsBar />
      <Problem />
      <PullQuote />
      <Services />
      <CaseStudy />
      <About />
      <HowItWorks />
      <Faq />
      <CtaFooter />

      <CalendlyLoader />
    </div>
  );
}
