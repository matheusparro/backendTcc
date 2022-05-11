"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAuthenticationRepository = void 0;
const client_1 = require("../../../prisma/client");
const bcrypt_1 = require("bcrypt");
class PostgresAuthenticationRepository {
    async findToLogin(email, password) {
        const userAlreadyExists = await client_1.client.user.findFirst({
            where: { email }
        });
        if (!userAlreadyExists) {
            return null;
        }
        if (!await (0, bcrypt_1.compare)(password, userAlreadyExists.password)) {
            return null;
        }
        return userAlreadyExists;
    }
}
exports.PostgresAuthenticationRepository = PostgresAuthenticationRepository;
