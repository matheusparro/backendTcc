import { PostgresCompTimeRepository } from "../../../repositories/implementations/CompTimeImplementations/PostgresCompTimeRepository";
import { FindCompTimeUseCase } from "./FindCompTimeUseCase";
import { FindCompTimeController } from "./FindCompTimeController";

const postgresCompTimeRepository = new PostgresCompTimeRepository()

const findCompTimeUseCase = new FindCompTimeUseCase(
  postgresCompTimeRepository,
)

const findCompTimeController = new FindCompTimeController(
  findCompTimeUseCase
)

export { findCompTimeUseCase, findCompTimeController }