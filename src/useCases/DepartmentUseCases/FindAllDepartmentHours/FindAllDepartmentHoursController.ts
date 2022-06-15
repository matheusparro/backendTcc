import { Request, Response } from "express";
import { FindAllDepartmentHoursUseCase } from "./FindAllDepartmentHoursUseCase";

export class FindAllDepartmentHoursController {
  constructor(
    private findAllDepartmentHoursUseCase: FindAllDepartmentHoursUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.params;
    if(!companyId) return response.status(404).send("Empresa inválida")
    try {
      const departmentsFounded = await this.findAllDepartmentHoursUseCase.execute(parseInt(companyId))
  
      return response.status(201).json(departmentsFounded);
    } catch (err) {
      return response.status(404).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}