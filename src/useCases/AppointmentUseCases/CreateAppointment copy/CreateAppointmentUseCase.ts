import { IAppointmentRepository } from "../../../repositories/implementations/AppointmentImplementations/IAppointmentRepository";

import { AppointmentEntity } from "../../../entities/Appointment";

export class CreateAppointmentUseCase {
  constructor(

    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(id:number,data: AppointmentEntity) {
    try {
      const appointmentCreated = await this.appointmentRepository.updateAppointmentCompTime(id,data);

      if (!appointmentCreated){
        throw new Error('Appointment not updated.');
      }
      return appointmentCreated 
    } catch (error) {
      throw new Error('Appointment not updated.');
    }
   
 
  }
}