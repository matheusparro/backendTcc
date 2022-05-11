"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async handle(request, response) {
        const { userId } = request.params;
        try {
            await this.deleteUserUseCase.execute(parseInt(userId));
            return response.status(201).json("Usuário deletado com sucesso");
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.DeleteUserController = DeleteUserController;
