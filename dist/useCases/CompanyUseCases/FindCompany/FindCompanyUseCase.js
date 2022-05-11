"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindCompanyUseCase = void 0;
class FindCompanyUseCase {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async execute(id) {
        const companyCreated = await this.companyRepository.find(id);
        if (!companyCreated) {
            throw new Error('Company not found');
        }
        return companyCreated;
    }
}
exports.FindCompanyUseCase = FindCompanyUseCase;
