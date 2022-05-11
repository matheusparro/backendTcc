import { IUsersRepository } from "./IUsersRepository";
import { UserEntity } from "../../../entities/User";
import { PrismaClient } from "@prisma/client";
import { client } from "../../../prisma/client";
import { Axios } from 'axios'

export class PostgresUsersRepository implements IUsersRepository {
  constructor(
    private prisma = new PrismaClient(),
    private axios = new Axios()
  ) { }
  // async setUserDepartment(id: number, departmentId: number, companyId: number): Promise<UserEntity> {
  //   const departmentFounded = await client.department.findFirst({
  //     where:{
  //       id:departmentId,
  //       companyId:companyId
  //     }
  //   })
  //   if(!departmentFounded){
  //     throw new Error("Permission not exist")
  //   }
  //   const updateUser = await client.user.update({
  //     where: {
  //       id 
  //     },
  //     data: {
  //       departmentId:departmentId
  //     },
  //   })
  //   return updateUser
  // }
  async setUserPermission(id: number, permissionID: number,companyId:number): Promise<UserEntity> {
    const permissionFounded = await client.permissions.findFirst({
      where:{
        id:permissionID,
        companyId:companyId
      }
    })
    if(!permissionFounded){
      throw new Error("Permission not exist")
    }
    const updateUser = await client.user.update({
      where: {
        id 
      },
      data: {
        permissionsID:permissionID
      },
    })
    return updateUser
  }
  



  async findByEmail(email: string): Promise<UserEntity> {
    const user = await client.user.findUnique({
      where: {
       email
      },
    })
    return user;
  }
   
  async findUser(id:number){
    const user = await client.user.findUnique({
      where: {
       id
      },
      include:{
        permissions:true,
      },
      
    })
    
    return user;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const caminho = user.Avatar.split("\\",2)[1]
    const data = `https://tcctotrabalhando.herokuapp.com/${caminho}`
     try {
      let result = null
      if(user.Avatar){
        const headers = {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': '74893f4645c94faebe27e75c94899910'
        }
  
         result = await this.axios.post("https://faceapitcc.cognitiveservices.azure.com/",data,{headers})
      
      } 
      let faceId = null
      if(result) faceId = result.data[0].faceId
      const userCreated= await this.prisma.user.create({
        data:{
          email:user.email,
          password:user.password,
          Avatar:user.Avatar,
          companyId:user.companyId,
          employeeId:user.employeeId,
          faceId:faceId,
          permissionsID:user.permissionsID
        }
      })
     
      return userCreated
    } catch (error) {
      throw new Error(error.message);
    }
    
  }

  async deleteUser(id: number): Promise<UserEntity> {
    try{
      const user = await client.user.delete({
        where: {
         id
        }
      })
      return user
      
    }catch (error) {
      throw new Error(error.message);
    }
  }
  
  
}