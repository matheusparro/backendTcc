"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresCompaniesRepository = void 0;
const client_1 = require("@prisma/client");
const client_2 = require("../../../prisma/client");
class PostgresCompaniesRepository {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    async save(company, user) {
        try {
            const prisma = new client_1.PrismaClient();
            const result = await prisma.$transaction(async (prisma) => {
                const companyCreated = await prisma.company.create({
                    data: {
                        cnpj: company.cnpj,
                        fantasyName: company.fantasyName,
                    }
                });
                const createPermissionAdmin = await prisma.permissions.create({
                    data: { name: "admin", description: 'Admin', companyId: companyCreated.id },
                });
                const createManyPermissions = await prisma.permissions.createMany({
                    data: [
                        { name: "manager", description: 'Gerente', companyId: companyCreated.id },
                        { name: "employer", description: 'Funcionário', companyId: companyCreated.id },
                    ],
                    skipDuplicates: true, // Skip 'Bobo'
                });
                const userCreated = await prisma.user.create({
                    data: {
                        password: user.password,
                        email: user.email,
                        Avatar: user.Avatar,
                        companyId: companyCreated.id,
                        permissionsID: createPermissionAdmin.id,
                    }
                });
                return companyCreated;
            });
            return result;
        }
        catch (error) {
            return null;
        }
    }
    async find(id) {
        try {
            const company = await client_2.client.company.findUnique({
                where: {
                    id
                }
            });
            return company;
        }
        catch (error) {
            return null;
        }
    }
}
exports.PostgresCompaniesRepository = PostgresCompaniesRepository;
