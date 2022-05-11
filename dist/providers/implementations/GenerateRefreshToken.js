"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateRefreshToken = void 0;
const client_1 = require("../../prisma/client");
const dayjs_1 = __importDefault(require("dayjs"));
class GenerateRefreshToken {
    async execute(userId) {
        await client_1.client.refreshToken.deleteMany({
            where: { userId }
        });
        const expiresIn = (0, dayjs_1.default)().add(1000, "second").unix();
        const generateRefreshToken = client_1.client.refreshToken.create({
            data: {
                userId,
                expiresIn
            }
        });
        return generateRefreshToken;
    }
}
exports.GenerateRefreshToken = GenerateRefreshToken;
