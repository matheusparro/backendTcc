"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAppointmentRepository = void 0;
const client_1 = require("@prisma/client");
class PostgresAppointmentRepository {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    async save(appointmentEntity) {
        try {
            const appointmentConfigurationCreated = await this.prisma.appointment.create({
                data: appointmentEntity
            });
            return appointmentConfigurationCreated;
        }
        catch (error) {
            return error.message;
        }
    }
}
exports.PostgresAppointmentRepository = PostgresAppointmentRepository;
