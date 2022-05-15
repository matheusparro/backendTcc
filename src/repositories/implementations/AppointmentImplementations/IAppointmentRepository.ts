import { AppointmentEntity } from "../../../entities/Appointment";
export interface IAppointmentRepository  {
  save(appointmentEntity: AppointmentEntity,faceToAnalize:Express.Multer.File): Promise<AppointmentEntity>;
}