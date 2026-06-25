import { siteConfig } from "@/config/site";
import SectionLabel from "./SectionLabel";
import {
  Target,
  Search,
  Bolt,
  User,
  Layers,
  Pen,
  PlusCircle,
} from "./icons";

type Service = {
  n: string;
  title: string;
  body: string;
  Icon: React.ComponentType<{ width?: number; height?: number }>;
  delay: number;
};

const services: Service[] = [
  {
    n: "02",
    title: "SEO",
    body: "Rank for the searches your buyers actually make. Content and technical work that compounds.",
    Icon: Search,
    delay: 60,
  },
  {
    n: "03",
    title: "Paid Ads",
    body: "Tight, founder-led ad systems that buy attention without lighting your budget on fire.",
    Icon: Bolt,
    delay: 120,
  },
  {
    n: "04",
    title: "Personal Branding",
    body: "Build the founder brand that makes buyers trust you before the first call.",
    Icon: User,
    delay: 180,
  },
  {
    n: "05",
    title: "LinkedIn Page Management",
    body: "Your company page, run like a media channel — consistent, on-brand, always shipping.",
    Icon: Layers,
    delay: 60,
  },
  {
    n: "06",
    title: "Copywriting & Ghostwriting",
    body: "Words that sound like you on your best day. Posts, pages, and emails that convert.",
    Icon: Pen,
    delay: 120,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#FAF8F4]"
      style={{ padding: "clamp(20px,3vw,40px) 28px clamp(58px,7vw,92px)" }}
    >
      <div className="mx-auto max-w-[1180px]">
        <SectionLabel>What we do</SectionLabel>

        <div
          data-reveal
          data-reveal-delay="80"
          className="mt-[22px] flex flex-wrap items-end justify-between gap-5"
        >
          <h2
            className="m-0 font-extrabold"
            style={{
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              fontSize: "clamp(25px,3vw,36px)",
              maxWidth: "16ch",
              textWrap: "balance",
            }}
          >
            One distribution system. Not a freelancer menu.
          </h2>
          <p className="m-0 max-w-[32ch] text-[15px] leading-[1.5] text-[#566f66]">
            Every channel plugs into one engine — built and run by one person.
          </p>
        </div>

        {/* Flagship card */}
        <a
          data-reveal
          data-reveal-delay="120"
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener"
          className="relative mt-11 block overflow-hidden rounded-[24px] no-underline transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[3px]"
          style={{
            color: "inherit",
            background: "#064e3b",
            padding: "clamp(32px,4vw,52px)",
            boxShadow: "0 18px 40px rgba(6,78,59,0.14)",
          }}
        >
          <div
            className="pointer-events-none absolute"
            style={{
              top: -120,
              right: -90,
              width: 380,
              height: 380,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(16,185,129,0.28),transparent 65%)",
              filter: "blur(10px)",
            }}
          />
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            className="pointer-events-none absolute"
            style={{ top: -24, right: 36, opacity: 0.13 }}
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="1.5"
          >
            <circle cx="120" cy="120" r="110" />
            <circle cx="120" cy="120" r="78" />
            <circle cx="120" cy="120" r="46" />
            <circle cx="120" cy="120" r="14" fill="#6ee7b7" stroke="none" />
          </svg>
          <div className="relative flex flex-wrap items-end justify-between gap-7">
            <div className="max-w-[60ch]">
              <div className="inline-flex items-center gap-2.5">
                <span
                  className="inline-flex items-center justify-center rounded-[9px] text-[#6ee7b7]"
                  style={{
                    width: 30,
                    height: 30,
                    background: "rgba(255,255,255,0.12)",
                  }}
                >
                  <Target />
                </span>
                <span className="font-mono text-[12.5px] font-medium uppercase tracking-[0.08em] text-[#6ee7b7]">
                  The flagship service
                </span>
              </div>
              <h3
                className="mt-3 font-extrabold text-white"
                style={{
                  letterSpacing: "-0.03em",
                  fontSize: "clamp(23px,2.6vw,32px)",
                  lineHeight: 1.06,
                }}
              >
                LinkedIn Lead Generation
              </h3>
              <p
                className="mt-3 max-w-[48ch] leading-[1.5]"
                style={{
                  fontSize: "clamp(15px,1.5vw,16px)",
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                Your profile becomes a pipeline machine — daily content in your
                voice, targeted outreach, inbound that books real calls. Not
                vanity likes.
              </p>
            </div>
            <span className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-full bg-white px-[22px] py-[13px] text-[15px] font-bold text-[#064e3b]">
              Start here <span style={{ lineHeight: 0, fontSize: 17 }}>→</span>
            </span>
          </div>
        </a>

        {/* Services grid */}
        <div
          className="mt-4 grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))",
          }}
        >
          {services.map((s) => (
            <div
              key={s.n}
              data-reveal
              data-reveal-delay={s.delay}
              className="rounded-[18px] border border-[#d3e6dc] bg-white p-[30px] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-[#bfe0d3]"
              style={{ boxShadow: "0 2px 6px rgba(6,78,59,0.04)" }}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-[#064e3b] text-white">
                  <s.Icon />
                </span>
                <span className="font-mono text-[13px] font-medium text-[#9bb3a8]">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-3.5 text-[17px] font-extrabold tracking-[-0.02em] text-[#064e3b]">
                {s.title}
              </h3>
              <p className="mt-[9px] text-[14px] leading-[1.5] text-[#566f66]">
                {s.body}
              </p>
            </div>
          ))}

          {/* "All of it" tile */}
          <div
            data-reveal
            data-reveal-delay="180"
            className="flex flex-col justify-center rounded-[18px] p-[30px]"
            style={{ background: "#E8F2EE", border: "1px dashed #b6d6c8" }}
          >
            <span className="mb-4 inline-flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-[#0a6b54] text-white">
              <PlusCircle />
            </span>
            <h3 className="m-0 text-[17px] font-extrabold tracking-[-0.02em] text-[#064e3b]">
              All of it. As one engine.
            </h3>
            <p className="mt-[9px] text-[14px] leading-[1.5] text-[#566f66]">
              No menu. We build the whole stack around your goal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
