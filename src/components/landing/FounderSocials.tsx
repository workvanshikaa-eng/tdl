import { siteConfig } from "@/config/site";

const links = [
  { label: "LinkedIn", href: siteConfig.founderSocials.linkedinUrl },
  { label: "Instagram", href: siteConfig.founderSocials.instagramUrl },
  { label: "X", href: siteConfig.founderSocials.twitterUrl },
];

/** Row of the founder's personal social links. */
export default function FounderSocials({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-5 ${className}`}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener"
          className="no-underline transition-colors hover:text-[#064e3b]"
          style={{
            fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontSize: "11px",
            color: "#6b7280",
          }}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
