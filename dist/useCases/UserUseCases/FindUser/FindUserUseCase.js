"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserUseCase = void 0;
class FindUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(id) {
        const user = await this.usersRepository.findUser(id);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    }
}
exports.FindUserUseCase = FindUserUseCase;
