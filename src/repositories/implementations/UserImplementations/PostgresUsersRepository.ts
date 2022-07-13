import { IUsersRepository } from "./IUsersRepository";
import { UserEntity } from "../../../entities/User";
import { PrismaClient } from "@prisma/client";
import { client } from "../../../prisma/client";
import Axios from 'axios'
import { compare,hash } from "bcrypt";
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import e from "express";

export class PostgresUsersRepository implements IUsersRepository {
  constructor(
    private prisma = new PrismaClient(),
    
  ) { }
  async forgotPassword(email: string) {
    try {
      // const transporter = nodemailer.createTransport({
      //   host: "smtp.mailtrap.io",
      //   port: 2525,
      //   auth: {
      //     user: "e163573afcc570",
      //     pass: "7dff8575fba76f"
      //   }
      // });
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure:true,
        auth: {
          user: "mathparro@gmail.com",
          pass: "bgqwqifedwodpcyg"
        },
      });
      const newPassword = crypto.randomBytes(4).toString('hex')
      transporter.sendMail({
        from:'Administrador <cbd524a386-0ea896@inbox.mailtrap.io>',
        to:email,
        subject:"ToTrabalhando - Recuperação de senha",
        text:`Olá, sua nova senha para acessar o sistema é ${newPassword}`

      }).then(async ()=>{
        await client.user.update({
          where:{
            email
          },
          data:{
            password: await hash(newPassword,8)
          }
        })
      })
    } catch (error) {
      throw new Error("Não foi possivel recuperar a senha")
    }
  }
  async changePassword(id: number, password: string, newPassword: string): Promise<UserEntity> {
    const userFounded = await client.user.findFirst({
      where:{
        id,
      }
    })
    
   const comparedPassword = await compare(password, userFounded.password)
    if(!comparedPassword) {
      throw new Error("Senha antiga inválida")
    }
   
    const userChanged = await client.user.update({
      where:{
        id,
      },
      data:{
        password:await hash(newPassword,8)
      }
    })
    return userChanged
  }
  async findAll(companyId: number,departmentId:number): Promise<UserEntity[]> {
    try {
      const userList = await client.user.findMany({
        where: {
         companyId,

        },
        include:{
          employee:{
            
            select:{
              departmentId:true
            }
          }
          
        }
      })
      const userListFiltered = userList.filter(item => !item.employee || item.employee.departmentId ==departmentId )
      if(departmentId){
        return userListFiltered
      }
      return userList;
    } catch (error) {
      throw new Error("Cannot found users")
    }
   
  }
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
 
     try {
     
      const userCreated= await this.prisma.user.create({
        data:{
          email:user.email,
          password:user.password,
          Avatar:user.Avatar,
          companyId:user.companyId,
          employeeId:user.employeeId,
       
          permissionsID:user.permissionsID
        }
      })
     
      return userCreated
    } catch (error) {
      throw new Error(error.message);
    }
    
  }

  async update(id:number,email:string,avatar:string,permissionsID:number): Promise<UserEntity> {
 
    try {
    
     const userUpdated= await this.prisma.user.update({
       where:{
          id:id
        },
       data:{
         email:email,
         Avatar:avatar,
         permissionsID:permissionsID
       }
     })
    
     return userUpdated
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