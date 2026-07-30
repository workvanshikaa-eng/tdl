import { siteConfig } from "@/config/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#ffffff",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between gap-6 px-6">
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
              className="text-[14px] font-medium no-underline"
              style={{ color: "#374151" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener"
          className="whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#0a7c5c]"
          style={{ background: "#064e3b", letterSpacing: "0.05em" }}
        >
          Start a Project
        </a>
      </div>
    </nav>
  );
}
