"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppointmentController = void 0;
const Appointment_1 = require("../../../entities/Appointment");
class CreateAppointmentController {
    constructor(createAppointmentUseCase) {
        this.createAppointmentUseCase = createAppointmentUseCase;
    }
    async handle(request, response) {
        const { departmentId, employeeId, appointmentTime } = request.body;
        try {
            const appointmentCreated = new Appointment_1.AppointmentEntity({
                departmentId,
                employeeId,
                appointmentTime: new Date(appointmentTime),
            });
            await this.createAppointmentUseCase.execute(appointmentCreated);
            return response.status(201).send();
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.CreateAppointmentController = CreateAppointmentController;
