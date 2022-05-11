"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAppointmentConfigurationRepository = void 0;
const client_1 = require("@prisma/client");
class PostgresAppointmentConfigurationRepository {
    constructor(prisma = new client_1.PrismaClient()) {
        this.prisma = prisma;
    }
    async save(appointmentConfigurationEntity) {
        try {
            const appointmentConfigurationCreated = await this.prisma.appointmentConfiguration.create({
                data: appointmentConfigurationEntity
            });
            return appointmentConfigurationCreated;
        }
        catch (error) {
            return error.message;
        }
    }
}
exports.PostgresAppointmentConfigurationRepository = PostgresAppointmentConfigurationRepository;
