import { IAppointmentRepository } from "./IAppointmentRepository";
import { PrismaClient } from "@prisma/client";
import { AppointmentEntity } from "../../../entities/Appointment";
import fs from 'fs'
import path from "path";
export class PostgresAppointmentRepository implements IAppointmentRepository {
  constructor(
    private prisma = new PrismaClient(),
  ) { }
  async save(appointmentEntity: AppointmentEntity,faceToAnalize:Express.Multer.File): Promise<AppointmentEntity> {
    try {
      const userFoundByEmployee = await this.prisma.employee.findFirst({
        where:{
          id:appointmentEntity.employeeId
        },
        include:{
          user:true
        }
      })
      
      if(!userFoundByEmployee){
        throw new Error("Employee user not found")
      }
      const directoryPath = path.join('../../../../', userFoundByEmployee.user.Avatar);
      const teste = fs.readFile(directoryPath,(item)=> {
        return item
      })
      const appointmentConfigurationCreated = await this.prisma.appointment.create({
        data:appointmentEntity
      })
      return appointmentConfigurationCreated
    } catch (error) {
      return error.message
    }
  }
}



