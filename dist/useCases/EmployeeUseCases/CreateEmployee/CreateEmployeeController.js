"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeController = void 0;
const Employee_1 = require("../../../entities/Employee");
class CreateEmployeeController {
    constructor(createEmployeeUseCase) {
        this.createEmployeeUseCase = createEmployeeUseCase;
    }
    async handle(request, response) {
        const { name, cpf, pis, departmentId, appointmentConfigurationId, userId } = request.body;
        try {
            const employeeCreated = new Employee_1.EmployeeEntity({
                appointmentConfigurationId,
                cpf,
                departmentId,
                name,
                pis
            });
            await this.createEmployeeUseCase.execute(employeeCreated, parseInt(userId));
            return response.status(201).send();
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.CreateEmployeeController = CreateEmployeeController;
