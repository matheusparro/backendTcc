"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepartmentController = void 0;
class CreateDepartmentController {
    constructor(createDepartmentUseCase) {
        this.createDepartmentUseCase = createDepartmentUseCase;
    }
    async handle(request, response) {
        const { companyId } = request.params;
        const { name } = request.body;
        if (!companyId)
            return response.status(404).send("Empresa inválida");
        if (!name)
            return response.status(404).send("Nome do departamento inválido");
        try {
            const departmentCreated = await this.createDepartmentUseCase.execute(parseInt(companyId), name);
            return response.status(201).json(departmentCreated);
        }
        catch (err) {
            return response.status(404).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.CreateDepartmentController = CreateDepartmentController;
