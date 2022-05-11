"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserController = exports.authenticateUserUseCase = void 0;
const PostgresAuthenticationRepository_1 = require("../../repositories/implementations/AuthenticationImplementations/PostgresAuthenticationRepository");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
const AuthenticateUserController_1 = require("./AuthenticateUserController");
const postgresAuthenticationRepository = new PostgresAuthenticationRepository_1.PostgresAuthenticationRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(postgresAuthenticationRepository);
exports.authenticateUserUseCase = authenticateUserUseCase;
const authenticateUserController = new AuthenticateUserController_1.AuthenticateUserController(authenticateUserUseCase);
exports.authenticateUserController = authenticateUserController;
