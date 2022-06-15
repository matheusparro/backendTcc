import { IAppointmentRepository } from "../../../repositories/implementations/AppointmentImplementations/IAppointmentRepository";

import { AppointmentEntity } from "../../../entities/Appointment";

export class FindLastAppointmentByUserUseCase {
  constructor(

    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(employeeId: number) {
    try {
      const appointmentCreated = await this.appointmentRepository.findLastAppointment(employeeId);

      if (!appointmentCreated){
        throw new Error('Appointment not found.');
      }
      return appointmentCreated 
    } catch (error) {
      throw new Error(error)
    }
   
 
  }
}