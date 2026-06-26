import { siteConfig } from "@/config/site";
import { Check, LogoMark } from "./icons";
import BookingPreview from "./BookingPreview";

const bullets = [
  "A teardown of your current distribution",
  "The one channel worth fixing first",
  "A clear next step — whether we work together or not",
];

export default function CtaFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="tdl-grid-on-dark relative overflow-hidden bg-[#064e3b] text-white"
      style={{ padding: "clamp(90px,12vw,150px) 28px 0" }}
    >
      <div
        className="pointer-events-none absolute"
        style={{
          top: -160,
          left: "50%",
          transform: "translateX(-50%)",
          width: 680,
          height: 680,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(16,185,129,0.18),transparent 62%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="relative mx-auto grid max-w-[1180px] items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "clamp(36px,5vw,64px)",
        }}
      >
        <div data-reveal>
          <div className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-[#6ee7b7]">
            <span
              className="h-[7px] w-[7px] rounded-full bg-[#34d399]"
              style={{ animation: "tdl-pulse 2.4s ease-in-out infinite" }}
            />
            Booking 2 founders this month
          </div>
          <h2
            className="font-extrabold"
            style={{
              letterSpacing: "-0.035em",
              lineHeight: 1.03,
              fontSize: "clamp(30px,4.4vw,52px)",
              margin: "18px 0 0",
              maxWidth: "15ch",
              textWrap: "balance",
            }}
          >
            Stop being the best-kept secret in your category.
          </h2>
          <p
            style={{
              fontSize: "clamp(15px,1.6vw,18px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.78)",
              margin: "18px 0 0",
              maxWidth: "42ch",
            }}
          >
            A 30-minute call. No deck, no pitch — just a straight read on where
            your distribution is leaking, and the first thing I&apos;d fix.
          </p>

          <div className="mt-[30px] flex flex-col gap-[13px]">
            {bullets.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <span
                  className="inline-flex h-6 w-6 flex-[0_0_auto] items-center justify-center rounded-[7px] text-[#6ee7b7]"
                  style={{ background: "rgba(110,231,183,0.14)" }}
                >
                  <Check width={14} height={14} strokeWidth={2.6} />
                </span>
                <span className="text-[15px] font-semibold text-[#eafff7]">
                  {b}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-[9px] rounded-full bg-white px-[26px] py-[14px] text-[15px] font-bold text-[#064e3b] no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "0 12px 30px rgba(0,0,0,0.2)" }}
            >
              Book a call <span style={{ lineHeight: 0, fontSize: 17 }}>→</span>
            </a>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center gap-[9px] rounded-full px-[24px] py-[14px] text-[15px] font-bold text-white no-underline transition-colors duration-200 hover:bg-[rgba(255,255,255,0.08)]"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.35)" }}
            >
              Email instead
            </a>
          </div>
        </div>

        <BookingPreview />
      </div>

      <div
        className="relative mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 border-t"
        style={{
          marginTop: "clamp(70px,9vw,110px)",
          borderTopColor: "rgba(255,255,255,0.12)",
          padding: "30px 0 40px",
        }}
      >
        <div className="flex items-center gap-2.5 text-white">
          <LogoMark size={24} inner={10} />
          <span className="text-[15px] font-extrabold tracking-[-0.02em]">
            {siteConfig.name}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-[14px] font-semibold">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener"
            className="text-[rgba(255,255,255,0.78)] no-underline hover:text-white"
          >
            {siteConfig.instagramHandle}
          </a>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-[rgba(255,255,255,0.78)] no-underline hover:text-white"
          >
            {siteConfig.contactEmail}
          </a>
          <span className="text-[rgba(255,255,255,0.5)]">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
