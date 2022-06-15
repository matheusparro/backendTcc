import { EmployeeEntity } from "../../../entities/Employee";
import { IAppointmentConfigurationRepository } from "./IAppointmentConfigurationRepository";
import { PrismaClient } from "@prisma/client";
import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
import { IAppointmentConfigurationUpdate } from "../../../useCases/AppointmentConfigurationUseCases/interface";
export class PostgresAppointmentConfigurationRepository implements IAppointmentConfigurationRepository {
  constructor(
    private prisma = new PrismaClient(),
  ) { }

  async findAll(companyId: number): Promise<AppointmentConfigurationEntity[]> {
    
    const appointmentsConfigurationFounded =  await this.prisma.appointmentConfiguration.findMany({
      where:{
        companyId
      }
    })
    return appointmentsConfigurationFounded
  }
  async save(appointmentConfigurationEntity: AppointmentConfigurationEntity): Promise<AppointmentConfigurationEntity> {
    try {
      const appointmentConfigurationCreated = await this.prisma.appointmentConfiguration.create({
        data:appointmentConfigurationEntity
      })
      return appointmentConfigurationCreated
    } catch (error) {
      return error.message
    }
   
  }

  async update(id:number,data:IAppointmentConfigurationUpdate): Promise<AppointmentConfigurationEntity> {
    try {
      const appointmentConfUpdated= await this.prisma.appointmentConfiguration.update({
        where:{
          id
        },
        data:{
          endTime:data.endTime,
          endTimeEnd:data.endTimeEnd,
          name: data.name,
          startTime: data.startTime,
          startTimeEnd: data.startTimeEnd,      
        }
      })

      return appointmentConfUpdated
    } catch (error) {
      throw new Error(error.message);
    }
  } 

}
