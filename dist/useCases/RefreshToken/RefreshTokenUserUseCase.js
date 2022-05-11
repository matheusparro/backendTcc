"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokeUserUseCase = void 0;
class RefreshTokeUserUseCase {
    constructor(refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async execute(refreshToken) {
        const token = await this.refreshTokenRepository.verify(refreshToken);
        if (!token) {
            throw new Error(' Refresh token invalid');
        }
        return token;
    }
}
exports.RefreshTokeUserUseCase = RefreshTokeUserUseCase;
