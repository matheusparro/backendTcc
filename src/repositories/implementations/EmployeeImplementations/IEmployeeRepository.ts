import { EmployeeEntity } from "../../../entities/Employee";
export interface IEmployeeRepository  {
  save(employee: EmployeeEntity,userId:number): Promise<EmployeeEntity>;
  findEmployee(id:number): Promise<EmployeeEntity>;
  update(data: EmployeeEntity,id: number): Promise<EmployeeEntity>;
}