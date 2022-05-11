"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanyController = void 0;
class CreateCompanyController {
    constructor(createCompanyUseCase) {
        this.createCompanyUseCase = createCompanyUseCase;
    }
    async handle(request, response) {
        const userId = parseInt(request.params.id);
        const { cnpj, fantasyName, email, isAdmin, password } = request.body;
        try {
            const companyCreated = await this.createCompanyUseCase.execute({
                cnpj,
                fantasyName,
                email,
                isAdmin,
                password
            });
            return response.status(201).json(companyCreated);
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.CreateCompanyController = CreateCompanyController;
