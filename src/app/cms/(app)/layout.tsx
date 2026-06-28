import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import type { Role } from "@/lib/constants";
import Sidebar from "@/components/cms/Sidebar";
import CmsHeader from "@/components/cms/CmsHeader";

// Run these functions in Singapore, next to the Supabase database.
export const preferredRegion = "sin1";

export default async function CmsAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/cms/login");

  const role = user.role as Role;

  return (
    <div
      className="flex h-screen w-full overflow-hidden bg-[#f4f6f5] text-[#0f1f1a]"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <Sidebar
        role={role}
        userName={user.name}
        userSubtitle={user.subtitle ?? ""}
        userInitials={user.initials}
      />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <CmsHeader role={role} />
        <div className="flex-1 overflow-y-auto px-[30px] pb-[44px] pt-7">
          {children}
        </div>
      </main>
    </div>
  );
}
