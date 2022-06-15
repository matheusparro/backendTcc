import { EmployeeEntity } from "../../../entities/Employee";
import { IEmployeeRepository } from "./IEmployeeRepository";
import { PrismaClient } from "@prisma/client";
export class PostgresCompaniesRepository implements IEmployeeRepository {
  constructor(
    private prisma = new PrismaClient(),
  ) { }

  async update(data: EmployeeEntity, id: number): Promise<EmployeeEntity> {
    try {
      const result = await this.prisma.employee.update({
        where:{
          id
        },
        data:data

      })
     return result
   }catch (err) {
     throw new Error(err);
   }
  }

  async save(employee: EmployeeEntity,userId): Promise<EmployeeEntity> {
    try {
       const result = await this.prisma.$transaction(async (prisma: PrismaClient) => {
         let  employeeCreated = null 
         
           employeeCreated = await prisma.employee.create({
            data:employee
          })
        
          const userUpdated = await prisma.user.update({
            where:{id:userId},
            data:{
              employeeId:employeeCreated ? employeeCreated.id: null
            }
          })

          const compTime = await prisma.compTime.create({
            data:{
              employeeId: employeeCreated.id
            }
          })
          return compTime
          return employeeCreated


      })
      return result
    }catch (err) {
      throw new Error(err);
    }
  }

  async findEmployee(id:number){
    const employee = await this.prisma.employee.findUnique({
      where: {
       id,
      }, 
    })
    
    return employee;
  }

  
}


