import { Request, Response } from "express";
import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
import { IAppointmentConfigurationUpdate } from "../interface";
import { UpdateAppointmentConfigurationUseCase } from "./UpdateAppointmentConfigurationUseCase";

export class UpdateAppointmentConfigurationController {
  constructor(
    private updateAppointmentConfigurationUseCase: UpdateAppointmentConfigurationUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { startTime, startTimeEnd, endTime, endTimeEnd,name } = request.body;
    const { id } = request.params

    try {
      const appointmentConfigurationEntityCreated:IAppointmentConfigurationUpdate ={
        name,
        endTime:new Date(endTime),
        endTimeEnd:new Date(endTimeEnd),
        startTime:new Date(startTime),
        startTimeEnd:new Date(startTimeEnd),
        
      }
      await this.updateAppointmentConfigurationUseCase.execute(parseInt(id),appointmentConfigurationEntityCreated)

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}