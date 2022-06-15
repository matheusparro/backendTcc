import { Request, Response } from "express";
import { AppointmentEntity } from "../../../entities/Appointment";
import { FindLastAppointmentByUserUseCase } from "./FindLastAppointmentByUserUseCase";

export class FindLastAppointmentByUserController {
  constructor(
    private findLastAppointmentByUserUseCase: FindLastAppointmentByUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
   
    const {employeeId} = request.params
   
    try {
      
      const appointment = await this.findLastAppointmentByUserUseCase.execute(parseInt(employeeId))
      return response.status(201).send(appointment);  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}