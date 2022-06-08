import { PostgresCompaniesRepository } from "../../../repositories/implementations/EmployeeImplementations/PostgresEmployeeRepository";
import { PostgresAppointmentConfigurationRepository } from "../../../repositories/implementations/AppointmentConfigurationImplementations/PostgresAppointmentConfigurationRepository";
import { UpdateAppointmentConfigurationUseCase } from "./UpdateAppointmentConfigurationUseCase";
import { UpdateAppointmentConfigurationController } from "./UpdateAppointmentConfigurationController";

const postgresAppointmentConfigurationRepository = new PostgresAppointmentConfigurationRepository()
const updateAppointmentConfigurationUseCase = new UpdateAppointmentConfigurationUseCase(
  postgresAppointmentConfigurationRepository
)

const updateAppointmentConfigurationController = new UpdateAppointmentConfigurationController(
  updateAppointmentConfigurationUseCase
)

export { updateAppointmentConfigurationUseCase, updateAppointmentConfigurationController }