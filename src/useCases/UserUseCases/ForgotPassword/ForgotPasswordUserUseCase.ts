import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IUserDTO } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";
import { hash } from "bcrypt";

export class ForgotPasswordUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(email:string) {


    try {
      const userFind = await this.usersRepository.findByEmail(email);

      if (!userFind) {
        throw new Error('E-mail não cadastrado.');
      }
      const changePassword = await this.usersRepository.forgotPassword(email);
      if(changePassword){
        throw new Error('Não foi alterar a senha do usuário.');
      }
    } catch (error) {
      throw  error
    }
  }
}