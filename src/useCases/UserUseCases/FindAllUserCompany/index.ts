import { PostgresCompaniesRepository } from "../../../repositories/implementations/CompanyImplementations/PostgresCompaniesRepository";
import { PostgresUsersRepository } from "../../../repositories/implementations/UserImplementations/PostgresUsersRepository";
import { FindAllUserCompanyUseCase } from "./FindAllUserCompanyUseCase";
import { FindAllUserCompanyController } from "./FindAllUserCompanyController";

const postgresCompaniesRepository = new PostgresCompaniesRepository()
const postgresUsersRepository = new PostgresUsersRepository()
const findAllUserCompanyUseCase = new FindAllUserCompanyUseCase(
  postgresCompaniesRepository,postgresUsersRepository
)

const findAllUserCompanyController = new FindAllUserCompanyController(
  findAllUserCompanyUseCase
)

export { findAllUserCompanyUseCase, findAllUserCompanyController }