import { Request, Response } from "express";
import { FindCompTimeByMonthUseCase } from "./FindCompTimeByMonthUseCase";

export class FindCompTimeByMonthController {
  constructor(
    private findCompTimeByMonthUseCase: FindCompTimeByMonthUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { employeeId } = request.params;
    
    try {
      const monthsCalc = await this.findCompTimeByMonthUseCase.execute(parseInt(employeeId))
  
      return response.status(201).json(monthsCalc);
    } catch (err) {
      return response.status(404).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}