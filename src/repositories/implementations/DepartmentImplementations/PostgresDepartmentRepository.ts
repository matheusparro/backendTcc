import moment from "moment";
import { DepartmentEntity } from "../../../entities/Department";
import { client } from "../../../prisma/client";
import { IDepartmentRepository } from "./IDepartmentRepository";

export class PostgresDepartmentRepository implements IDepartmentRepository {
  async findAllHours(companyId: number): Promise<any> {
    const startOfMonth = moment().startOf('month').set({hour:0,minute:0,second:0,millisecond:0}).format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = moment().endOf('month').set({hour:23,minute:59,second:59,millisecond:59}).format('YYYY-MM-DD HH:mm:ss');
    const departmentsFounded =  await client.department.findMany({
      where:{
        companyId,
        //id: id?id:undefined,
        // employer:{
        //   some:{
        //     appointment:{
        //       some:{
        //         appointmentTime:{
        //           gte:new Date(startOfMonth),
        //           lte:new Date(endOfMonth),
        //         },
        //         appointmentTimeEnd:{
        //           gte:new Date(startOfMonth),
        //           lte:new Date(endOfMonth),
        //         },
        //       }
        //     }
        //   }
        // }
      },
      include:{
        employer:{
          include:{
            appointment:{
              where:{
                appointmentTime:{
                  gte:new Date(startOfMonth),
                  lte:new Date(endOfMonth),
                },
                appointmentTimeEnd:{
                  gte:new Date(startOfMonth),
                  lte:new Date(endOfMonth),
                },
              }
            },
            appointmentConfiguration:true,
          }
        }
      }
    })
    const objectDepartaments = []
    if (departmentsFounded){
      departmentsFounded.map(itemDepartment =>{
        let hours = 0
        if(itemDepartment.employer){
          itemDepartment.employer.map(itemEmployer =>{
            if(itemEmployer.appointment){
              itemEmployer.appointment.map(itemAppointment =>{
                const nowStart = moment(itemAppointment.appointmentTime); //todays date
                const nowStartEnd = moment(itemAppointment.appointmentTimeEnd); // another date
                const durationStart = moment.duration(nowStartEnd.diff(nowStart));
                const difHoursStart = durationStart.asHours().toPrecision(2);
                hours+=parseInt(difHoursStart)
              })
            }
          })
        }
        if(hours< 0){
          hours=0
        }
        objectDepartaments.push({
          id:itemDepartment.id,
          name: itemDepartment.name,
          hours: hours
        })
      })
    }
    return objectDepartaments
  }

  async update(id:number,name:string): Promise<DepartmentEntity> {
   const departmentUpdated = await client.department.update({
     where:{
       id
     },
     data:{
       name
     }
   })
   return departmentUpdated
  }

  async findAll(companyId: number): Promise<DepartmentEntity[]> {
    const departmentsFounded =  await client.department.findMany({
      where:{
        companyId
      }
    })
    return departmentsFounded
  }
  async save(department: DepartmentEntity): Promise<DepartmentEntity> {

    const departmentFounded =  await client.department.findFirst({
      where:{
        companyId:department.companyId,
        name:department.name
      }
    })
    if(departmentFounded) throw new Error('Departamento já existe.')

    const departmentCreated = await client.department.create({
      data:department
    })
    return departmentCreated
  }

}


