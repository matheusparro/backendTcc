import { EmployeeEntity } from "../../../entities/Employee";
import { IAppointmentConfigurationRepository } from "./IAppointmentConfigurationRepository";
import { PrismaClient } from "@prisma/client";
import { AppointmentConfigurationEntity } from "../../../entities/AppointmentConfiguration";
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
}


