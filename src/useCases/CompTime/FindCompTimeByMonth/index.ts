import { PostgresCompTimeRepository } from "../../../repositories/implementations/CompTimeImplementations/PostgresCompTimeRepository";
import { FindCompTimeByMonthUseCase } from "./FindCompTimeByMonthUseCase";
import { FindCompTimeByMonthController } from "./FindCompTimeByMonthController";

const postgresCompTimeRepository = new PostgresCompTimeRepository()

const findCompTimeByMonthUseCase = new FindCompTimeByMonthUseCase(
  postgresCompTimeRepository,
)

const findCompTimeByMonthController = new FindCompTimeByMonthController(
  findCompTimeByMonthUseCase
)

export { findCompTimeByMonthUseCase, findCompTimeByMonthController }