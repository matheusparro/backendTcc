
import { ICompTimeRepository } from "../../../repositories/implementations/CompTimeImplementations/ICompTimeRepository";

export class FindCompTimeUseCase {
  constructor(
    private compTimeRepository: ICompTimeRepository,
  ) {}

  async execute(employeeId:number) {
  
    const comptimeFounded = await this.compTimeRepository.find(employeeId)
    if(comptimeFounded) {
      return comptimeFounded
    }
   
  }
}