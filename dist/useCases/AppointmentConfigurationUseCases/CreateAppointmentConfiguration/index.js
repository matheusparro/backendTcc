"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointmentConfigurationController = exports.createAppointmentConfigurationUseCase = void 0;
const PostgresAppointmentConfigurationRepository_1 = require("../../../repositories/implementations/AppointmentConfigurationImplementations/PostgresAppointmentConfigurationRepository");
const CreateAppointmentConfigurationUseCase_1 = require("./CreateAppointmentConfigurationUseCase");
const CreateAppointmentConfigurationController_1 = require("./CreateAppointmentConfigurationController");
const postgresAppointmentConfigurationRepository = new PostgresAppointmentConfigurationRepository_1.PostgresAppointmentConfigurationRepository();
const createAppointmentConfigurationUseCase = new CreateAppointmentConfigurationUseCase_1.CreateAppointmentConfigurationUseCase(postgresAppointmentConfigurationRepository);
exports.createAppointmentConfigurationUseCase = createAppointmentConfigurationUseCase;
const createAppointmentConfigurationController = new CreateAppointmentConfigurationController_1.CreateAppointmentConfigurationController(createAppointmentConfigurationUseCase);
exports.createAppointmentConfigurationController = createAppointmentConfigurationController;
