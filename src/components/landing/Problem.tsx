import SectionLabel from "./SectionLabel";

const chips = [
  { label: "A few random posts", danger: false },
  { label: "A cold list nobody opens", danger: false },
  { label: "A freelancer here and there", danger: false },
  { label: "= silence", danger: true },
];

export default function Problem() {
  return (
    <section
      className="bg-[#FAF8F4]"
      style={{ padding: "clamp(80px,11vw,140px) 28px" }}
    >
      <div className="mx-auto max-w-[1000px]">
        <SectionLabel>The problem</SectionLabel>

        <h2
          data-reveal
          data-reveal-delay="80"
          className="font-extrabold"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            fontSize: "clamp(25px,3.4vw,40px)",
            margin: "20px 0 0",
            maxWidth: "20ch",
            textWrap: "balance",
          }}
        >
          You built something people need. They just never hear about it.
        </h2>

        <div
          data-reveal
          data-reveal-delay="160"
          className="mt-7 flex flex-wrap gap-2.5"
        >
          {chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full px-[15px] py-[9px] text-[14px] font-semibold"
              style={
                c.danger
                  ? {
                      color: "#a14133",
                      background: "#fbeae6",
                      border: "1px solid #f1cabf",
                      fontWeight: 700,
                    }
                  : {
                      color: "#566f66",
                      background: "#fff",
                      border: "1px solid #d3e6dc",
                    }
              }
            >
              {c.label}
            </span>
          ))}
        </div>

        <p
          data-reveal
          data-reveal-delay="220"
          className="font-bold"
          style={{
            fontSize: "clamp(19px,2.2vw,26px)",
            lineHeight: 1.4,
            letterSpacing: "-0.02em",
            color: "#064e3b",
            maxWidth: "24ch",
            margin: "40px 0 0",
            textWrap: "balance",
            borderLeft: "3px solid #6ee7b7",
            paddingLeft: 20,
          }}
        >
          Marketing is a tax for being boring. Distribution is an asset for being
          smart.
        </p>
      </div>
    </section>
  );
}
