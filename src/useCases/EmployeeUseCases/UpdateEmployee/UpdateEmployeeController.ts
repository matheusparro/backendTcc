import { Request, Response } from "express";
import { EmployeeEntity } from "../../../entities/Employee";
import { UpdateEmployeeUseCase } from "./UpdateEmployeeUseCase";

export class UpdateEmployeeController {
  constructor(
    private updateEmployeeUseCase: UpdateEmployeeUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, pis ,departmentId,appointmentConfigurationId} = request.body;
    const {id} = request.params

  
    try {
      const employeeCreated = new EmployeeEntity({
       appointmentConfigurationId:parseInt(appointmentConfigurationId),
       cpf,
       departmentId:parseInt(departmentId),
       name,
       pis
      })
     const employeeUpdated =  await this.updateEmployeeUseCase.execute(employeeCreated,parseInt(id))
  
      return response.status(201).json(employeeUpdated);  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}