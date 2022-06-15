import { DepartmentEntity } from "../../../entities/Department";
import { ICompTimeRepository } from "../../../repositories/implementations/CompTimeImplementations/ICompTimeRepository";

export class FindCompTimeByMonthUseCase {
  constructor(
    private compTimeRepository: ICompTimeRepository,
  ) {}

  async execute(employeeId:number) {
  
    const monthsFounded = await this.compTimeRepository.calculateMonthHoursWorked(employeeId)
    if(monthsFounded) {
      return monthsFounded
    }
   
  }
}