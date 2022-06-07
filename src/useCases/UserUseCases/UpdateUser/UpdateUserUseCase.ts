import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
import { IUserDTO } from "../IUserDTO";
import { UserEntity } from "../../../entities/User";
import { hash } from "bcrypt";

export class UpdateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id:number,email:string,avatar:string,permissionsID:number) {
    // const userAlreadyExists = await this.usersRepository.findByEmail(email);

    // if (userAlreadyExists) {
    //   throw new Error('E-mail alredy used.');
    // }
  


    const userCreated = await this.usersRepository.update(id,email,avatar,permissionsID);

    if (!userCreated){
      throw new Error('User not updated.');
    }

  }
}