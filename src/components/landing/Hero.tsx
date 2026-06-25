import { siteConfig } from "@/config/site";
import { ArrowRight } from "./icons";

const ease = "cubic-bezier(.16,.84,.44,1)";

export default function Hero() {
  return (
    <header
      id="top"
      className="relative"
      style={{
        background: "#FAF8F4",
        color: "#0f2e25",
        padding: "clamp(150px,18vh,200px) 28px clamp(72px,10vh,110px)",
      }}
    >
      <div className="mx-auto max-w-[980px]">
        <div
          className="inline-flex items-center gap-[9px] text-[12.5px] font-semibold uppercase"
          style={{
            letterSpacing: "0.14em",
            color: "#0a6b54",
            animation: `tdl-rise .8s both ${ease}`,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#0a6b54]" />
          {siteConfig.tagline}
        </div>

        <h1
          className="font-extrabold"
          style={{
            letterSpacing: "-0.035em",
            lineHeight: 1.04,
            fontSize: "clamp(38px,5.6vw,68px)",
            margin: "26px 0 0",
            maxWidth: "16ch",
            textWrap: "balance",
            color: "#08382b",
            animation: `tdl-rise .9s .08s both ${ease}`,
          }}
        >
          Turn your product into{" "}
          <span style={{ color: "#0a6b54" }}>booked pipeline.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px,1.6vw,19px)",
            lineHeight: 1.55,
            fontWeight: 400,
            color: "#56685f",
            maxWidth: "46ch",
            margin: "24px 0 0",
            animation: `tdl-rise .9s .16s both ${ease}`,
          }}
        >
          Done-for-you distribution for B2B SaaS founders. One operator, not an
          agency.
        </p>

        <div
          className="flex flex-wrap items-center gap-[18px]"
          style={{ marginTop: 36, animation: `tdl-rise .9s .24s both ${ease}` }}
        >
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-[9px] rounded-full bg-[#064e3b] px-[26px] py-[14px] text-[15px] font-bold text-white no-underline transition-[transform,background] duration-200 hover:-translate-y-0.5 hover:bg-[#0a5e47]"
          >
            Book a call
            <ArrowRight />
          </a>
          <a
            href="#proof"
            className="inline-flex items-center gap-2 border-b-[1.5px] border-transparent pb-0.5 text-[15px] font-bold text-[#0f2e25] no-underline transition-colors hover:border-[#0a6b54]"
          >
            See the proof{" "}
            <span style={{ fontSize: 16, lineHeight: 0, color: "#0a6b54" }}>
              →
            </span>
          </a>
        </div>

        <div
          className="flex flex-wrap items-center gap-x-[26px] gap-y-[14px] border-t border-[#ece6dc]"
          style={{
            marginTop: "clamp(52px,8vh,80px)",
            paddingTop: 26,
            animation: `tdl-rise .9s .34s both ${ease}`,
          }}
        >
          <span className="text-[13.5px] font-medium text-[#7c8c85]">
            Founder-led since 2024 — B2B SaaS only.
          </span>
          <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#41584f]">
            <span className="h-[5px] w-[5px] rounded-full bg-[#0a6b54]" />
            115K impressions in a week
          </span>
          <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#41584f]">
            <span className="h-[5px] w-[5px] rounded-full bg-[#0a6b54]" />
            7–8 calls booked / week
          </span>
        </div>
      </div>
    </header>
  );
}
