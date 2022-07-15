import { Request, Response } from "express";
import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
import { FindOneAppointmentConfigurationUseCase } from "./FindOneAppointmentConfigurationUseCase";

export class FindOneConfigurationController {
  constructor(
    private findOneAppointmentConfigurationUseCase: FindOneAppointmentConfigurationUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id} = request.params;

    try {
      
     
     const founded = await this.findOneAppointmentConfigurationUseCase.execute(parseInt(id))

      return response.status(201).json(founded);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}