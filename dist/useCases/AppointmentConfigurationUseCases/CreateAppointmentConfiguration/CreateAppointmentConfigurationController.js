"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentConfigurationController = void 0;
const AppointmentConfiguration_1 = require("../../../entities/AppointmentConfiguration");
class CreateAppointmentConfigurationController {
    constructor(createAppointmentConfigurationUseCase) {
        this.createAppointmentConfigurationUseCase = createAppointmentConfigurationUseCase;
    }
    async handle(request, response) {
        const { startTime, startTimeEnd, endTime, endTimeEnd } = request.body;
        const { companyId } = request.body;
        try {
            const appointmentConfigurationEntityCreated = new AppointmentConfiguration_1.AppointmentConfigurationEntity({
                endTime: new Date(endTime),
                endTimeEnd: new Date(endTimeEnd),
                startTime: new Date(startTime),
                startTimeEnd: new Date(startTimeEnd),
                companyId: parseInt(companyId)
            });
            await this.createAppointmentConfigurationUseCase.execute(appointmentConfigurationEntityCreated);
            return response.status(201).send();
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.CreateAppointmentConfigurationController = CreateAppointmentConfigurationController;
