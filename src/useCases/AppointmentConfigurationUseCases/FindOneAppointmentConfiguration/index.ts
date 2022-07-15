import { PostgresCompaniesRepository } from "../../../repositories/implementations/EmployeeImplementations/PostgresEmployeeRepository";
import { PostgresAppointmentConfigurationRepository } from "../../../repositories/implementations/AppointmentConfigurationImplementations/PostgresAppointmentConfigurationRepository";
import { FindOneAppointmentConfigurationUseCase } from "./FindOneAppointmentConfigurationUseCase";
import { FindOneConfigurationController } from "./FindOneConfigurationController";

const postgresAppointmentConfigurationRepository = new PostgresAppointmentConfigurationRepository()
const findOneAppointmentConfigurationUseCase = new FindOneAppointmentConfigurationUseCase(
  postgresAppointmentConfigurationRepository
)

const findOneConfigurationController = new FindOneConfigurationController(
  findOneAppointmentConfigurationUseCase
)

export { findOneAppointmentConfigurationUseCase, findOneConfigurationController }