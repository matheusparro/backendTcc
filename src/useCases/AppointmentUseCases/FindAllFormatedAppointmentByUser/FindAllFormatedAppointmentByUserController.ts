import { Request, Response } from "express";
import { AppointmentEntity } from "../../../entities/Appointment";
import { FindAllFormatedAppointmentByUserUseCase } from "./FindAllFormatedAppointmentByUserUseCase";

export class FindAllFormatedAppointmentByUserController {
  constructor(
    private findAllFormatedAppointmentByUserUseCase: FindAllFormatedAppointmentByUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
   
    const {employeeId} = request.params
   
    try {
      
      const appointments = await this.findAllFormatedAppointmentByUserUseCase.execute(parseInt(employeeId))
      return response.status(201).send(appointments);  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}