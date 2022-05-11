"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindCompanyController = void 0;
class FindCompanyController {
    constructor(findCompanyUseCase) {
        this.findCompanyUseCase = findCompanyUseCase;
    }
    async handle(request, response) {
        const id = parseInt(request.params.id);
        try {
            const companyFounded = await this.findCompanyUseCase.execute(id);
            return response.status(201).json(companyFounded);
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.FindCompanyController = FindCompanyController;
