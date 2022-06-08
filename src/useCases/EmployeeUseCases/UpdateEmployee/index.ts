import { PostgresCompaniesRepository } from "../../../repositories/implementations/EmployeeImplementations/PostgresEmployeeRepository";
import { PostgresUsersRepository } from "../../../repositories/implementations/UserImplementations/PostgresUsersRepository";
import { UpdateEmployeeUseCase } from "./UpdateEmployeeUseCase";
import { UpdateEmployeeController } from "./UpdateEmployeeController";

const postgresCompaniesRepository = new PostgresCompaniesRepository()
const postgresUsersRepository = new PostgresUsersRepository()
const updateEmployeeUseCase = new UpdateEmployeeUseCase(
  postgresUsersRepository,postgresCompaniesRepository,
)

const updateEmployeeController = new UpdateEmployeeController(
  updateEmployeeUseCase
)

export { updateEmployeeUseCase, updateEmployeeController }