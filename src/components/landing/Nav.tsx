import { siteConfig } from "@/config/site";

const links = [
  { href: "#services", label: "Services" },
  { href: "#results", label: "Results" },
  { href: "#how", label: "How it works" },
];

export default function Nav() {
  return (
    <nav
      data-nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        color: "#ffffff",
        background: "transparent",
        borderBottom: "1px solid transparent",
        transition: "background .3s ease, color .3s ease, border-color .3s ease",
      }}
    >
      <div className="mx-auto flex h-[74px] max-w-[1120px] items-center justify-between gap-6 px-6">
        <a
          href="#top"
          className="text-[17px] font-bold tracking-[-0.02em] no-underline"
          style={{ color: "inherit" }}
        >
          {siteConfig.name}
        </a>

        <div className="hidden items-center gap-9 min-[761px]:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium no-underline opacity-80 transition-opacity hover:opacity-100"
              style={{ color: "inherit" }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          data-nav-cta
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener"
          className="whitespace-nowrap rounded-full px-[19px] py-2.5 text-[14px] font-semibold no-underline transition-colors"
          style={{ background: "#ffffff", color: "#064e3b" }}
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
