"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCase = void 0;
class DeleteUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(id) {
        const userAlreadyExists = await this.usersRepository.findUser(id);
        if (!userAlreadyExists) {
            throw new Error('User not exists.');
        }
        const userDeleted = await this.usersRepository.deleteUser(id);
        if (!userDeleted) {
            throw new Error('User id wrong, user has not been deleted');
        }
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
