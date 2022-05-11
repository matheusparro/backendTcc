"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeUseCase = void 0;
class CreateEmployeeUseCase {
    constructor(usersRepository, employeeRepository) {
        this.usersRepository = usersRepository;
        this.employeeRepository = employeeRepository;
    }
    async execute(data, userId) {
        const userAlreadyExists = await this.usersRepository.findUser(userId);
        if (!userAlreadyExists) {
            throw new Error('User not exist.');
        }
        const employeeCreated = await this.employeeRepository.save(data, userId);
        if (!employeeCreated) {
            throw new Error('User not created.');
        }
    }
}
exports.CreateEmployeeUseCase = CreateEmployeeUseCase;
