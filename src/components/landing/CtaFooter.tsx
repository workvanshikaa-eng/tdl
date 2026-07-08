import { siteConfig } from "@/config/site";
import { Check } from "./icons";
import TdlLogo from "@/components/TdlLogo";
import BookingPreview from "./BookingPreview";

const bullets = [
  "A teardown of your current distribution",
  "The one channel worth fixing first",
  "A clear next step, whether we work together or not",
];

export default function CtaFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-transparent"
      style={{ padding: "clamp(88px,11vw,140px) 24px 0" }}
    >
      <div
        className="mx-auto grid max-w-[1120px] items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "clamp(40px,5vw,72px)",
        }}
      >
        <div data-reveal>
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#0a6b54]">
            <span
              className="h-[7px] w-[7px] rounded-full bg-[#10b981]"
              style={{ animation: "tdl-pulse 2.4s ease-in-out infinite" }}
            />
            Booking 2 founders this month
          </div>
          <h2
            className="font-bold text-[#0f2e25]"
            style={{
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              fontSize: "clamp(32px,4.6vw,56px)",
              margin: "20px 0 0",
              maxWidth: "15ch",
              textWrap: "balance",
            }}
          >
            Stop being the best-kept secret in your category.
          </h2>
          <p
            className="text-[#56685f]"
            style={{
              fontSize: "clamp(16px,1.7vw,19px)",
              lineHeight: 1.55,
              margin: "20px 0 0",
              maxWidth: "44ch",
            }}
          >
            A 30-minute call. No deck, no pitch. Just a straight read on where your
            distribution is leaking, and the first thing I would fix.
          </p>

          <div className="mt-8 flex flex-col gap-3.5">
            {bullets.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <span
                  className="inline-flex h-6 w-6 flex-[0_0_auto] items-center justify-center rounded-[7px] bg-[#eefaf4] text-[#0a6b54]"
                >
                  <Check width={14} height={14} strokeWidth={2.6} />
                </span>
                <span className="text-[15px] font-medium text-[#0f2e25]">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={siteConfig.calendlyUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[#064e3b] px-7 py-[15px] text-[16px] font-semibold text-white no-underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              Book a call <span style={{ lineHeight: 0, fontSize: 17 }}>→</span>
            </a>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#cdd6d2] px-6 py-[15px] text-[16px] font-semibold text-[#064e3b] no-underline transition-colors duration-200 hover:border-[#064e3b]"
            >
              Email instead
            </a>
          </div>
        </div>

        <BookingPreview />
      </div>

      <div
        className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 border-t border-[#eaeeec]"
        style={{ marginTop: "clamp(72px,9vw,110px)", padding: "30px 0 40px" }}
      >
        <div className="flex items-center gap-2.5 text-[#0f2e25]">
          <TdlLogo size={24} />
          <span className="text-[15px] font-bold tracking-[-0.02em]">
            {siteConfig.name}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-[14px] font-medium">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener"
            className="text-[#56685f] no-underline hover:text-[#064e3b]"
          >
            {siteConfig.instagramHandle}
          </a>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-[#56685f] no-underline hover:text-[#064e3b]"
          >
            {siteConfig.contactEmail}
          </a>
          <span className="text-[#9aa9a2]">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
