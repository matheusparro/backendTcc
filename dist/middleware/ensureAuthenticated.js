"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({ message: "Token is missing" });
    }
    const [, token] = authToken.split(" ");
    try {
        (0, jsonwebtoken_1.verify)(token, "1f6ef3008b9fe8894fa1f0ae5c73d033");
        const { sub } = (0, jsonwebtoken_1.decode)(token);
        request.userId = sub.toString();
        return next();
    }
    catch (error) {
        return response.status(401).json({ message: "Token invalid" });
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
