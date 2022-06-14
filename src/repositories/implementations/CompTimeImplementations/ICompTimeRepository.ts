import { CompTimeEntity } from "../../../entities/CompTime";

export interface ICompTimeRepository  {

  save(extraHoursCompTime:number,hoursWorked:number,employeeId:number): Promise<CompTimeEntity>;
  calculateCompTimeHours(employeeId:number):Promise<void>;
calculateMonthHoursWorked(employeeId:number):Promise<any>
}