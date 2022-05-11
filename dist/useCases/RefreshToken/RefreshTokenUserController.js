"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUserController = void 0;
class RefreshTokenUserController {
    constructor(refreshTokeUserUseCase) {
        this.refreshTokeUserUseCase = refreshTokeUserUseCase;
    }
    async handle(request, response) {
        const { refreshToken } = request.body;
        try {
            const token = await this.refreshTokeUserUseCase.execute(parseInt(refreshToken));
            return response.status(201).json({ token });
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.RefreshTokenUserController = RefreshTokenUserController;
