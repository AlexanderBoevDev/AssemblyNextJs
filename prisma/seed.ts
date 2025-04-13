import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin-password", 10);

  await prisma.user.upsert({
    where: { email: "admin@admin.ru" },
    update: {},
    create: {
      email: "admin@admin.ru",
      password: hashedPassword,
      role: "ADMIN"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
