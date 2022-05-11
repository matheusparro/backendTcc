"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUserPermissionUseCase = void 0;
class SetUserPermissionUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(employerId, permissionsID) {
        const userFounded = await this.usersRepository.findUser(employerId);
        if (!userFounded) {
            throw new Error("User does not exist");
        }
        const user = await this.usersRepository.setUserPermission(employerId, permissionsID, userFounded.companyId);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    }
}
exports.SetUserPermissionUseCase = SetUserPermissionUseCase;
