const STACK = [
  "LinkedIn",
  "Sales Navigator",
  "Google",
  "Meta Ads",
  "HubSpot",
  "Apollo",
  "Webflow",
  "Notion",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="tdl-mq-track flex flex-[0_0_auto] items-center gap-[52px] pr-[52px] text-[18px] font-extrabold tracking-[-0.02em] text-[#9aa99f]"
      style={{ animation: "tdl-marquee 34s linear infinite" }}
      aria-hidden={ariaHidden || undefined}
    >
      {[...STACK, ...STACK].map((s, i) => (
        <span key={i}>{s}</span>
      ))}
    </div>
  );
}

export default function StackMarquee() {
  return (
    <section className="tdl-mq overflow-hidden bg-transparent pb-2 pt-[30px]">
      <p className="mb-5 mt-0 text-center font-mono text-[11.5px] uppercase tracking-[0.16em] text-[#9bb3a8]">
        The stack we run your distribution on
      </p>
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
        }}
      >
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}
