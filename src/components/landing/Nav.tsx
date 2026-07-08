import { siteConfig } from "@/config/site";

const links = [
  { href: "#services", label: "Services" },
  { href: "#results", label: "Results" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
        borderBottom: "1px solid #eef0ee",
      }}
    >
      <div className="mx-auto flex h-[68px] max-w-[1080px] items-center justify-between gap-6 px-6">
        <a
          href="#top"
          className="text-[16px] font-semibold tracking-[-0.01em] no-underline"
          style={{ color: "#0d0d0d" }}
        >
          {siteConfig.name}
        </a>

        <div className="hidden items-center gap-9 min-[761px]:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] font-medium no-underline transition-colors"
              style={{ color: "#6b7280" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener"
          className="whitespace-nowrap rounded-full px-[18px] py-2.5 text-[14px] font-medium text-white no-underline"
          style={{ background: "#064e3b" }}
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
