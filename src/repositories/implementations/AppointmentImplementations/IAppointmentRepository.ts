import { AppointmentEntity } from "../../../entities/Appointment";
export interface IAppointmentRepository  {
  save(appointmentEntity: AppointmentEntity,faceToAnalize:Express.Multer.File): Promise<AppointmentEntity>;
  findLastAppointment(employeeId:number):Promise<AppointmentEntity>;
  findAllFormated(employeeId:number):Promise<any>;
  updateAppointmentCompTime(id:number,appointmentEntity: AppointmentEntity): Promise<AppointmentEntity>;
}