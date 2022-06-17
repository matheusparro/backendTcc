import { PostgresAppointmentRepository } from "../../../repositories/implementations/AppointmentImplementations/PostgresAppointmentRepository";
import { FindAllFormatedAppointmentByUserUseCase} from "./FindAllFormatedAppointmentByUserUseCase";
import { FindAllFormatedAppointmentByUserController } from "./FindAllFormatedAppointmentByUserController";

const postgresAppointmentRepository = new PostgresAppointmentRepository()
const findAllFormatedAppointmentByUserUseCase = new FindAllFormatedAppointmentByUserUseCase(
  postgresAppointmentRepository
)

const findAllFormatedAppointmentByUserController = new FindAllFormatedAppointmentByUserController(
  findAllFormatedAppointmentByUserUseCase
)

export { findAllFormatedAppointmentByUserUseCase, findAllFormatedAppointmentByUserController }