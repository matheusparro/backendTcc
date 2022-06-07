import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
export interface IAppointmentConfigurationRepository  {
  save(appointmentConfigurationEntity: AppointmentConfigurationEntity): Promise<AppointmentConfigurationEntity>;
  findAll(companyId: number,): Promise<AppointmentConfigurationEntity[]>;
}