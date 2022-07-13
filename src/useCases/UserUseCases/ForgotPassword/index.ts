import { PostgresUsersRepository } from "../../../repositories/implementations/UserImplementations/PostgresUsersRepository";
import { ForgotPasswordUserUseCase } from "./ForgotPasswordUserUseCase";
import { ForgotPasswordController } from "./ForgotPasswordController";

const postgresUsersRepository = new PostgresUsersRepository()

const forgotPasswordUserUseCase = new ForgotPasswordUserUseCase(
  postgresUsersRepository,
)

const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUserUseCase
)

export { forgotPasswordUserUseCase, forgotPasswordController }