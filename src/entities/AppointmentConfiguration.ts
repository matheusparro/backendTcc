import { AppointmentConfiguration } from '@prisma/client';

export class AppointmentConfigurationEntity implements AppointmentConfiguration{

  constructor(props: Omit<AppointmentConfiguration,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }
  id: number;
  name:string;
  startTime: Date;
  startTimeEnd: Date;
  endTime: Date;
  endTimeEnd: Date;
  companyId: number;
  createdAt: Date;
  updatedAt: Date;

}