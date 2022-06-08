import { Request, Response } from "express";
import { UpdateDepartmentUseCase } from "./UpdateDepartmentUseCase";

export class UpdateDepartmentController {
  constructor(
    private updateDepartmentUseCase: UpdateDepartmentUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;
    if(!id) return response.status(404).send("Forgot parameter id")
    if(!name) return response.status(404).send("Forgot name to update")
    try {
      const departmentUpdated = await this.updateDepartmentUseCase.execute(parseInt(id),name)
  
      return response.status(201).json(departmentUpdated);
    } catch (err) {
      return response.status(404).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}