import { prisma } from "@/lib/prisma";
import LoginForm, { type DemoAccount } from "./LoginForm";

export const metadata = {
  title: "Sign in",
};

// Render per-request (never prerendered at build), so it doesn't touch the
// database during `next build`.
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  // Build the demo-login list from the database. If the DB is unreachable,
  // the login form still renders (without the demo shortcuts).
  let demoAccounts: DemoAccount[] = [];
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      select: { email: true, role: true },
    });
    const rank: Record<string, number> = { admin: 0, intern: 1, client: 2 };
    demoAccounts = users
      .map((u) => ({
        email: u.email,
        tag: u.role.charAt(0).toUpperCase() + u.role.slice(1),
        rank: rank[u.role] ?? 9,
      }))
      .sort((a, b) => a.rank - b.rank)
      .map(({ email, tag }) => ({ email, tag }));
  } catch {
    demoAccounts = [];
  }

  return (
    <div
      className="relative flex h-screen w-full items-center justify-center"
      style={{ background: "#064e3b", fontFamily: "var(--font-inter), sans-serif" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 80% -10%, rgba(255,255,255,0.06), transparent)",
        }}
      />
      <LoginForm demoAccounts={demoAccounts} />
    </div>
  );
}
