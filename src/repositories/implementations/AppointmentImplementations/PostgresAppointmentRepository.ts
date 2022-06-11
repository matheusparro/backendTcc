import { IAppointmentRepository } from "./IAppointmentRepository";
import { PrismaClient } from "@prisma/client";
import { AppointmentEntity } from "../../../entities/Appointment";
import fs from 'fs';
import path from "path";
import axios from 'axios'
import  FormData  from 'form-data'
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

        const image = path.join(__dirname, `../../../../${userFoundByEmployee.user.Avatar}`)
        const fileFounded = fs.createReadStream(image)
        const formdata = new FormData()
        const formatedFounded = userFoundByEmployee.user.Avatar.split("\\")[1]
        formdata.append('file', fileFounded, formatedFounded);

        formdata.append('file2', faceToAnalize.buffer, { filename: faceToAnalize.originalname })
        //formdata.append('file2', faceToAnalize);
        let res = null
        try {
           res = await axios.post('http://localhost:3000/upload', formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          
        } catch (error) {
          throw new Error(res.data.error) 
        }
       
       
        if(!res.data.isEqualFaces){
          throw new Error("Face not match")
        }
        const appointmentOpen = await this.prisma.appointment.findFirst({
          where:{
              appointmentTimeEnd:null,
              appointmentDate: new Date(appointmentEntity.appointmentDate)
          }
          
        })
        if (appointmentOpen){
          const appointmentClosed = await this.prisma.appointment.update({
            where:{
              id:appointmentOpen.id
            },
            data:{
              appointmentTimeEnd:new Date(appointmentEntity.appointmentTime)
            }
          })
          return appointmentClosed
        }
        appointmentEntity.appointmentTimeEnd= undefined
        const appointmentConfigurationCreated = await this.prisma.appointment.create({
          data:appointmentEntity
        })
        return appointmentConfigurationCreated
        
     
    
    } catch (error) {
     throw new Error(error.message)
    }
  }
}



