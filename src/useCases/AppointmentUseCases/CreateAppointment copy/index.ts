import { PostgresAppointmentRepository } from "../../../repositories/implementations/AppointmentImplementations/PostgresAppointmentRepository";
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase";
import { CreateAppointmentControllerteste } from "./CreateAppointmentControllerteste";

const postgresAppointmentRepository = new PostgresAppointmentRepository()
const createAppointmentUseCase = new CreateAppointmentUseCase(
  postgresAppointmentRepository
)

const createAppointmentControllerteste = new CreateAppointmentControllerteste(
  createAppointmentUseCase
)

export { createAppointmentUseCase, createAppointmentControllerteste }