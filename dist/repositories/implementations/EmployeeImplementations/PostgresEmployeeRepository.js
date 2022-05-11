"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresCompaniesRepository = void 0;
const client_1 = require("@prisma/client");
class PostgresCompaniesRepository {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    async save(employee, userId) {
        try {
            const result = await this.prisma.$transaction(async (prisma) => {
                const employeeCreated = await prisma.employee.create({
                    data: employee
                });
                const userUpdated = await prisma.user.update({
                    where: { id: userId },
                    data: {
                        employeeId: employeeCreated.id
                    }
                });
                return employeeCreated;
            });
            return result;
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
exports.PostgresCompaniesRepository = PostgresCompaniesRepository;
