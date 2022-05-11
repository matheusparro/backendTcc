"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresRefreshTokenRepository = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const client_1 = require("../../../prisma/client");
const GenerateRefreshToken_1 = require("../../../providers/implementations/GenerateRefreshToken");
const GenerateTokenProvider_1 = require("../../../providers/implementations/GenerateTokenProvider");
class PostgresRefreshTokenRepository {
    async verify(refreshToken) {
        const refreshTokenFounded = await client_1.client.refreshToken.findFirst({
            where: { id: refreshToken }
        });
        if (!refreshTokenFounded) {
            return null;
        }
        const refreshTokenExpired = (0, dayjs_1.default)().isAfter(dayjs_1.default.unix(refreshTokenFounded.expiresIn));
        const generateTokenProvider = new GenerateTokenProvider_1.GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshTokenFounded.userId);
        if (refreshTokenExpired) {
            const generateRefreshToken = new GenerateRefreshToken_1.GenerateRefreshToken();
            const newRefreshToken = await generateRefreshToken.execute(refreshTokenFounded.userId);
            return { token, newRefreshToken };
        }
        return token;
    }
}
exports.PostgresRefreshTokenRepository = PostgresRefreshTokenRepository;
