import { Request, Response } from "express";
import { EmployeeEntity } from "../../../entities/Employee";
import { FindEmployeeUseCase } from "./FindEmployeeUseCase";

export class FindEmployeeController {
  constructor(
    private findEmployeeUseCase: FindEmployeeUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {id } = request.params;

  
    try {
     
      const employeeFounded = await this.findEmployeeUseCase.execute(parseInt(id))
  
      return response.status(201).json(employeeFounded);  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}