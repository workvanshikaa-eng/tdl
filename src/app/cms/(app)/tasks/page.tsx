import { requireRole } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import MyTasksList from "@/components/cms/MyTasksList";

export default async function TasksPage() {
  const user = await requireRole("intern");

  const tasks = await prisma.task.findMany({
    where: { internId: user.id },
    orderBy: { createdAt: "asc" },
    include: { client: { select: { name: true } } },
  });

  const kpis = [
    { label: "Assigned Tasks", value: String(tasks.length) },
    {
      label: "In Progress",
      value: String(tasks.filter((t) => t.status === "In Progress").length),
    },
    {
      label: "Completed",
      value: String(tasks.filter((t) => t.status === "Done").length),
    },
  ];

  const dto = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    clientName: t.client?.name ?? "Personal",
    due: t.due,
    status: t.status,
  }));

  return (
    <div>
      <div className="mb-6 grid grid-cols-3 gap-4 max-[700px]:grid-cols-1">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-[13px] border border-[#e6eae8] bg-white px-[18px] py-4"
          >
            <div className="text-[12px] font-medium text-[#71807a]">{k.label}</div>
            <div className="mt-1.5 text-[27px] font-bold tracking-[-1px] text-[#064e3b]">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-3 text-[15px] font-semibold">My Tasks</div>
      <MyTasksList tasks={dto} />
      <div className="mt-2 text-[11.5px] text-[#9aa3a0]">
        Click a status to advance it. Tasks are assigned by your admin.
      </div>
    </div>
  );
}
