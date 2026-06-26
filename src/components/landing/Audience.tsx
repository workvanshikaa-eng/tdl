import SectionLabel from "./SectionLabel";
import { Check } from "./icons";

const points = [
  "You're a B2B SaaS founder, early to mid stage — past launch, chasing real growth.",
  "You have a product people love — and a growth chart flatter than it should be.",
  "You're done duct-taping freelancers and agencies that never quite get it.",
  "You want a distribution engine — not another dashboard to babysit.",
];

export default function Audience() {
  return (
    <section
      className="bg-transparent"
      style={{ padding: "clamp(58px,7vw,92px) 28px" }}
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12">
        <div data-reveal>
          <SectionLabel reveal={false}>Who we work with</SectionLabel>
          <h2
            className="font-extrabold text-[#064e3b]"
            style={{
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              fontSize: "clamp(25px,3vw,36px)",
              margin: "22px 0 0",
              maxWidth: "18ch",
              textWrap: "balance",
            }}
          >
            You built the product. Now you need the distribution.
          </h2>
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}
        >
          {points.map((p, i) => (
            <div
              key={i}
              data-reveal
              data-reveal-delay={60 + i * 60}
              className="rounded-[16px] bg-white p-7"
              style={{ border: "1px solid rgba(6,78,59,0.06)" }}
            >
              <div className="flex items-start gap-3.5">
                <span
                  className="mt-px inline-flex flex-[0_0_auto] items-center justify-center rounded-[9px] bg-[#064e3b] text-[#6ee7b7]"
                  style={{ width: 30, height: 30 }}
                >
                  <Check />
                </span>
                <p className="m-0 text-[15px] font-semibold leading-[1.5] text-[#0f2e25]">
                  {p}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
