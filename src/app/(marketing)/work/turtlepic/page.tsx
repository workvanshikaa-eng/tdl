import Link from "next/link";
import SectionLabel from "@/components/landing/SectionLabel";
import Spark from "@/components/landing/Spark";

export const metadata = {
  title: "What a Search Console Audit Actually Finds",
  description:
    "A six-day Search Console audit for TurtlePic: 93,000 impressions, a 2.3% click-through rate, and the fixes hiding in plain sight.",
};

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
};

const readout = [
  { label: "/best-photo-sharing-apps-high-res/", num: "28,374", flag: "0.45%" },
  { label: "/best-alternatives-to-foto-owl/", num: "7,318", flag: "0.74%" },
  { label: "/ai-wedding-photo-sharing/", num: "20,697", flag: "0.97%" },
  { label: "/what-is-turtlepic-ai-photo-sharing/", num: "2,861", flag: "0.00%" },
  { label: "app.test.turtlepic.com", num: "724", flag: "indexed" },
];

const spec = [
  { k: "Client", v: "TurtlePic, AI event photography, Gurugram" },
  { k: "Scope", v: "Technical audit, content strategy, on-page" },
  { k: "Surface area", v: "272 URLs, 100 posts, 4 sitemaps" },
  { k: "Audit window", v: "Six days" },
];

const findings = [
  {
    n: "01",
    title: "A single page holding 28,374 impressions at 0.45 percent",
    body: "The site's highest-visibility page was returning 129 clicks from 28,374 impressions. It ranked. It just did not read like something worth opening. The title was written for the product, not for the person searching.",
    cost: "Moving this one page to a 2 percent CTR is roughly 440 additional clicks per quarter. No new content. No new links.",
  },
  {
    n: "02",
    title: "A staging subdomain ranking in Google",
    body: "A test environment had been indexed and was drawing 724 impressions and 57 clicks over the audit window. Real users were landing on an internal build. It had been live in search results for months without anyone noticing.",
    cost: "Diverted traffic, duplicate content signals, and an unfinished product surface visible to prospects.",
  },
  {
    n: "03",
    title: "Eighty-seven URLs returning 404 to Googlebot",
    body: "Against 93 successfully indexed pages, 179 were not indexed, and 87 of those were dead URLs Google was still crawling. Crawl budget was being spent on pages that no longer existed.",
    cost: "Wasted crawl allocation on a site where the pages that matter were already struggling to hold position.",
  },
  {
    n: "04",
    title: "Half of all clicks were people already searching the brand name",
    body: "Branded queries accounted for roughly 51 percent of total clicks. Stripping those out left around 12 non-branded clicks per day. The site was performing well for people who already knew the company and barely registering for anyone who did not.",
    cost: "Search was reinforcing existing demand rather than creating new demand, which is the opposite of what it was being paid to do.",
  },
];

const method = [
  { k: "Page-level pass", v: "Every indexed URL pulled with impressions, clicks, CTR and average position. Sorted by impressions rather than clicks, which is where high-visibility low-conversion pages surface." },
  { k: "Indexing reconciliation", v: "Indexed pages checked against total known URLs and against the submitted sitemaps. The gap between the three numbers is where dead URLs, staging environments and orphaned pages appear." },
  { k: "Branded split", v: "Queries separated into branded and non-branded to establish how much traffic search was actually creating versus capturing from existing awareness." },
  { k: "CMS audit", v: "All 100 published posts reviewed for missing target keywords, absent meta descriptions and low optimisation scores. Twenty-five help documentation pages found competing with commercial content in the index." },
  { k: "Competitor interception review", v: "Existing alternatives-to pages assessed for performance. The strongest was already returning 5.6 percent CTR in its first month, which established the pattern worth extending." },
];

const deliverables = [
  "Rewritten titles and metas on five high-impression pages",
  "FAQ schema written for AI search surfacing",
  "Twelve articles targeting non-branded commercial intent",
  "India-specific keyword map with zero-competition terms",
  "Internal linking structure across the existing archive",
  "Technical remediation list for the engineering team",
  "Keyword tracker with weekly position monitoring",
  "Image and asset specification for design",
];

export default function TurtlepicAudit() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#f5f5f0", padding: "clamp(80px,12vh,120px) 24px 0" }}>
        <div className="mx-auto max-w-[1000px]" data-reveal>
          <div className="flex items-center gap-4">
            <SectionLabel>Audit / AI SaaS / India</SectionLabel>
            <Link href="/work" className="no-underline" style={{ ...mono, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#9aa9a2" }}>
              ← All work
            </Link>
          </div>
          <h1
            style={{
              fontSize: "clamp(38px,6.5vw,68px)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0d0d0d",
              margin: "26px 0 0",
              maxWidth: "16ch",
            }}
          >
            The traffic was already there.{" "}
            <span style={{ color: "#064e3b" }}>Nobody was clicking.</span>
          </h1>
          <p style={{ fontSize: "19px", lineHeight: 1.62, color: "#6b7280", margin: "28px 0 0", maxWidth: "58ch" }}>
            A Search Console audit for an AI events platform found{" "}
            <strong style={{ color: "#374151", fontWeight: 500 }}>93,000 impressions over 90 days</strong>{" "}
            and a click-through rate of 2.3 percent. The problem was never getting
            Google&apos;s attention. It was everything happening after.
          </p>
        </div>

        {/* Signature readout panel */}
        <div className="mx-auto mt-16 max-w-[1000px]" data-reveal>
          <div style={{ background: "#064e3b", borderRadius: 12, overflow: "hidden" }}>
            <div className="flex items-center gap-2.5" style={{ padding: "13px 22px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.22)" }} />
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.22)" }} />
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#d9a441" }} />
              <span style={{ ...mono, fontSize: "10.5px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.44)", marginLeft: 4 }}>
                search console · pages · 90d
              </span>
            </div>
            <div style={{ padding: "22px 22px 30px" }}>
              {readout.map((r) => (
                <div
                  key={r.label}
                  className="grid items-baseline gap-4"
                  style={{ gridTemplateColumns: "1fr auto auto", padding: "15px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span style={{ ...mono, fontSize: "12.5px", color: "rgba(255,255,255,0.62)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {r.label}
                  </span>
                  <span style={{ ...mono, fontSize: "14px", fontWeight: 500, color: "#fff", textAlign: "right", minWidth: 74 }}>
                    {r.num}
                  </span>
                  <span style={{ ...mono, fontSize: "12.5px", fontWeight: 500, color: "#d9a441", textAlign: "right", minWidth: 56 }}>
                    {r.flag}
                  </span>
                </div>
              ))}
              <p style={{ ...mono, fontSize: "12.5px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginTop: 24, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                One page held <b style={{ color: "#d9a441", fontWeight: 500 }}>28,374 impressions</b> and returned 129 clicks.<br />
                One page had ranked for three months and returned <b style={{ color: "#d9a441", fontWeight: 500 }}>zero</b>.<br />
                One page was a <b style={{ color: "#d9a441", fontWeight: 500 }}>staging environment</b> nobody knew Google could see.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spec strip */}
      <section style={{ background: "#f5f5f0", padding: "clamp(56px,8vh,80px) 24px 0" }}>
        <div
          className="mx-auto max-w-[1000px] grid gap-8 min-[601px]:grid-cols-4"
          style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "34px 0" }}
          data-reveal
        >
          {spec.map((s) => (
            <div key={s.k}>
              <div style={{ ...mono, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#0a7c5c", marginBottom: 9 }}>
                {s.k}
              </div>
              <p style={{ fontSize: "15.5px", lineHeight: 1.5, color: "#374151" }}>{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The brief */}
      <section style={{ background: "#f5f5f0", padding: "clamp(70px,10vh,100px) 24px" }}>
        <div className="mx-auto max-w-[680px]">
          <div data-reveal>
            <SectionLabel>The brief we were given</SectionLabel>
            <h2 style={{ fontSize: "clamp(28px,3.6vw,40px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#0d0d0d", margin: "16px 0 32px", maxWidth: "19ch" }}>
              Impressions are falling. Fix the content.
            </h2>
          </div>
          <div className="space-y-5" style={{ fontSize: "17px", lineHeight: 1.7, color: "#374151" }}>
            <p data-reveal style={{ fontSize: "18px", color: "#6b7280", margin: 0 }}>
              That was the read going in, and it was reasonable. Impressions had
              climbed steadily from December through March, then dropped. The
              obvious conclusion is that something is wrong with the content.
            </p>
            <p data-reveal style={{ margin: 0 }}>
              The content was fine. Six months of consistent publishing, a sensible
              category structure, dedicated pages for every vertical the product
              serves. Most companies at this stage have none of that.
            </p>
            <p data-reveal style={{ margin: 0 }}>
              What the data showed instead was a site that had earned significant
              search visibility and then lost almost all of it at the last step.
              Google was showing these pages to people. People were reading the
              titles and choosing something else.
            </p>
            <p data-reveal style={{ margin: 0 }}>
              That is a different problem with a much faster fix, and it is
              invisible unless you go page by page.
            </p>
          </div>
        </div>
      </section>

      {/* Findings */}
      <section style={{ background: "#f9fafb", padding: "clamp(80px,12vh,110px) 24px" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="max-w-[680px]" data-reveal>
            <SectionLabel>Four findings</SectionLabel>
            <h2 style={{ fontSize: "clamp(28px,3.6vw,40px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#0d0d0d", margin: "16px 0 0" }}>
              What six days in Search Console surfaced
            </h2>
          </div>

          <div className="mt-12">
            {findings.map((f) => (
              <div
                key={f.n}
                data-reveal
                className="grid gap-x-8 gap-y-3 py-9 min-[721px]:grid-cols-[70px_1fr]"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <div style={{ ...mono, fontSize: "12px", fontWeight: 600, letterSpacing: "0.09em", color: "#0a7c5c", paddingTop: 6 }}>
                  {f.n}
                </div>
                <div>
                  <h3 style={{ fontSize: "23px", fontWeight: 600, lineHeight: 1.28, letterSpacing: "-0.01em", color: "#0d0d0d", margin: 0 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "#6b7280", margin: "13px 0 0", maxWidth: "62ch" }}>
                    {f.body}
                  </p>
                  <div
                    style={{
                      ...mono,
                      display: "inline-block",
                      marginTop: 16,
                      background: "#e6f4ef",
                      borderLeft: "2px solid #064e3b",
                      padding: "10px 15px",
                      fontSize: "12.5px",
                      lineHeight: 1.6,
                      color: "#0b5a44",
                      maxWidth: "58ch",
                    }}
                  >
                    {f.cost}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section style={{ background: "#064e3b", padding: "clamp(70px,10vh,100px) 24px" }}>
        <div className="mx-auto max-w-[820px]" data-reveal>
          <div className="mb-8">
            <Spark size={16} color="#7fd1b4" />
          </div>
          <blockquote style={{ fontSize: "clamp(25px,3.5vw,38px)", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.015em", color: "#ffffff", margin: 0, maxWidth: "22ch" }}>
            Ranking and being chosen are two different problems. Only one of them
            needs more content.
          </blockquote>
          <div style={{ ...mono, fontSize: "12px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.58)", marginTop: 28 }}>
            Audit note, day two
          </div>
        </div>
      </section>

      {/* Method */}
      <section style={{ background: "#f5f5f0", padding: "clamp(80px,12vh,110px) 24px" }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="max-w-[680px]" data-reveal>
            <SectionLabel>Method</SectionLabel>
            <h2 style={{ fontSize: "clamp(28px,3.6vw,40px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#0d0d0d", margin: "16px 0 0" }}>
              How the audit was run
            </h2>
          </div>
          <div className="mt-10" style={{ borderTop: "1px solid #e5e7eb" }}>
            {method.map((m) => (
              <div
                key={m.k}
                data-reveal
                className="grid gap-x-8 gap-y-2 py-6 min-[721px]:grid-cols-[190px_1fr]"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <div style={{ ...mono, fontSize: "12px", letterSpacing: "0.09em", textTransform: "uppercase", color: "#064e3b", fontWeight: 500, paddingTop: 3 }}>
                  {m.k}
                </div>
                <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "#6b7280", margin: 0, maxWidth: "58ch" }}>
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section style={{ background: "#f5f5f0", padding: "0 24px clamp(80px,12vh,110px)" }}>
        <div className="mx-auto max-w-[680px]">
          <div data-reveal>
            <SectionLabel>What was built</SectionLabel>
            <h2 style={{ fontSize: "clamp(28px,3.6vw,40px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#0d0d0d", margin: "16px 0 0", maxWidth: "18ch" }}>
              From diagnosis to a delivery plan
            </h2>
            <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#6b7280", margin: "16px 0 0" }}>
              The audit set the priority order. Fastest return first, compounding
              work second.
            </p>
          </div>

          <div className="mt-10 grid gap-x-12 min-[601px]:grid-cols-2" style={{ borderTop: "1px solid #e5e7eb" }} data-reveal>
            {deliverables.map((d) => (
              <div key={d} className="flex items-baseline gap-3.5" style={{ padding: "18px 0", borderBottom: "1px solid #eceeec", fontSize: "16px", color: "#374151" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#064e3b", flexShrink: 0, transform: "translateY(-3px)" }} />
                {d}
              </div>
            ))}
          </div>

          <div
            data-reveal
            style={{ marginTop: 44, background: "#f5f5f0", border: "1px solid #e5e7eb", borderLeft: "2px solid #064e3b", padding: "26px 30px" }}
          >
            <div style={{ ...mono, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#0a7c5c", marginBottom: 12 }}>
              On results
            </div>
            <p style={{ fontSize: "15.5px", lineHeight: 1.7, color: "#6b7280", margin: 0, maxWidth: "62ch" }}>
              The on-page changes went live in late July. Click-through movement
              typically appears ten to fourteen days after Google re-crawls, and
              new articles take six to eight weeks to rank. This page documents the
              diagnosis and the plan, not an outcome. When there is performance
              data worth showing, it will be added here.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#f9fafb", padding: "clamp(78px,11vh,96px) 24px" }}>
        <div className="mx-auto max-w-[1000px]" data-reveal>
          <h2 style={{ fontSize: "clamp(27px,3.6vw,38px)", fontWeight: 600, lineHeight: 1.18, letterSpacing: "-0.02em", color: "#0d0d0d", margin: 0, maxWidth: "18ch" }}>
            Most sites have a version of this sitting in their Search Console.
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#6b7280", margin: "18px 0 32px", maxWidth: "52ch" }}>
            Impressions that never convert, pages that should not be indexed,
            traffic that only arrives when someone already knows your name.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-8 py-[16px] text-white no-underline transition-colors hover:bg-[#0a7c5c]"
            style={{ ...mono, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: "13px", background: "#064e3b" }}
          >
            <Spark size={12} color="#ffffff" />
            Request an audit
          </Link>
        </div>
      </section>
    </>
  );
}
