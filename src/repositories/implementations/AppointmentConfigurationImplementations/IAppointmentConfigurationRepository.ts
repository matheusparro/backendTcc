import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
import { IAppointmentConfigurationUpdate } from "../../../useCases/AppointmentConfigurationUseCases/interface";
export interface IAppointmentConfigurationRepository  {
  save(appointmentConfigurationEntity: AppointmentConfigurationEntity): Promise<AppointmentConfigurationEntity>;
  findAll(companyId: number): Promise<AppointmentConfigurationEntity[]>;
  update( id:number,data:IAppointmentConfigurationUpdate):Promise<AppointmentConfigurationEntity>;
}