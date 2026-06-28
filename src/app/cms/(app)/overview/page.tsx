import Link from "next/link";
import { requireRole } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { istMonthContext, headlinePct } from "@/lib/daily";

export default async function OverviewPage() {
  await requireRole("admin");
  const ctx = istMonthContext();

  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      deliverables: true,
      prospects: true,
      dailyActivities: {
        include: { logs: { where: { date: { startsWith: ctx.prefix } } } },
      },
    },
  });

  const head = (c: (typeof clients)[number]) =>
    headlinePct(c.deliverables, c.dailyActivities, ctx.todayDay);

  const allProspects = clients.flatMap((c) => c.prospects);
  const replies = allProspects.filter((p) => p.status === "Reply Received").length;
  const meets = allProspects.filter((p) => p.status === "Meet Booked").length;
  const avg = clients.length
    ? Math.round(
        clients.reduce((a, c) => a + head(c).pct, 0) / clients.length,
      )
    : 0;

  const kpis = [
    { label: "Active Clients", value: String(clients.length), sub: "All retainers current" },
    { label: "Avg. Completion", value: avg + "%", sub: "Across all accounts" },
    { label: "Connections Sent", value: String(allProspects.length), sub: "This month" },
    { label: "Replies / Meetings", value: `${replies} / ${meets}`, sub: "Received / booked" },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-[13px] border border-[#e6eae8] bg-white px-[18px] pb-4 pt-[18px]"
          >
            <div className="text-[12px] font-medium text-[#71807a]">{k.label}</div>
            <div className="mt-2 text-[30px] font-bold tracking-[-1px] text-[#064e3b]">
              {k.value}
            </div>
            <div className="mt-1 text-[11.5px] text-[#71807a]">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="mb-3.5 mt-[30px] flex items-center justify-between">
        <div className="text-[15px] font-semibold">Active Clients</div>
        <div className="text-[12.5px] text-[#71807a]">
          {clients.length} accounts · monthly deliverables
        </div>
      </div>

      <div className="overflow-hidden rounded-[13px] border border-[#e6eae8] bg-white">
        <div className="grid grid-cols-[2fr_1.4fr_2.6fr_1fr] gap-3 border-b border-[#e6eae8] bg-[#f8faf9] px-5 py-[13px] text-[11px] font-semibold uppercase tracking-[0.4px] text-[#71807a]">
          <div>Client</div>
          <div>Service</div>
          <div>Monthly Progress</div>
          <div className="text-right">Replies</div>
        </div>
        {clients.map((c) => {
          const h = head(c);
          const pct = h.pct;
          const done = c.deliverables.filter((d) => d.status === "Done").length;
          const progressLabel =
            h.mode === "daily"
              ? "daily tracking"
              : `${done} of ${c.deliverables.length} done`;
          const rep = c.prospects.filter((p) => p.status === "Reply Received").length;
          return (
            <Link
              key={c.id}
              href={`/cms/client/${c.id}`}
              className="grid cursor-pointer grid-cols-[2fr_1.4fr_2.6fr_1fr] items-center gap-3 border-b border-[#eef2f0] px-5 py-[15px] no-underline text-[#0f1f1a] last:border-b-0 hover:bg-[#fafbfb]"
            >
              <div className="flex items-center gap-[11px]">
                <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[8px] bg-[#ecf3f0] text-[13px] font-semibold text-[#064e3b]">
                  {c.initials}
                </div>
                <div className="text-[13.5px] font-semibold">{c.name}</div>
              </div>
              <div className="text-[12.5px] text-[#4a5752]">{c.service}</div>
              <div>
                <div className="mb-[5px] flex justify-between text-[11.5px] text-[#71807a]">
                  <span>{progressLabel}</span>
                  <span className="font-semibold text-[#064e3b]">{pct}%</span>
                </div>
                <div className="h-[7px] overflow-hidden rounded-[5px] bg-[#eef2f0]">
                  <div
                    className="h-full rounded-[5px] bg-[#064e3b]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <div className="text-right text-[12.5px] text-[#4a5752]">
                <span className="font-semibold text-[#0f1f1a]">{rep}</span> replies
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
