import { hash } from "bcrypt";
import { Request, Response } from "express";
import { UserEntity } from "../../../entities/User";
import { ForgotPasswordUserUseCase } from "./ForgotPasswordUserUseCase";

export class ForgotPasswordController {
  constructor(
    private forgotPasswordUserUseCase: ForgotPasswordUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {email} = request.body

    try {
   
      await this.forgotPasswordUserUseCase.execute(email)
  
      return response.status(201).send();  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Erro inesperado.'
      })
    }
  }
}