"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = void 0;
const PostgresUsersRepository_1 = require("../repositories/implementations/UserImplementations/PostgresUsersRepository");
function is(rolesRoutes) {
    return async (request, response, next) => {
        const { userId } = request;
        const usersRepository = new PostgresUsersRepository_1.PostgresUsersRepository();
        const user = await usersRepository.findUser(parseInt(userId));
        if (!user) {
            return response.status(400).json("User does not exists");
        }
        if (!user.permissions) {
            return response.status(401).end();
        }
        const permissionExist = rolesRoutes.includes(user.permissions.name);
        if (!permissionExist) {
            return response.status(401).end();
        }
        return next();
    };
}
exports.is = is;
