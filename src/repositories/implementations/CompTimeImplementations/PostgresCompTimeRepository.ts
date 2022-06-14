import moment from "moment";
import { CompTimeEntity } from "../../../entities/CompTime";
import { client } from "../../../prisma/client";
import { ICompTimeRepository } from "./ICompTimeRepository";

export class PostgresCompTimeRepository implements ICompTimeRepository {
  async save(extraHoursWorked:number,hoursWorked:number,employeeId:number): Promise<CompTimeEntity> {

  
    try {
      const departmentCreated = await client.compTime.create({
        data:{
          employeeId,
          extraHoursWorked,
          hoursWorked
        }
      })
      return departmentCreated
    } catch (error) {
      throw new Error("Falha ao criar Banco de Horas")
    }
  
  }
  async calculateMonthHoursWorked(employeeId:number):Promise<any>{
    const startOfMonth = moment().startOf('year').set({hour:0,minute:0,second:0,millisecond:0}).format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = moment().endOf('year').set({hour:23,minute:59,second:59,millisecond:59}).format('YYYY-MM-DD HH:mm:ss');
    const compTimes = await client.compTime.findMany({
      where:{
        employeeId,

        createdAt:{
          gte:new Date(startOfMonth),
          lte:new Date(endOfMonth),
        },
        
      },
      orderBy:{
        createdAt:'asc'
      }
    
    })

    const yearWorked = [0,0,0,0,0,0,0,0,0,0,0,0]
    if(compTimes){
      let actualMonth = moment(startOfMonth).month()
      let totalMonth = 0
      compTimes.map((itemComp)=>{
        if(moment(itemComp.createdAt).month() != actualMonth){
          if(totalMonth > 0){
            yearWorked[actualMonth]=totalMonth
          }
          totalMonth = 0;
          actualMonth = moment(itemComp.createdAt).month()
        
         
        }
        totalMonth+=itemComp.hoursWorked
      })
      if(totalMonth > 0){
        yearWorked[actualMonth]=totalMonth
        totalMonth = 0;
      }
    }
    return yearWorked
  
  }
  
  async calculateCompTimeHours(): Promise<void> {
    try {
      const startOfMonth = moment().subtract(4,'days').set({hour:0,minute:0,second:0,millisecond:0}).format('YYYY-MM-DD HH:mm:ss');
      const endOfMonth = moment().subtract(4,'days').set({hour:23,minute:59,second:59,millisecond:59}).format('YYYY-MM-DD HH:mm:ss');

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
      
      
      if(employeesFounded ){
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
            let extraHoursWorked = totalHoursWorked - hoursWorkDay
            let hoursWorked = totalHoursWorked
            await this.save(extraHoursWorked,hoursWorked,employee.id)
          }
        }
      }
    } catch (error) {
     throw new Error(error.message)
    }
  }


}


