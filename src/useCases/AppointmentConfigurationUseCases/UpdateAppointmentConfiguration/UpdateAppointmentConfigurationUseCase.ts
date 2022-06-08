import { IAppointmentConfigurationRepository } from "../../../repositories/implementations/AppointmentConfigurationImplementations/IAppointmentConfigurationRepository";
import { IAppointmentConfigurationUpdate } from "../interface";

export class UpdateAppointmentConfigurationUseCase {
  constructor(
    private appointmentConfigurationRepository: IAppointmentConfigurationRepository
  ) {}

  async execute(id:number,data: IAppointmentConfigurationUpdate) {
  
  
    const appointmentConfiguration = await this.appointmentConfigurationRepository.update(id,data);

    if (!appointmentConfiguration){
      throw new Error('Appointment Configuration not created.');
    }

  }
}