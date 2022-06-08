import { PostgresDepartmentRepository } from "../../../repositories/implementations/DepartmentImplementations/PostgresDepartmentRepository";
import { UpdateDepartmentUseCase } from "./UpdateDepartmentUseCase";
import { UpdateDepartmentController } from "./UpdateDepartmentController";

const postgresUsersRepository = new PostgresDepartmentRepository()

const updateDepartmentUseCase = new UpdateDepartmentUseCase(
  postgresUsersRepository,
)

const updateDepartmentController = new UpdateDepartmentController(
  updateDepartmentUseCase
)

export { updateDepartmentUseCase, updateDepartmentController }