"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepartmentUseCase = void 0;
const Department_1 = require("../../../entities/Department");
class CreateDepartmentUseCase {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async execute(companyId, name) {
        const department = new Department_1.DepartmentEntity({
            companyId,
            name
        });
        const departmentCreated = await this.departmentRepository.save(department);
        if (!departmentCreated)
            return new Error("I rapaz");
        return departmentCreated;
    }
}
exports.CreateDepartmentUseCase = CreateDepartmentUseCase;
