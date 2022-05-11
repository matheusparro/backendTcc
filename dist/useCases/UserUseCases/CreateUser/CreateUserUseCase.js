"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
class CreateUserUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(data) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        if (userAlreadyExists) {
            throw new Error('E-mail alredy used.');
        }
        const userCreated = await this.usersRepository.save(data);
        if (!userCreated) {
            throw new Error('User not created.');
        }
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
