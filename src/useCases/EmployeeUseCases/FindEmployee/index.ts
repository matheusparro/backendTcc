import { PostgresCompaniesRepository } from "../../../repositories/implementations/EmployeeImplementations/PostgresEmployeeRepository";
import { PostgresUsersRepository } from "../../../repositories/implementations/UserImplementations/PostgresUsersRepository";
import { FindEmployeeUseCase } from "./FindEmployeeUseCase";
import { FindEmployeeController } from "./FindEmployeeController";

const postgresCompaniesRepository = new PostgresCompaniesRepository()
const postgresUsersRepository = new PostgresUsersRepository()
const findEmployeeUseCase = new FindEmployeeUseCase(
  postgresCompaniesRepository,
)

const findEmployeeController = new FindEmployeeController(
  findEmployeeUseCase
)

export { findEmployeeUseCase, findEmployeeController }