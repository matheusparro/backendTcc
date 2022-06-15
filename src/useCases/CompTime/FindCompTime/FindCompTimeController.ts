import { Request, Response } from "express";
import { FindCompTimeUseCase } from "./FindCompTimeUseCase";

export class FindCompTimeController {
  constructor(
    private findCompTimeUseCase: FindCompTimeUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { employeeId } = request.params;
    
    
    try {
      const comptimeFounded = await this.findCompTimeUseCase.execute(parseInt(employeeId))
  
      return response.status(201).json(comptimeFounded);
    } catch (err) {
      return response.status(404).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}