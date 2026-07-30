import Link from "next/link";

/** Pre-footer conversion band ("Ready to build your pipeline?"). */
export default function FooterCta() {
  return (
    <section
      style={{ background: "#f9fafb", padding: "120px 24px" }}
      className="text-center"
    >
      <div className="mx-auto max-w-[720px]" data-reveal>
        <h2
          style={{
            fontSize: "clamp(30px,4.6vw,44px)",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#0d0d0d",
            margin: 0,
          }}
        >
          Ready to build your pipeline?
        </h2>
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#6b7280",
            margin: "20px auto 0",
            maxWidth: "52ch",
          }}
        >
          Let us talk about where you are and what distribution should look like
          for your product.
        </p>
        <div className="mt-9">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full px-8 py-[16px] text-[15px] font-medium text-white no-underline transition-colors hover:bg-[#0a7c5c]"
            style={{ background: "#064e3b" }}
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
