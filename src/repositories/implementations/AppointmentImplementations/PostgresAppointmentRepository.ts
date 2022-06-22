import { IAppointmentRepository } from "./IAppointmentRepository";
import { PrismaClient } from "@prisma/client";
import { AppointmentEntity } from "../../../entities/Appointment";
import fs from 'fs';
import path from "path";
import axios from 'axios'
import FormData from 'form-data'
import moment from "moment";
import { client } from "../../../prisma/client";
export class PostgresAppointmentRepository implements IAppointmentRepository {
  constructor(
    private prisma = new PrismaClient(),
  ) { }

  async updateAppointmentCompTime(id:number,appointmentEntity: AppointmentEntity): Promise<AppointmentEntity> {
    const appointmentsOld = await client.appointment.findUnique({

      where: {
        id:id,

      },
      include: {
        employee: {
          include: {
            appointmentConfiguration: true
          }
        }
      }
    })
    const dateNow = moment()
    const startDay = moment()
    if (moment(appointmentsOld.appointmentDate) < startDay) {


      const nowStart = moment(appointmentsOld.employee.appointmentConfiguration.startTime); //todays date
      const nowStartEnd = moment(appointmentsOld.employee.appointmentConfiguration.startTimeEnd); // another date
      const durationStart = moment.duration(nowStartEnd.diff(nowStart));
      const difHoursStart = durationStart.asHours();

      const endStart = moment(appointmentsOld.employee.appointmentConfiguration.endTime); //todays date
      const endStartEnd = moment(appointmentsOld.employee.appointmentConfiguration.endTimeEnd); // another date
      const durationEnd = moment.duration(endStartEnd.diff(endStart));
      const difHoursEnd = durationEnd.asHours();
      const hoursWorkDay = difHoursStart + difHoursEnd //QUANTAS HORAS ELE DEVE TRABALHAR POR DIA

      const nowStartApOld = moment(appointmentsOld.appointmentTime ? appointmentsOld.appointmentTime : new Date(Date.now())); //todays date
      const nowStartEndApOld = moment(appointmentsOld.appointmentTimeEnd ? appointmentsOld.appointmentTimeEnd : appointmentsOld.appointmentTime ? appointmentsOld.appointmentTime : new Date(Date.now())) // another date
      const durationStartApOld = moment.duration(nowStartEndApOld.diff(nowStartApOld));
      const difHoursStartApOld = durationStartApOld.asHours();// QUANTAS HORAS ELE TRABALHOU NO DIA ANTIGO

      let oldTotalWorkTime = difHoursStartApOld > hoursWorkDay ? hoursWorkDay : difHoursStartApOld
      let oldTimeExtra = difHoursStartApOld - hoursWorkDay
      let oldExtraWorkTime = oldTimeExtra > 0 ? oldTimeExtra : 0
      let oldMissingWorkTime = oldTimeExtra < 0 ? oldTimeExtra : 0


        const appointmentUpdated = await this.prisma.appointment.update({
          where: {
            id: id
          },
          data: {
            appointmentTime:appointmentEntity.appointmentTime,
            appointmentTimeEnd:appointmentEntity.appointmentTimeEnd,

          }
        })
   
     

      const nowStartAp = moment(appointmentUpdated.appointmentTime ? appointmentUpdated.appointmentTime : new Date(Date.now())); //todays date
      const nowStartEndAp = moment(appointmentUpdated.appointmentTimeEnd ? appointmentUpdated.appointmentTimeEnd : appointmentUpdated.appointmentTime ? appointmentUpdated.appointmentTime : new Date(Date.now())) // another date
      const durationStartAp = moment.duration(nowStartEndAp.diff(nowStartAp));
      const difHoursStartAp = durationStartAp.asHours();// QUANTAS HORAS ELE TRABALHOU NO DIA ATUALIZADO



      let totalWorkTimeUpdated = difHoursStartAp > hoursWorkDay ? hoursWorkDay : difHoursStartAp
      let timeExtraUpdated = difHoursStartAp - hoursWorkDay
      let extraWorkTimeUpdated = timeExtraUpdated > 0 ? timeExtraUpdated : 0
      let missingWorkTimeUpdated = timeExtraUpdated < 0 ? timeExtraUpdated : 0

      let compWorkTimeAdd = totalWorkTimeUpdated - oldTotalWorkTime
      let compExtraTimeAdd = extraWorkTimeUpdated - oldExtraWorkTime
      let compMissingTimeAdd = missingWorkTimeUpdated - oldMissingWorkTime

      const compTime = await client.compTime.findUnique({
        where: {
          employeeId: appointmentsOld.employeeId
        }
      })
      compWorkTimeAdd += compTime.hoursWorked
      compExtraTimeAdd += compTime.extraHoursWorked
      compMissingTimeAdd += compTime.missingHoursWorked
      if(compTime){
      await client.compTime.update({
        where:{
          id:compTime.id,
        },
        data:{
          extraHoursWorked:compExtraTimeAdd,
          hoursWorked:compWorkTimeAdd,
          missingHoursWorked:compMissingTimeAdd
        }
      })
      return appointmentUpdated
     }
    }
    const appointmentUpdated = await this.prisma.appointment.update({
      where: {
        id: id
      },
      data: appointmentEntity
    })
    return appointmentUpdated
  }
  async findAllFormated(employeeId: number): Promise<any> {
    const appointmentsFounded = await client.appointment.findMany({


      where: {
        employeeId,


      },
      orderBy: {
        appointmentDate: "desc"
      }


    })
    const appointmentConfig = await client.appointmentConfiguration.findFirst({
      where: {
        employer: {
          some: {
            id: employeeId
          }
        }
      }
    })

    async function groupBy(collection, property) {
      var i = 0, val, index,
        values = [], result = [];
      for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(moment(val).format("YYYY-MM-DD"));
        if (index > -1)
          result[index].push(collection[i]);
        else {

          values.push(moment(val).format("YYYY-MM-DD"));
          result.push([collection[i]]);
        }
      }
      return result;
    }
    const nowStart = moment(appointmentConfig.startTime); //todays date
    const nowStartEnd = moment(appointmentConfig.startTimeEnd); // another date
    const durationStart = moment.duration(nowStartEnd.diff(nowStart));
    const difHoursStart = durationStart.asHours();

    const endStart = moment(appointmentConfig.endTime); //todays date
    const endStartEnd = moment(appointmentConfig.endTimeEnd); // another date
    const durationEnd = moment.duration(endStartEnd.diff(endStart));
    const difHoursEnd = durationEnd.asHours();
    const hoursWorkDay = difHoursStart + difHoursEnd
    var obj = await groupBy(appointmentsFounded, "appointmentDate");

    const formatarSituacao = obj.map(item => {
      let situacao = 1
      let total = 0
      item.map(item => {
        if (!item.appointmentTimeEnd) {
          situacao = 3 // INCOMPLETO
        }
        if (!item.appointmentTimeEnd && !item.appointmentTime) {
          situacao = 2// falta
        }
        const nowStart = moment(item.appointmentTime ? item.appointmentTime : new Date(Date.now())); //todays date
        const nowStartEnd = moment(item.appointmentTimeEnd ? item.appointmentTimeEnd : item.appointmentTime ? item.appointmentTime : new Date(Date.now())); // another date
        const durationStart = moment.duration(nowStartEnd.diff(nowStart));
        const difHoursStart = durationStart.asHours().toPrecision(2);
        total += parseInt(difHoursStart)
      })
      if (total < hoursWorkDay && situacao != 2) {
        situacao = 3
      }
      let objeto = {
        data: item[0].appointmentDate,
        appointments: item,
        situacao,
      }
      return objeto
    })

    return formatarSituacao
  }
  async findLastAppointment(employeeId: number): Promise<AppointmentEntity> {
    const userFoundByEmployee = await client.appointment.findFirst({
      where: {
        employeeId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    if (userFoundByEmployee.appointmentTimeEnd) userFoundByEmployee.appointmentTime = userFoundByEmployee.appointmentTimeEnd
    return userFoundByEmployee
  }




  async save(appointmentEntity: AppointmentEntity, faceToAnalize: Express.Multer.File): Promise<AppointmentEntity> {
    try {
      const userFoundByEmployee = await this.prisma.employee.findFirst({
        where: {
          id: appointmentEntity.employeeId
        },
        include: {
          user: true
        }
      })

      if (!userFoundByEmployee) {
        throw new Error("Employee user not found")
      }

      const image = await path.join(__dirname, `../../../../${userFoundByEmployee.user.Avatar}`)
      const fileFounded = await fs.createReadStream(image)
      const formdata = await new FormData()
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


      if (!res.data.isEqualFaces) {
        throw new Error("Face not match")
      }
      const appointmentOpen = await this.prisma.appointment.findFirst({
        where: {
          appointmentTimeEnd: null,
          NOT: {
            appointmentTime: null,
          }
        }

      })
      if (appointmentOpen) {
        const appointmentClosed = await this.prisma.appointment.update({
          where: {
            id: appointmentOpen.id
          },
          data: {
            appointmentTimeEnd: new Date(appointmentEntity.appointmentTime)
          }
        })
        return appointmentClosed
      }
      appointmentEntity.appointmentTimeEnd = undefined
      const appointmentConfigurationCreated = await this.prisma.appointment.create({
        data: appointmentEntity
      })
      return appointmentConfigurationCreated



    } catch (error) {
      throw new Error(error.message)
    }
  }
}



