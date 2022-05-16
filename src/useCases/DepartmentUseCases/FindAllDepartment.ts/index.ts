import { PostgresDepartmentRepository } from "../../../repositories/implementations/DepartmentImplementations/PostgresDepartmentRepository";
import { FindAllDepartmentUseCase } from "./FindAllDepartmentUseCase";
import { FindAllDepartmentController } from "./FindAllDepartmentController";

const postgresDepartmentRepository = new PostgresDepartmentRepository()

const findAllDepartmentUseCase = new FindAllDepartmentUseCase(
  postgresDepartmentRepository,
)

const findAllDepartmentController = new FindAllDepartmentController(
  findAllDepartmentUseCase
)

export { findAllDepartmentUseCase, findAllDepartmentController }