import { CompTime } from '@prisma/client';

export class CompTimeEntity implements CompTime{

  constructor(props: Omit<CompTime,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }
  employeeId: number;
  extraHoursWorked: number;
  id: number;
  hoursWorked: number;
  createdAt: Date;
  updatedAt: Date;
  missingHoursWorked: number;

}