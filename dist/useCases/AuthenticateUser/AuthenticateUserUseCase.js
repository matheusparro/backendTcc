"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserUseCase = void 0;
const GenerateRefreshToken_1 = require("../../providers/implementations/GenerateRefreshToken");
const GenerateTokenProvider_1 = require("../../providers/implementations/GenerateTokenProvider");
class AuthenticateUserUseCase {
    constructor(authenticationRepository) {
        this.authenticationRepository = authenticationRepository;
    }
    async execute({ email, password }) {
        const userFind = await this.authenticationRepository.findToLogin(email, password);
        if (!userFind) {
            throw new Error(`Email or password incorrect`);
        }
        const generateTokenProvider = new GenerateTokenProvider_1.GenerateTokenProvider();
        const token = await generateTokenProvider.execute(userFind.id);
        const generateRefreshToken = new GenerateRefreshToken_1.GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userFind.id);
        return { token, refreshToken };
    }
}
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
