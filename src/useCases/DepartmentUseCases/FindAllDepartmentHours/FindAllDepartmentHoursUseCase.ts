import { DepartmentEntity } from "../../../entities/Department";
import { IDepartmentRepository } from "../../../repositories/implementations/DepartmentImplementations/IDepartmentRepository";

export class FindAllDepartmentHoursUseCase {
  constructor(
    private departmentRepository: IDepartmentRepository,
  ) {}

  async execute(companyId) {
  
    const departmentsFouded = await this.departmentRepository.findAllHours(companyId)
   
    if(!departmentsFouded) return new Error("Não foi possível encontrar departamentos nessa Empresa")
    return departmentsFouded
  }
}