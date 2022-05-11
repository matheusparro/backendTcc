"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentConfigurationUseCase = void 0;
class CreateAppointmentConfigurationUseCase {
    constructor(appointmentConfigurationRepository) {
        this.appointmentConfigurationRepository = appointmentConfigurationRepository;
    }
    async execute(data) {
        const appointmentConfiguration = await this.appointmentConfigurationRepository.save(data);
        if (!appointmentConfiguration) {
            throw new Error('Appointment Configuration not created.');
        }
    }
}
exports.CreateAppointmentConfigurationUseCase = CreateAppointmentConfigurationUseCase;
