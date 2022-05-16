import { Request, Response } from "express";
import { FindAllDepartmentUseCase } from "./FindAllDepartmentUseCase";

export class FindAllDepartmentController {
  constructor(
    private findAllDepartmentUseCase: FindAllDepartmentUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.body;
    if(!companyId) return response.status(404).send("Empresa inválida")
    try {
      const departmentsFounded = await this.findAllDepartmentUseCase.execute(parseInt(companyId))
  
      return response.status(201).json(departmentsFounded);
    } catch (err) {
      return response.status(404).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}