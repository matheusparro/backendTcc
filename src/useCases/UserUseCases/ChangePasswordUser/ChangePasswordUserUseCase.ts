import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IUserDTO } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";
import { hash } from "bcrypt";

export class ChangePasswordUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: number, password: string, newPassword: string) {


    try {
      const userCreated = await this.usersRepository.changePassword(id, password, newPassword);

      if (!userCreated) {
        throw new Error('Não foi possível alterar a senha.');
      }
    } catch (error) {
      return error
    }
  }
}