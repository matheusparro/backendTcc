import moment from "moment";
import { CompTimeEntity } from "../../../entities/CompTime";
import { client } from "../../../prisma/client";
import { ICompTimeRepository } from "./ICompTimeRepository";

export class PostgresCompTimeRepository implements ICompTimeRepository {
  
  async find(employeeId: number): Promise<CompTimeEntity> {
    const compFounded = await client.compTime.findUnique({
      where:{
        employeeId
      }
    })
    return compFounded
  }

  async save(extraHoursWorked:number,hoursWorked:number,missingHoursWorked:number,employeeId:number): Promise<CompTimeEntity> {
    try {
      const teste = await client.compTime.findUnique({ 
        where:{employeeId}
      })
      if(teste && teste.id){
        extraHoursWorked += teste.extraHoursWorked
        hoursWorked += teste.hoursWorked
        missingHoursWorked+= teste.missingHoursWorked
      }
      const compTime = await client.compTime.upsert({
        create: {
          extraHoursWorked,
          hoursWorked,
          missingHoursWorked,
          employeeId
        },
        update: {
          extraHoursWorked,
          hoursWorked,
          missingHoursWorked,
        },
        where: {
          employeeId
        }
      })
      return compTime
    } catch (error) {
      throw new Error("Falha ao criar Banco de Horas")
    }
  
  }
  async calculateMonthHoursWorked(employeeId:number):Promise<any>{
    const startOfMonth = moment().startOf('year').set({hour:0,minute:0,second:0,millisecond:0}).format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = moment().endOf('year').set({hour:23,minute:59,second:59,millisecond:59}).format('YYYY-MM-DD HH:mm:ss');
    const appointmentsFound = await client.appointment.findMany({
      where:{
        employeeId,

        appointmentTime:{
          gte:new Date(startOfMonth),
          
        },
        appointmentTimeEnd:{
         
          lte:new Date(endOfMonth),
        },
        
      },
      orderBy:{
        createdAt:'asc'
      }
    
    })

    const yearWorked = [0,0,0,0,0,0,0,0,0,0,0,0]
    if(appointmentsFound){
      let actualMonth = moment(startOfMonth).month()
      let totalMonth = 0.000000
      appointmentsFound.map((itemComp)=>{
        if(moment(itemComp.createdAt).month() != actualMonth){
          if(totalMonth >= 0){
            yearWorked[actualMonth]=totalMonth
          }
          totalMonth = 0;
          actualMonth = moment(itemComp.createdAt).month()
        }
        const nowStart = moment(itemComp.appointmentTime); //todays date
        const nowStartEnd = moment(itemComp.appointmentTimeEnd); // another date
        const durationStart = moment.duration(nowStartEnd.diff(nowStart));
        const difHoursStart = durationStart.asHours().toPrecision(4);
        totalMonth+=Number(difHoursStart)
      })
      if(totalMonth >= 0){
        yearWorked[actualMonth]=totalMonth
        totalMonth = 0;
      }
    }
    return yearWorked
  
  }
  
  async calculateCompTimeHours(): Promise<void> {
    try {
      const startOfMonth = moment().subtract(1,'days').set({hour:0,minute:0,second:0,millisecond:0}).format('YYYY-MM-DD HH:mm:ss');
      const endOfMonth = moment().subtract(1,'days').set({hour:23,minute:59,second:59,millisecond:59}).format('YYYY-MM-DD HH:mm:ss');
      //00:00 ->23:59
      let employeesFounded = await client.employee.findMany({
        include:{
          appointment:{
            where:{
              appointmentDate:{
                gte:new Date(startOfMonth),
                lte:new Date(endOfMonth),
              },
              // appointmentTimeEnd:{
              //   not:null
              // }
            }
          },
          appointmentConfiguration:true,
  
        }
      })
      if(employeesFounded ){
        for (const employee of employeesFounded) {
          if(!employee.appointment.length){
            await client.appointment.create({
              data:{
                appointmentDate:new Date(),
                appointmentTime:null,
                appointmentTimeEnd:null,
                employeeId:employee.id,
                
              }
            })
          }
        }
        
      }
       employeesFounded = await client.employee.findMany({
        include:{
          appointment:{
            where:{
              appointmentDate:{
                gte:new Date(startOfMonth),
                lte:new Date(endOfMonth),
              },
              // appointmentTimeEnd:{
              //   not:null
              // }
            }
          },
          appointmentConfiguration:true,
  
        }
      })
      
      if(employeesFounded ){
        for (const employee of employeesFounded) {
          if(employee.appointment){
            const nowStart = moment(employee.appointmentConfiguration.startTime,'HH:mm:ss a'); //todays date
            const nowStartEnd = moment(employee.appointmentConfiguration.startTimeEnd,'HH:mm:ss a'); // another date
            const durationStart = moment.duration(nowStartEnd.diff(nowStart));
            const difHoursStart = durationStart.asHours();
        
            const endStart = moment(employee.appointmentConfiguration.endTime,'HH:mm:ss a'); //todays date
            const endStartEnd = moment(employee.appointmentConfiguration.endTimeEnd,'HH:mm:ss a'); // another date
            const durationEnd = moment.duration(endStartEnd.diff(endStart));
            const difHoursEnd = durationEnd.asHours();
            const hoursWorkDay = difHoursStart+difHoursEnd
        
            //HORAS CALCULAAS DE TRABALHO NO DIA
            let totalHoursWorkedExtra = 0
            let totalMissingHoursWorked = 0
            let totalHoursWorked = 0
            employee.appointment.map((item)=>{
              const nowStart = moment(item.appointmentTime ? item.appointmentTime: new Date(Date.now()),'HH:mm:ss a'); //todays date
              const nowStartEnd = moment(item.appointmentTimeEnd ? item.appointmentTimeEnd  : item.appointmentTime ? item.appointmentTime : new Date(Date.now()),'HH:mm:ss a') // another date
              const durationStart = moment.duration(nowStartEnd.diff(nowStart));
              const difHoursStart = durationStart.asHours();
              
              totalHoursWorkedExtra += difHoursStart//TODO TRABALHO NORMAL + EXTRA 
            
           
              if(totalHoursWorked >=hoursWorkDay ){
                totalHoursWorked=hoursWorkDay
              }else{
                if(difHoursStart > 0){
                  totalHoursWorked +=difHoursStart
                }
              }
            })
            let timeExtra = totalHoursWorkedExtra - hoursWorkDay 
            let extraHoursWorked = timeExtra > 0 ? timeExtra: 0
            let missingHoursWorked = timeExtra < 0 ? timeExtra: 0
            let hoursWorked = totalHoursWorked //TRABALHO  NORMAL
            await this.save(extraHoursWorked,hoursWorked,missingHoursWorked,employee.id)
          }
        }
      }
    } catch (error) {
     throw new Error(error.message)
    }
  }


}


