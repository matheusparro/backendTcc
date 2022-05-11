"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUsersRepository = void 0;
const client_1 = require("@prisma/client");
const client_2 = require("../../../prisma/client");
class PostgresUsersRepository {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
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
    async setUserPermission(id, permissionID, companyId) {
        const permissionFounded = await client_2.client.permissions.findFirst({
            where: {
                id: permissionID,
                companyId: companyId
            }
        });
        if (!permissionFounded) {
            throw new Error("Permission not exist");
        }
        const updateUser = await client_2.client.user.update({
            where: {
                id
            },
            data: {
                permissionsID: permissionID
            },
        });
        return updateUser;
    }
    async findByEmail(email) {
        const user = await client_2.client.user.findUnique({
            where: {
                email
            },
        });
        return user;
    }
    async findUser(id) {
        const user = await client_2.client.user.findUnique({
            where: {
                id
            },
            include: {
                permissions: true,
            },
        });
        return user;
    }
    async save(user) {
        try {
            const userCreated = await this.prisma.user.create({
                data: user
            });
            return userCreated;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteUser(id) {
        try {
            const user = await client_2.client.user.delete({
                where: {
                    id
                }
            });
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.PostgresUsersRepository = PostgresUsersRepository;
