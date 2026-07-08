import { siteConfig } from "@/config/site";

const ease = "cubic-bezier(.16,.84,.44,1)";

export default function Hero() {
  return (
    <header
      id="top"
      className="tdl-grid-on-dark relative overflow-hidden"
      style={{
        background: "#064e3b",
        color: "#ffffff",
        padding: "clamp(150px,22vh,240px) 24px clamp(90px,14vh,150px)",
      }}
    >
      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "-20%",
          right: "-10%",
          width: 640,
          height: 640,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.20), transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative mx-auto max-w-[1000px] text-center">
        <div
          className="inline-flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.16em] text-[#6ee7b7]"
          style={{ animation: `tdl-rise .8s both ${ease}` }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#6ee7b7]" />
          Distribution-as-a-service for B2B SaaS
        </div>

        <h1
          className="font-bold text-white"
          style={{
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            fontSize: "clamp(46px,8vw,92px)",
            margin: "28px auto 0",
            maxWidth: "15ch",
            textWrap: "balance",
            animation: `tdl-rise .9s .08s both ${ease}`,
          }}
        >
          Turn your product into{" "}
          <span style={{ color: "#6ee7b7" }}>booked pipeline.</span>
        </h1>

        <p
          className="mx-auto"
          style={{
            fontSize: "clamp(17px,1.9vw,21px)",
            lineHeight: 1.55,
            fontWeight: 400,
            color: "rgba(255,255,255,0.82)",
            maxWidth: "58ch",
            margin: "30px auto 0",
            animation: `tdl-rise .9s .16s both ${ease}`,
          }}
        >
          Done-for-you distribution for early to mid stage B2B SaaS founders. You
          built a product people love, but the pipeline stays too quiet. I turn
          it into a system that books real calls. One operator, not an agency.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ marginTop: 40, animation: `tdl-rise .9s .24s both ${ease}` }}
        >
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-[15px] text-[16px] font-semibold text-[#064e3b] no-underline transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book a call
            <span style={{ fontSize: 17, lineHeight: 0 }}>→</span>
          </a>
          <a
            href="#results"
            className="inline-flex items-center gap-2 border-b-[1.5px] border-transparent pb-0.5 text-[16px] font-semibold text-white no-underline transition-colors hover:border-[#6ee7b7]"
          >
            See the results{" "}
            <span style={{ fontSize: 16, lineHeight: 0, color: "#6ee7b7" }}>
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
