"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserController = void 0;
class FindUserController {
    constructor(findUserUseCase) {
        this.findUserUseCase = findUserUseCase;
    }
    async handle(request, response) {
        const { id } = request.params;
        try {
            const userFounded = await this.findUserUseCase.execute(parseInt(id));
            return response.status(201).json(userFounded);
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.FindUserController = FindUserController;
