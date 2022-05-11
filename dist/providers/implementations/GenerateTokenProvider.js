"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTokenProvider = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class GenerateTokenProvider {
    async execute(userId) {
        const token = (0, jsonwebtoken_1.sign)({}, '1f6ef3008b9fe8894fa1f0ae5c73d033', {
            subject: String(userId),
            expiresIn: '1000s'
        });
        return token;
    }
}
exports.GenerateTokenProvider = GenerateTokenProvider;
