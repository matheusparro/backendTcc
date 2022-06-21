import { CompTimeEntity } from "../../../entities/CompTime";

export interface ICompTimeRepository  {

  save(extraHoursCompTime:number,hoursWorked:number,missingHoursWorked:number,employeeId:number): Promise<CompTimeEntity>;
  calculateCompTimeHours():Promise<void>;
  calculateMonthHoursWorked(employeeId:number):Promise<any>
  find(employeeId:number):Promise<CompTimeEntity>;
}