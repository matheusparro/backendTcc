import { PostgresAppointmentRepository } from "../../../repositories/implementations/AppointmentImplementations/PostgresAppointmentRepository";
import { FindLastAppointmentByUserUseCase} from "./FindLastAppointmentByUserUseCase";
import { FindLastAppointmentByUserController } from "./FindLastAppointmentByUserController";

const postgresAppointmentRepository = new PostgresAppointmentRepository()
const findLastAppointmentByUserUseCase = new FindLastAppointmentByUserUseCase(
  postgresAppointmentRepository
)

const findLastAppointmentByUserController = new FindLastAppointmentByUserController(
  findLastAppointmentByUserUseCase
)

export { findLastAppointmentByUserUseCase, findLastAppointmentByUserController }