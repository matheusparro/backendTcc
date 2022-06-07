import { PostgresCompaniesRepository } from "../../../repositories/implementations/EmployeeImplementations/PostgresEmployeeRepository";
import { PostgresAppointmentConfigurationRepository } from "../../../repositories/implementations/AppointmentConfigurationImplementations/PostgresAppointmentConfigurationRepository";
import { FindAllAppointmentConfigurationUseCase } from "./FindAllAppointmentConfigurationUseCase";
import { FindAllAppointmentConfigurationController } from "./FindAllAppointmentConfigurationController";

const postgresAppointmentConfigurationRepository = new PostgresAppointmentConfigurationRepository()
const findAllAppointmentConfigurationUseCase = new FindAllAppointmentConfigurationUseCase(
  postgresAppointmentConfigurationRepository
)

const findAllAppointmentConfigurationController = new FindAllAppointmentConfigurationController(
  findAllAppointmentConfigurationUseCase
)

export { findAllAppointmentConfigurationUseCase, findAllAppointmentConfigurationController }