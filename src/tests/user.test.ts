import { PrismaClient } from "@prisma/client";
import { PostgresUsersRepository} from '../repositories/implementations/UserImplementations/PostgresUsersRepository'
const client = new PrismaClient();

afterAll(async () => {
  await client.$disconnect();
});


it("Delete User", async () => {
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

