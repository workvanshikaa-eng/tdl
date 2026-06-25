import { siteConfig } from "@/config/site";
import { LogoMark } from "./icons";

const links = [
  { href: "#services", label: "Services" },
  { href: "#how", label: "How it works" },
  { href: "#about", label: "About" },
  { href: "#proof", label: "Proof" },
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
        color: "#064e3b",
        background: "transparent",
        borderBottom: "1px solid transparent",
        transition: "background .3s ease, color .3s ease, border-color .3s ease",
      }}
    >
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-6 px-7">
        <a
          href="#top"
          className="flex items-center gap-2.5 no-underline"
          style={{ color: "inherit" }}
        >
          <LogoMark />
          <span className="text-[16px] font-extrabold tracking-[-0.02em]">
            {siteConfig.name}
          </span>
        </a>

        <div className="hidden items-center gap-[30px] min-[761px]:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-semibold no-underline opacity-85 transition-opacity hover:opacity-100"
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
          className="whitespace-nowrap rounded-full border border-[#064e3b] bg-[#064e3b] px-[18px] py-2.5 text-[14px] font-bold text-white no-underline transition-colors"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
