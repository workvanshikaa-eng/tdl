import { siteConfig } from "@/config/site";
import SectionLabel from "./SectionLabel";

const badges = [
  "2 yrs in B2B SaaS",
  "Founder-led, always",
  "No account managers",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#064e3b] text-white"
      style={{ padding: "clamp(58px,7vw,92px) 28px" }}
    >
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: -200,
          right: -120,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(16,185,129,0.18),transparent 65%)",
          filter: "blur(16px)",
        }}
      />
      <div
        className="relative mx-auto grid max-w-[1180px] items-center"
        style={{
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.2fr)",
          gap: "clamp(36px,5vw,72px)",
        }}
      >
        <div data-reveal className="relative">
          <div
            className="flex items-center justify-center rounded-[20px]"
            style={{
              aspectRatio: "4 / 5",
              backgroundColor: "#053f30",
              backgroundImage:
                "repeating-linear-gradient(135deg,rgba(255,255,255,0.05) 0,rgba(255,255,255,0.05) 1px,transparent 1px,transparent 11px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span className="font-mono text-[13px] text-[rgba(255,255,255,0.5)]">
              founder portrait
            </span>
          </div>
        </div>

        <div data-reveal data-reveal-delay="120">
          <SectionLabel reveal={false} light>
            Who runs this
          </SectionLabel>
          <h2
            className="font-extrabold"
            style={{
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              fontSize: "clamp(26px,3.2vw,40px)",
              margin: "18px 0 0",
            }}
          >
            Hi, I&apos;m Vanshika.
          </h2>
          <p
            className="max-w-[50ch]"
            style={{
              fontSize: "clamp(15px,1.5vw,17px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.8)",
              margin: "18px 0 0",
            }}
          >
            Two years building distribution for B2B SaaS founders — the kind with
            a real product and a quiet pipeline. The Distribution Lab is small on
            purpose: you work with me directly, on every call and every decision.
          </p>
          <div className="mt-[22px] flex flex-wrap gap-2.5">
            {badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-[7px] rounded-full px-3.5 py-2 text-[13px] font-semibold text-[#eafff7]"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.16)",
                }}
              >
                {b}
              </span>
            ))}
          </div>
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-[9px] rounded-full bg-white px-[26px] py-[15px] text-[16px] font-bold text-[#064e3b] no-underline transition-transform duration-200 hover:-translate-y-0.5"
          >
            Work with me <span style={{ lineHeight: 0, fontSize: 17 }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
