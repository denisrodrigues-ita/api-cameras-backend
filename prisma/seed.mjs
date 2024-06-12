import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const costumers = await prisma.customer.count();

  if (costumers > 0) {
    console.log("Database already seeded, skipping seed process");
    return;
  }

  await prisma.customer.createMany({
    data: [
      { name: "Dave Grohl" },
      { name: "Van Halen" },
      { name: "Eddie Vedder" },
      { name: "Chris Cornell" },
      { name: "Axl Rose" },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding complete");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
