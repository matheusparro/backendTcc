"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const User_1 = require("../../../entities/User");
class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async handle(request, response) {
        const { email, password, companyId, employeeId, faceId } = request.body;
        try {
            const userCreate = new User_1.UserEntity({
                Avatar: request.file ? request.file.path : null,
                companyId: parseInt(companyId),
                email,
                password,
                employeeId,
                permissionsID: null,
                faceId: faceId ? faceId : null,
            });
            await this.createUserUseCase.execute(userCreate);
            return response.status(201).send();
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.CreateUserController = CreateUserController;
