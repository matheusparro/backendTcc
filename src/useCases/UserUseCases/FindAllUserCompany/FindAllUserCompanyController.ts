import { Request, Response } from "express";
import { FindAllUserCompanyUseCase } from "./FindAllUserCompanyUseCase";

export class FindAllUserCompanyController {
  constructor(
    private findAllUserCompanyUseCase: FindAllUserCompanyUseCase,
  ) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const {companyId} = request.params
    try {
      const companyFounded = await this.findAllUserCompanyUseCase.execute(parseInt(companyId))

      return response.status(201).json(companyFounded);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}