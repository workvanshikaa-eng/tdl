import Link from "next/link";
import Spark from "./Spark";
import SectionLabel from "./SectionLabel";

/** Pre-footer conversion band ("Ready to build your pipeline?"). */
export default function FooterCta() {
  return (
    <section style={{ background: "#f9fafb", padding: "130px 24px" }} className="text-center">
      <div className="mx-auto max-w-[900px]" data-reveal>
        <div className="flex justify-center">
          <SectionLabel>Start a project</SectionLabel>
        </div>
        <h2
          style={{
            fontSize: "clamp(34px,6vw,64px)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#0d0d0d",
            margin: "22px 0 0",
          }}
        >
          Your buyers are online right now. Are you?
        </h2>
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#6b7280",
            margin: "22px auto 0",
            maxWidth: "50ch",
          }}
        >
          Tell us about your product. We will tell you where your distribution is
          broken and what we would do about it.
        </p>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-8 py-[16px] text-white no-underline transition-colors hover:bg-[#0a7c5c]"
            style={{
              background: "#064e3b",
              fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontSize: "13px",
            }}
          >
            <Spark size={12} color="#ffffff" />
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
