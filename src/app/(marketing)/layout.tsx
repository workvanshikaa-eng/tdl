import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/landing/ScrollReveal";
import FloatingCta from "@/components/landing/FloatingCta";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        background: "#f5f5f0",
        color: "#0d0d0d",
        overflowX: "hidden",
      }}
    >
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
      </noscript>

      <Nav />
      <main>{children}</main>
      <Footer />
      <ScrollReveal />
      <FloatingCta />
    </div>
  );
}
