import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

afterAll(async () => {
  await client.$disconnect();
});

it("Create Company with user", async () => {
  // ACT
  const company = await client.company.create({
    data: {
      cnpj:"teste",
      fantasyName:"teste",

    },
  });

  // ASSERT
  expect(company.cnpj).toBeTruthy();
});

