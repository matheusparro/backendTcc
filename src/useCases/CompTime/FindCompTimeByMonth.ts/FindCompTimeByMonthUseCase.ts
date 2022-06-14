import { DepartmentEntity } from "../../../entities/Department";
import { ICompTimeRepository } from "../../../repositories/implementations/CompTimeImplementations/ICompTimeRepository";

export class FindCompTimeByMonthUseCase {
  constructor(
    private departmentRepository: ICompTimeRepository,
  ) {}

  async execute(employeeId:number) {
  
    const monthsFounded = await this.departmentRepository.calculateMonthHoursWorked(employeeId)
    if(monthsFounded) {
      return monthsFounded
    }
   
  }
}