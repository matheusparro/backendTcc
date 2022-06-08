import { IAppointmentConfigurationRepository } from "../../../repositories/implementations/AppointmentConfigurationImplementations/IAppointmentConfigurationRepository";

import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";

export class FindAllAppointmentConfigurationUseCase {
  constructor(
    private appointmentConfigurationRepository: IAppointmentConfigurationRepository
  ) {}

  async execute(companyId:number) {
  
  
    const appointmentConfiguration = await this.appointmentConfigurationRepository.findAll(companyId);

    if (!appointmentConfiguration){
      throw new Error('Appointment Configuration not created.');
    }
    return appointmentConfiguration

  }
}