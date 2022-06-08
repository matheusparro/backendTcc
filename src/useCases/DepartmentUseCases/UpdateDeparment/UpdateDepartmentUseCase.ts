import { DepartmentEntity } from "../../../entities/Department";
import { IDepartmentRepository } from "../../../repositories/implementations/DepartmentImplementations/IDepartmentRepository";

export class UpdateDepartmentUseCase {
  constructor(
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute(id: number,name:string) {
   

    const departmentUpdated = await this.departmentRepository.update(id,name)
   
    if(!departmentUpdated) return new Error("Não foi possível atualizar o departamento")
    return departmentUpdated
  }
}