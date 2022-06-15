import { PostgresDepartmentRepository } from "../../../repositories/implementations/DepartmentImplementations/PostgresDepartmentRepository";
import { FindAllDepartmentHoursUseCase } from "./FindAllDepartmentHoursUseCase";
import { FindAllDepartmentHoursController } from "./FindAllDepartmentHoursController";

const postgresDepartmentRepository = new PostgresDepartmentRepository()

const findAllDepartmentHoursUseCase = new FindAllDepartmentHoursUseCase(
  postgresDepartmentRepository,
)

const findAllDepartmentHoursController = new FindAllDepartmentHoursController(
  findAllDepartmentHoursUseCase
)

export { findAllDepartmentHoursUseCase, findAllDepartmentHoursController }