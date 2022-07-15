import { IAppointmentConfigurationRepository } from "../../../repositories/implementations/AppointmentConfigurationImplementations/IAppointmentConfigurationRepository";

import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";

export class FindOneAppointmentConfigurationUseCase {
  constructor(
    private appointmentConfigurationRepository: IAppointmentConfigurationRepository
  ) { }

  async execute(id: number) {

    try {
      const appointmentConfiguration = await this.appointmentConfigurationRepository.findOne(id);

      if (!appointmentConfiguration) {
        throw new Error('Appointment Configuration not find.');
      }
      return appointmentConfiguration


    } catch (error) {
      throw error
    }
  }
}