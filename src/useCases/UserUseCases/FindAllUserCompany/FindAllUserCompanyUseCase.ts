import { CompanyEntity } from "../../../entities/Company";
import { UserEntity } from "../../../entities/User";
import { ICompanyRepository } from "../../../repositories/implementations/CompanyImplementations/ICompanyRepository";
import { IUsersRepository } from "../../../repositories/implementations/UserImplementations/IUsersRepository";
export class FindAllUserCompanyUseCase {
  constructor(
    private companyRepository: ICompanyRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(companyId: number,departmentId?:number) {
  
    const companyFound = await this.companyRepository.find(companyId)
    if (!companyFound){
      throw new Error('Company not found')
    }
    const usersFound = await this.usersRepository.findAll(companyId,departmentId)
    if(!usersFound) throw new Error('Users not found')
    return usersFound
   
  }
}