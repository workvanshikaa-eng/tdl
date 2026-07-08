import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import PullQuote from "@/components/landing/PullQuote";
import Services from "@/components/landing/Services";
import CaseStudy from "@/components/landing/CaseStudy";
import HowItWorks from "@/components/landing/HowItWorks";
import Faq from "@/components/landing/Faq";
import CtaFooter from "@/components/landing/CtaFooter";
import LandingScripts from "@/components/landing/LandingScripts";
import CalendlyLoader from "@/components/landing/CalendlyLoader";

export default function LandingPage() {
  return (
    <div
      className="tdl-grid-bg"
      style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        color: "#0f2e25",
        overflowX: "hidden",
      }}
    >
      {/* No-JS fallback: reveal animated content */}
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
      </noscript>

      <Nav />
      <Hero />
      <StatsBar />
      <PullQuote />
      <Services />
      <CaseStudy />
      <HowItWorks />
      <Faq />
      <CtaFooter />

      <LandingScripts />
      <CalendlyLoader />
    </div>
  );
}
