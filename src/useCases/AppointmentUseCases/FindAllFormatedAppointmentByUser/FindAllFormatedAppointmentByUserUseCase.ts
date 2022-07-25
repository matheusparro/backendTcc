import { IAppointmentRepository } from "../../../repositories/implementations/AppointmentImplementations/IAppointmentRepository";


export class FindAllFormatedAppointmentByUserUseCase {
  constructor(

    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(employeeId: number,firstDate:string,lastDate:string) {
    try {
      const appointmentsFoudend= await this.appointmentRepository.findAllFormated(employeeId,firstDate,lastDate);

      if (!appointmentsFoudend){
        throw new Error('Appointments not found.');
      }
      return appointmentsFoudend 
    } catch (error) {
      throw new Error(error)
    }
   
 
  }
}