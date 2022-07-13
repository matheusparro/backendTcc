import { PostgresUsersRepository } from "../../../repositories/implementations/UserImplementations/PostgresUsersRepository";
import { ChangePasswordUserUseCase } from "./ChangePasswordUserUseCase";
import { ChangePasswordUserController } from "./ChangePasswordUserController";

const postgresUsersRepository = new PostgresUsersRepository()

const changePasswordUserUseCase = new ChangePasswordUserUseCase(
  postgresUsersRepository,
)

const changePasswordUserController = new ChangePasswordUserController(
  changePasswordUserUseCase
)

export { changePasswordUserUseCase, changePasswordUserController }