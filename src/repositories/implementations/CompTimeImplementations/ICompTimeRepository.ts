import { CompTimeEntity } from "../../../entities/CompTime";

export interface ICompTimeRepository  {

  save(hoursWorked:number): Promise<CompTimeEntity>;
  calculateCompTimeHours(employeeId:number):Promise<Boolean>;
}