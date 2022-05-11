"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompanyController = exports.createCompanyUseCase = void 0;
const PostgresCompaniesRepository_1 = require("../../../repositories/implementations/CompanyImplementations/PostgresCompaniesRepository");
const CreateCompanyUseCase_1 = require("./CreateCompanyUseCase");
const CreateCompanyController_1 = require("./CreateCompanyController");
const postgresCompaniesRepository = new PostgresCompaniesRepository_1.PostgresCompaniesRepository();
const createCompanyUseCase = new CreateCompanyUseCase_1.CreateCompanyUseCase(postgresCompaniesRepository);
exports.createCompanyUseCase = createCompanyUseCase;
const createCompanyController = new CreateCompanyController_1.CreateCompanyController(createCompanyUseCase);
exports.createCompanyController = createCompanyController;