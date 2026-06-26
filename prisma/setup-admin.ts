/**
 * One-off: wipe all demo data and create the real admin account.
 * Run with:  npx tsx prisma/setup-admin.ts
 * Prints a temporary password — the admin changes it on first login.
 */
import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "work.vanshikaa@gmail.com";
const ADMIN_NAME = "Vanshika";

function randomPassword(length = 14): string {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  let out = "";
  for (const n of arr) out += chars[n % chars.length];
  return out;
}

async function main() {
  console.log("⚠️  Wiping all existing CMS data…");
  await prisma.prospect.deleteMany();
  await prisma.task.deleteMany();
  await prisma.note.deleteMany();
  await prisma.deliverable.deleteMany();
  await prisma.internClientAccess.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  const password = randomPassword();
  await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      passwordHash: await bcrypt.hash(password, 10),
      name: ADMIN_NAME,
      initials: "V",
      role: "admin",
      subtitle: "Founder · Admin",
    },
  });

  console.log("\n✅ Clean slate. Real admin created:");
  console.log("   Email:    " + ADMIN_EMAIL);
  console.log("   Password: " + password + "   (change it after first login)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
