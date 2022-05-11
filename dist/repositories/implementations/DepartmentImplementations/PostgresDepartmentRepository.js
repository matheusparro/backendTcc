"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDepartmentRepository = void 0;
const client_1 = require("../../../prisma/client");
class PostgresDepartmentRepository {
    async save(department) {
        const departmentFounded = await client_1.client.department.findFirst({
            where: {
                companyId: department.companyId,
                name: department.name
            }
        });
        if (departmentFounded)
            throw new Error('Departamento já existe.');
        const departmentCreated = await client_1.client.department.create({
            data: department
        });
        return departmentCreated;
    }
}
exports.PostgresDepartmentRepository = PostgresDepartmentRepository;
