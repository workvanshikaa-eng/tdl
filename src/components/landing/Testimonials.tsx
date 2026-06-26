import SectionLabel from "./SectionLabel";

const testimonials = [
  {
    q: "Booked 7 calls in my first week live. I stopped guessing and just showed up to the meetings.",
    n: "Maya R.",
    r: "Founder · Seed-stage SaaS",
  },
  {
    q: "My LinkedIn went from crickets to inbound. Buyers now reach out already knowing what we do.",
    n: "Dev K.",
    r: "Co-founder · DevTools",
  },
  {
    q: "Finally one person who owns the whole thing. No briefs, no chasing five freelancers.",
    n: "Priya S.",
    r: "Founder · Fintech SaaS",
  },
  {
    q: "Impressions up nearly 10x in a week. The content actually sounds like me, which is the wild part.",
    n: "Aman T.",
    r: "CEO · B2B Platform",
  },
  {
    q: "Pipeline went from hope to a calendar that fills itself. Best operator I have worked with.",
    n: "Sara L.",
    r: "Founder · Vertical SaaS",
  },
  {
    q: "We had the product. She built the distribution. That was the whole gap.",
    n: "Noah B.",
    r: "Founder · Analytics SaaS",
  },
];

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div
      className="flex-[0_0_auto] rounded-[18px] bg-white p-[26px]"
      style={{
        width: 360,
        border: "1px solid rgba(6,78,59,0.08)",
        boxShadow: "0 2px 8px rgba(6,78,59,0.05)",
      }}
    >
      <div className="text-[13px] font-extrabold tracking-[0.08em] text-[#6ee7b7]">
        ★★★★★
      </div>
      <p className="mt-3.5 text-[15px] font-semibold leading-[1.55] text-[#0f2e25]">
        {t.q}
      </p>
      <div className="mt-5 flex items-center gap-[11px]">
        <span className="inline-flex h-9 w-9 flex-[0_0_auto] items-center justify-center rounded-full bg-[#064e3b] text-[14px] font-extrabold text-[#6ee7b7]">
          {t.n.charAt(0)}
        </span>
        <div>
          <div className="text-[13.5px] font-extrabold text-[#064e3b]">
            {t.n}
          </div>
          <div className="mt-px text-[12px] font-semibold text-[#7c8c85]">
            {t.r}
          </div>
        </div>
      </div>
    </div>
  );
}

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="tdl-mq-track flex flex-[0_0_auto] gap-[18px] pr-[18px]"
      style={{ animation: "tdl-marquee 48s linear infinite" }}
      aria-hidden={ariaHidden || undefined}
    >
      {testimonials.map((t, i) => (
        <Card key={i} t={t} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="tdl-mq overflow-hidden bg-transparent"
      style={{ padding: "clamp(58px,7vw,92px) 0" }}
    >
      <div className="mx-auto max-w-[1180px] px-7">
        <SectionLabel>What founders say</SectionLabel>
        <h2
          data-reveal
          data-reveal-delay="80"
          className="font-extrabold text-[#064e3b]"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            fontSize: "clamp(25px,3vw,36px)",
            margin: "20px 0 0",
            maxWidth: "18ch",
            textWrap: "balance",
          }}
        >
          Founders don&apos;t stay quiet about results.
        </h2>
      </div>
      <div
        className="relative mt-10 flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)",
        }}
      >
        <Track />
        <Track ariaHidden />
      </div>
      <p className="mt-[34px] text-center font-mono text-[11px] tracking-[0.04em] text-[#7c8c85]">
        sample feedback · replace with your real client quotes
      </p>
    </section>
  );
}
