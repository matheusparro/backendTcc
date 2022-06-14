import moment from "moment";
import { CompTimeEntity } from "../../../entities/CompTime";
import { client } from "../../../prisma/client";
import { ICompTimeRepository } from "./ICompTimeRepository";

export class PostgresCompTimeRepository implements ICompTimeRepository {
  async save(hoursWorked:number): Promise<CompTimeEntity> {

  
    try {
      const departmentCreated = await client.compTime.create({
        data:{
          hoursWorked: hoursWorked
        }
      })
      return departmentCreated
    } catch (error) {
      throw new Error("Falha ao criar Banco de Horas")
    }
  
  }
  
  async calculateCompTimeHours(): Promise<boolean> {
    try {
      const startOfMonth = moment().subtract(1,'days').set({hour:0,minute:0,second:0,millisecond:0}).format('YYYY-MM-DD HH:mm:ss');
      const nDate = new Date(startOfMonth).toLocaleString('pt-BR');
      const endOfMonth = moment().subtract(1,'days').set({hour:23,minute:59,second:59,millisecond:59}).format('YYYY-MM-DD HH:mm:ss');
      const date = new Date(startOfMonth)
      const teste = new Date(startOfMonth).toLocaleDateString()
      const employeesFounded = await client.employee.findMany({
        include:{
          appointment:{
            where:{
              appointmentDate:{
                gte:new Date(startOfMonth),
                lte:new Date(endOfMonth),
              },
              appointmentTimeEnd:{
                not:null
              }
            }
          },
          appointmentConfiguration:true,
  
        }
      })
      
      
  
      for (const employee of employeesFounded) {
        if(employee.appointment.length > 0){
          const nowStart = moment(employee.appointmentConfiguration.startTime); //todays date
          const nowStartEnd = moment(employee.appointmentConfiguration.startTimeEnd); // another date
          const durationStart = moment.duration(nowStartEnd.diff(nowStart));
          const difHoursStart = durationStart.asHours();
      
          const endStart = moment(employee.appointmentConfiguration.endTime); //todays date
          const endStartEnd = moment(employee.appointmentConfiguration.endTimeEnd); // another date
          const durationEnd = moment.duration(endStartEnd.diff(endStart));
          const difHoursEnd = durationEnd.asHours();
          const hoursWorkDay = difHoursStart+difHoursEnd
      
          //HORAS CALCULAAS DE TRABALHO NO DIA
          let totalHoursWorked = 0
          employee.appointment.map((item)=>{
            const nowStart = moment(item.appointmentTime); //todays date
            const nowStartEnd = moment(item.appointmentTimeEnd); // another date
            const durationStart = moment.duration(nowStartEnd.diff(nowStart));
            const difHoursStart = durationStart.asHours();
        
          totalHoursWorked += difHoursStart
        
          })
          let hoursCompTime = totalHoursWorked - hoursWorkDay
         
          await this.save(hoursCompTime)
          return true
        }
      }
    } catch (error) {
     throw new Error(error.message)
    }
  }


}


