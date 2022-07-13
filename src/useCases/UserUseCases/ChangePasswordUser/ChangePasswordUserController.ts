import { hash } from "bcrypt";
import { Request, Response } from "express";
import { UserEntity } from "../../../entities/User";
import { ChangePasswordUserUseCase } from "./ChangePasswordUserUseCase";

export class ChangePasswordUserController {
  constructor(
    private changePasswordUserUseCase: ChangePasswordUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {id} = request.params
      const {oldPassword,newPassword} = request.body;
    try {
   
      await this.changePasswordUserUseCase.execute(parseInt(id),oldPassword,newPassword)
  
      return response.status(201).send();  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Erro inesperado.'
      })
    }
  }
}