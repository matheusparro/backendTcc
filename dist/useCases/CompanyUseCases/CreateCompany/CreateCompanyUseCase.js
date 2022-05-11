"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanyUseCase = void 0;
const bcrypt_1 = require("bcrypt");
const Company_1 = require("../../../entities/Company");
const User_1 = require("../../../entities/User");
class CreateCompanyUseCase {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async execute(data) {
        const newCompany = new Company_1.CompanyEntity({
            cnpj: data.cnpj,
            fantasyName: data.fantasyName,
        });
        const newUser = new User_1.UserEntity({
            email: data.email,
            password: await (0, bcrypt_1.hash)(data.password, 8),
            companyId: null,
            Avatar: null,
            permissionsID: null,
            employeeId: null,
            faceId: null,
        });
        const companyCreated = await this.companyRepository.save(newCompany, newUser);
        if (!companyCreated) {
            throw new Error('Company not created');
        }
        return companyCreated;
    }
}
exports.CreateCompanyUseCase = CreateCompanyUseCase;
