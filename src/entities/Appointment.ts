import { Appointment } from '@prisma/client';

export class AppointmentEntity implements Appointment{

  constructor(props: Omit<Appointment,'id'|'createdAt'|'updatedAt' >) {
    Object.assign(this,props);
  }
  appointmentDate: Date;
  id: number;
  appointmentTime: Date;
  appointmentTimeEnd: Date;
  employeeId: number;
  createdAt: Date;
  updatedAt: Date;


}