import { Request, Response } from "express";
import { AppointmentEntity } from "../../../entities/Appointment";
import { CreateAppointmentUseCase } from "./CreateAppointmentUseCase";

export class CreateAppointmentController {
  constructor(
    private createAppointmentUseCase: CreateAppointmentUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
   
    const {
    employeeId,
    appointmentTime} = request.body
    const faceToAnalize = request.file
    try {
      const appointmentCreated = new AppointmentEntity({
       employeeId:parseInt(employeeId),
       appointmentTime:new Date(appointmentTime),
      })
      await this.createAppointmentUseCase.execute(appointmentCreated,faceToAnalize)
  
      return response.status(201).send();  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}