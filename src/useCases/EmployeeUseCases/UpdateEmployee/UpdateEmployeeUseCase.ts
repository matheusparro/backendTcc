import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IEmployeeRepository } from "../../../repositories/implementations/EmployeeImplementations/IEmployeeRepository";

import { EmployeeEntity } from "../../../entities/Employee";

export class UpdateEmployeeUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(data: EmployeeEntity,id: number) {

    try {
      const employeeCreated = await this.employeeRepository.update(data,id);

      if (!employeeCreated){
        throw new Error('User not update.');
      }
      return employeeCreated
    } catch (error) {
      throw new Error('User not update.');
    }
  }
}