import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import StackMarquee from "@/components/landing/StackMarquee";
import Problem from "@/components/landing/Problem";
import Services from "@/components/landing/Services";
import Audience from "@/components/landing/Audience";
import HowItWorks from "@/components/landing/HowItWorks";
import About from "@/components/landing/About";
import Proof from "@/components/landing/Proof";
import Testimonials from "@/components/landing/Testimonials";
import Faq from "@/components/landing/Faq";
import CtaFooter from "@/components/landing/CtaFooter";
import LandingScripts from "@/components/landing/LandingScripts";
import CalendlyLoader from "@/components/landing/CalendlyLoader";

export default function LandingPage() {
  return (
    <div
      className="tdl-grid-bg"
      style={{
        fontFamily: "var(--font-manrope), sans-serif",
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
      <StackMarquee />
      <Problem />
      <Services />
      <Audience />
      <HowItWorks />
      <About />
      <Proof />
      <Testimonials />
      <Faq />
      <CtaFooter />

      <LandingScripts />
      <CalendlyLoader />
    </div>
  );
}
