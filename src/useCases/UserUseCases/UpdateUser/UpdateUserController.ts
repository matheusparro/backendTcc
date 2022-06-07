import { hash } from "bcrypt";
import { Request, Response } from "express";
import { UserEntity } from "../../../entities/User";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {email,permissionsID} = request.body;
    const {id} = request.params
    try {
     
        
     const avatar = request.file ?request.file.path :null
      await this.updateUserUseCase.execute(parseInt(id),email,avatar,parseInt(permissionsID))
  
      return response.status(201).send();  
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}