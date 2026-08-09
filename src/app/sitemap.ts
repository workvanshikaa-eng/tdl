import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/config/site";

type Frequency = "weekly" | "monthly";

const pages: { path: string; file: string; changeFrequency: Frequency; priority: number }[] = [
  { path: "", file: "src/app/(marketing)/page.tsx", changeFrequency: "weekly", priority: 1 },
  { path: "/work", file: "src/app/(marketing)/work/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", file: "src/app/(marketing)/about/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", file: "src/app/(marketing)/services/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", file: "src/app/(marketing)/contact/page.tsx", changeFrequency: "monthly", priority: 0.7 },
];

/** Last edit date of a page's source file, falling back to build time. */
function lastModified(file: string): Date {
  try {
    return fs.statSync(path.join(process.cwd(), file)).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${siteConfig.url}${p.path}`,
    lastModified: lastModified(p.file),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
