/**
 * Seed the CMS with the demo dataset from the design prototype.
 * Every account's password is `demo1234`.
 *
 * Run with:  npm run db:seed   (or `npx prisma db seed`)
 */
import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DEMO_PASSWORD = "demo1234";

// Helper: stagger timestamps so list ordering is deterministic.
const base = new Date("2026-06-22T09:00:00Z").getTime();
const asc = (i: number) => new Date(base + i * 60_000); // older → newer
const desc = (i: number) => new Date(base - i * 60_000); // newer → older

type DeliverableSeed = { name: string; due: string; status: string };
type NoteSeed = {
  author: string;
  initials: string;
  time: string;
  text: string;
};
type ClientSeed = {
  name: string;
  initials: string;
  email: string;
  service: string;
  tenure: string;
  deliverables: DeliverableSeed[];
  notes: NoteSeed[];
};

const clients: ClientSeed[] = [
  {
    name: "Northwind SaaS",
    initials: "NW",
    email: "northwind@portal.tdl.com",
    service: "LinkedIn Lead Gen",
    tenure: "Client since Jan 2026",
    deliverables: [
      { name: "Campaign strategy refresh", due: "Due Jun 5", status: "Done" },
      { name: "300 prospect list build", due: "Due Jun 8", status: "Done" },
      { name: "Connection sequence (wk 1-2)", due: "Due Jun 14", status: "In Progress" },
      { name: "Mid-month performance report", due: "Due Jun 20", status: "Not Started" },
      { name: "Reply handling & booking", due: "Ongoing", status: "In Progress" },
    ],
    notes: [
      { author: "Maya Chen", initials: "MC", time: "Jun 18", text: "Client wants to skew messaging toward RevOps titles next batch." },
      { author: "Dev Patel", initials: "DP", time: "Jun 16", text: "Reply rate up to 14% after subject line tweak." },
    ],
  },
  {
    name: "Atlas Robotics",
    initials: "AR",
    email: "atlas@portal.tdl.com",
    service: "SEO Retainer",
    tenure: "Client since Sep 2025",
    deliverables: [
      { name: "Keyword gap analysis", due: "Due Jun 4", status: "Done" },
      { name: "2x pillar articles", due: "Due Jun 12", status: "Done" },
      { name: "Technical audit fixes", due: "Due Jun 15", status: "Delayed" },
      { name: "Backlink outreach (10)", due: "Due Jun 22", status: "In Progress" },
      { name: "Monthly ranking report", due: "Due Jun 28", status: "Not Started" },
    ],
    notes: [
      { author: "Alex Kim", initials: "AK", time: "Jun 19", text: "Dev resource delay on audit fixes — flagged to client, new ETA Jun 24." },
    ],
  },
  {
    name: "Brightwave Health",
    initials: "BH",
    email: "brightwave@portal.tdl.com",
    service: "LinkedIn Lead Gen",
    tenure: "Client since Mar 2026",
    deliverables: [
      { name: "ICP & list build", due: "Due Jun 3", status: "Done" },
      { name: "Outreach copy v2", due: "Due Jun 9", status: "Done" },
      { name: "Connection sequence", due: "Due Jun 14", status: "Done" },
      { name: "Follow-up sequence", due: "Due Jun 21", status: "In Progress" },
      { name: "Performance report", due: "Due Jun 30", status: "Not Started" },
    ],
    notes: [
      { author: "Dev Patel", initials: "DP", time: "Jun 20", text: "2 meetings booked this week with Director-level prospects." },
    ],
  },
  {
    name: "Cedar Financial",
    initials: "CF",
    email: "cedar@portal.tdl.com",
    service: "SEO Retainer",
    tenure: "Client since Nov 2025",
    deliverables: [
      { name: "Content calendar", due: "Due Jun 2", status: "Done" },
      { name: "3x blog posts", due: "Due Jun 16", status: "In Progress" },
      { name: "On-page optimization", due: "Due Jun 18", status: "Not Started" },
      { name: "Monthly report", due: "Due Jun 30", status: "Not Started" },
    ],
    notes: [
      { author: "Alex Kim", initials: "AK", time: "Jun 15", text: "Awaiting client SME review on draft #2." },
    ],
  },
];

type InternSeed = {
  name: string;
  initials: string;
  email: string;
  canEdit: boolean;
  clients: string[]; // client names
  tasks: { title: string; client: string | null; due: string; status: string }[];
};

const interns: InternSeed[] = [
  {
    name: "Dev Patel",
    initials: "DP",
    email: "dev@thedistributionlab.com",
    canEdit: true,
    clients: ["Northwind SaaS", "Brightwave Health"],
    tasks: [
      { title: "Send wk-2 connection batch", client: "Northwind SaaS", due: "Jun 24", status: "In Progress" },
      { title: "Build follow-up list (50)", client: "Brightwave Health", due: "Jun 25", status: "Not Started" },
      { title: "Clean CRM duplicate records", client: null, due: "Jun 26", status: "Not Started" },
      { title: "Log replies & book meetings", client: "Northwind SaaS", due: "Ongoing", status: "In Progress" },
    ],
  },
  {
    name: "Alex Kim",
    initials: "AK",
    email: "alex@thedistributionlab.com",
    canEdit: false,
    clients: ["Atlas Robotics"],
    tasks: [
      { title: "Draft 2x pillar articles", client: "Atlas Robotics", due: "Jun 22", status: "Done" },
      { title: "Backlink prospect research", client: "Atlas Robotics", due: "Jun 24", status: "In Progress" },
      { title: "Weekly standup notes", client: null, due: "Jun 23", status: "Not Started" },
    ],
  },
];

type ProspectSeed = {
  client: string;
  channel: string;
  name: string;
  url: string;
  email: string;
  role: string;
  company: string;
  status: string;
  notes: string;
  date: string;
};

const prospects: ProspectSeed[] = [
  { client: "Northwind SaaS", channel: "linkedin", name: "Sarah Okafor", url: "https://linkedin.com/in/sarah-okafor", email: "", role: "VP Marketing", company: "Loom Systems", status: "Reply Received", notes: "Warm, wants deck", date: "Jun 20" },
  { client: "Northwind SaaS", channel: "linkedin", name: "James Liu", url: "https://linkedin.com/in/james-liu", email: "", role: "Head of Growth", company: "Parable", status: "Message 1 Sent", notes: "—", date: "Jun 19" },
  { client: "Brightwave Health", channel: "linkedin", name: "Priya Nair", url: "https://linkedin.com/in/priya-nair", email: "", role: "Director, Demand", company: "Vitality Co", status: "Meet Booked", notes: "Thu 2pm", date: "Jun 21" },
  { client: "Northwind SaaS", channel: "linkedin", name: "Tomás Reyes", url: "https://linkedin.com/in/tomas-reyes", email: "", role: "CMO", company: "Northstar", status: "Connection Accepted", notes: "—", date: "Jun 18" },
  { client: "Brightwave Health", channel: "linkedin", name: "Hannah Webb", url: "https://linkedin.com/in/hannah-webb", email: "", role: "RevOps Lead", company: "Clearway", status: "Follow-up 1 Sent", notes: "No reply yet", date: "Jun 17" },
  { client: "Northwind SaaS", channel: "linkedin", name: "Marcus Bell", url: "https://linkedin.com/in/marcus-bell", email: "", role: "VP Sales", company: "Tidemark", status: "Connection Request Sent", notes: "—", date: "Jun 22" },
  { client: "Brightwave Health", channel: "linkedin", name: "Elena Fischer", url: "https://linkedin.com/in/elena-fischer", email: "", role: "Marketing Dir.", company: "Aperture", status: "Not Interested", notes: "Using agency", date: "Jun 16" },
  { client: "Northwind SaaS", channel: "linkedin", name: "Kofi Mensah", url: "https://linkedin.com/in/kofi-mensah", email: "", role: "Founder", company: "Stacks", status: "Reply Received", notes: "Asked pricing", date: "Jun 21" },
  { client: "Northwind SaaS", channel: "email", name: "Dana Holt", url: "", email: "dana.holt@brightpath.io", role: "VP Marketing", company: "Brightpath", status: "Replied", notes: "Wants case study", date: "Jun 21" },
  { client: "Northwind SaaS", channel: "email", name: "Raj Anand", url: "", email: "raj@northstar.com", role: "Head of Demand", company: "Northstar", status: "Email 2 Sent", notes: "Opened 3x", date: "Jun 20" },
  { client: "Brightwave Health", channel: "email", name: "Lena Cole", url: "", email: "lena.cole@vitality.co", role: "Growth Lead", company: "Vitality Co", status: "Meeting Booked", notes: "Tue 11am", date: "Jun 22" },
  { client: "Brightwave Health", channel: "email", name: "Owen Pierce", url: "", email: "owen.p@clearway.com", role: "RevOps", company: "Clearway", status: "Email 1 Sent", notes: "—", date: "Jun 19" },
  { client: "Northwind SaaS", channel: "email", name: "Mara Voss", url: "", email: "mara@tidemark.com", role: "VP Sales", company: "Tidemark", status: "Bounced", notes: "Bad address", date: "Jun 18" },
  { client: "Brightwave Health", channel: "email", name: "Felix Wu", url: "", email: "felix.wu@aperture.com", role: "Marketing Dir.", company: "Aperture", status: "Email 3 Sent", notes: "No reply", date: "Jun 17" },
];

async function main() {
  console.log("🌱 Seeding The Distribution Lab CMS…");

  // Reset (dev only)
  await prisma.prospect.deleteMany();
  await prisma.task.deleteMany();
  await prisma.note.deleteMany();
  await prisma.deliverable.deleteMany();
  await prisma.internClientAccess.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  // Admin
  const admin = await prisma.user.create({
    data: {
      email: "maya@thedistributionlab.com",
      passwordHash,
      name: "Maya Chen",
      initials: "MC",
      role: "admin",
      subtitle: "Founder · Admin",
    },
  });

  // Clients (+ portal logins, deliverables, notes)
  const clientIdByName = new Map<string, string>();
  for (const c of clients) {
    const portalUser = await prisma.user.create({
      data: {
        email: c.email,
        passwordHash,
        name: c.name,
        initials: c.initials,
        role: "client",
        subtitle: "Client account",
      },
    });
    const created = await prisma.client.create({
      data: {
        name: c.name,
        initials: c.initials,
        service: c.service,
        tenure: c.tenure,
        portalUserId: portalUser.id,
        deliverables: {
          create: c.deliverables.map((d, i) => ({
            name: d.name,
            due: d.due,
            status: d.status,
            createdAt: asc(i),
          })),
        },
        notes: {
          create: c.notes.map((n, i) => ({
            authorName: n.author,
            authorInitials: n.initials,
            text: n.text,
            timeLabel: n.time,
            createdAt: desc(i),
          })),
        },
      },
    });
    clientIdByName.set(c.name, created.id);
  }

  // Interns (+ access + tasks)
  for (const it of interns) {
    const intern = await prisma.user.create({
      data: {
        email: it.email,
        passwordHash,
        name: it.name,
        initials: it.initials,
        role: "intern",
        subtitle: "Intern",
        canEdit: it.canEdit,
        internAccess: {
          create: it.clients.map((name) => ({
            clientId: clientIdByName.get(name)!,
          })),
        },
        tasks: {
          create: it.tasks.map((t, i) => ({
            title: t.title,
            clientId: t.client ? clientIdByName.get(t.client)! : null,
            due: t.due,
            status: t.status,
            createdAt: asc(i),
          })),
        },
      },
    });
    void intern;
  }

  // Prospects
  await prisma.prospect.createMany({
    data: prospects.map((p, i) => ({
      clientId: clientIdByName.get(p.client)!,
      channel: p.channel,
      name: p.name,
      url: p.url,
      email: p.email,
      role: p.role,
      company: p.company,
      status: p.status,
      notes: p.notes,
      dateLabel: p.date,
      createdAt: desc(i),
    })),
  });

  void admin;
  console.log("✅ Seed complete.");
  console.log("   Admin   → maya@thedistributionlab.com");
  console.log("   Interns → dev@thedistributionlab.com, alex@thedistributionlab.com");
  console.log("   Clients → northwind@/atlas@/brightwave@/cedar@portal.tdl.com");
  console.log("   Password (all): demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
