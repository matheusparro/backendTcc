"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentUseCase = void 0;
class CreateAppointmentUseCase {
    constructor(appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    async execute(data) {
        const appointmentCreated = await this.appointmentRepository.save(data);
        if (!appointmentCreated) {
            throw new Error('Appointment not created.');
        }
    }
}
exports.CreateAppointmentUseCase = CreateAppointmentUseCase;
