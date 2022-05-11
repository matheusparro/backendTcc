"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUserPermissionController = void 0;
class SetUserPermissionController {
    constructor(setUserPermissionUseCase) {
        this.setUserPermissionUseCase = setUserPermissionUseCase;
    }
    async handle(request, response) {
        const { userId, permissionId } = request.body;
        try {
            const userFounded = await this.setUserPermissionUseCase.execute(parseInt(userId), parseInt(permissionId));
            return response.status(201).json(userFounded);
        }
        catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.SetUserPermissionController = SetUserPermissionController;
