import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import Work from "@/components/landing/Work";
import Services from "@/components/landing/Services";
import PullQuote from "@/components/landing/PullQuote";
import About from "@/components/landing/About";
import CtaFooter from "@/components/landing/CtaFooter";
import ScrollReveal from "@/components/landing/ScrollReveal";
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
      {/* No-JS fallback: reveal animated content */}
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
      </noscript>

      <Nav />
      <Hero />
      <StatsBar />
      <Work />
      <Services />
      <PullQuote />
      <About />
      <CtaFooter />

      <ScrollReveal />
      <CalendlyLoader />
    </div>
  );
}
