import { IEmployeeRepository } from "../../../repositories/implementations/EmployeeImplementations/IEmployeeRepository";


export class FindEmployeeUseCase {
  constructor(
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(id: number) {
   
  

    const employeeFounded = await this.employeeRepository.findEmployee(id);

    if (!employeeFounded){
      throw new Error('Employee not found.');
    }
    return employeeFounded

  }
}