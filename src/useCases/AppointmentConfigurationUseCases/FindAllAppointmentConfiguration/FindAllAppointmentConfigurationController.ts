import { Request, Response } from "express";
import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
import { FindAllAppointmentConfigurationUseCase } from "./FindAllAppointmentConfigurationUseCase";

export class FindAllAppointmentConfigurationController {
  constructor(
    private findAllAppointmentConfigurationUseCase: FindAllAppointmentConfigurationUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { startTime, startTimeEnd, endTime, endTimeEnd } = request.body;
    const { companyId } = request.params

    try {
      
     
     const founded = await this.findAllAppointmentConfigurationUseCase.execute(parseInt(companyId))

      return response.status(201).json(founded);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}