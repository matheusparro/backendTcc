"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
class AuthenticateUserController {
    constructor(authenticateUserUseCase) {
        this.authenticateUserUseCase = authenticateUserUseCase;
    }
    async handle(request, response) {
        const { email, password } = request.body;
        try {
            const { token, refreshToken } = await this.authenticateUserUseCase.execute({
                email, password
            });
            return response.status(201).json({ token, refreshToken });
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
