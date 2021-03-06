"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenUserController = exports.refreshTokeUserUseCase = void 0;
const PostgresRefreshTokenRepository_1 = require("../../repositories/implementations/RefreshTokenImplementations/PostgresRefreshTokenRepository");
const RefreshTokenUserUseCase_1 = require("./RefreshTokenUserUseCase");
const RefreshTokenUserController_1 = require("./RefreshTokenUserController");
const postgresRefreshTokenRepository = new PostgresRefreshTokenRepository_1.PostgresRefreshTokenRepository();
const refreshTokeUserUseCase = new RefreshTokenUserUseCase_1.RefreshTokeUserUseCase(postgresRefreshTokenRepository);
exports.refreshTokeUserUseCase = refreshTokeUserUseCase;
const refreshTokenUserController = new RefreshTokenUserController_1.RefreshTokenUserController(refreshTokeUserUseCase);
exports.refreshTokenUserController = refreshTokenUserController;
