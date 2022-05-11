"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const ensureAuthenticated_1 = require("./middleware/ensureAuthenticated");
const AuthenticateUser_1 = require("./useCases/AuthenticateUser");
const CreateCompany_1 = require("./useCases/CompanyUseCases/CreateCompany");
const RefreshToken_1 = require("./useCases/RefreshToken");
const CreateUser_1 = require("./useCases/UserUseCases/CreateUser");
const FindUser_1 = require("./useCases/UserUseCases/FindUser");
const SetUserPermission_1 = require("./useCases/UserUseCases/SetUserPermission");
const CreateDepartment_1 = require("./useCases/DepartmentUseCases/CreateDepartment");
//import { setUserDepartmentController } from "./useCases/UserUseCases/SetUserDepartment";
const CreateEmployee_1 = require("./useCases/EmployeeUseCases/CreateEmployee");
const CreateAppointmentConfiguration_1 = require("./useCases/AppointmentConfigurationUseCases/CreateAppointmentConfiguration");
const multer_1 = __importDefault(require("multer"));
//Middleware de Upload para o Avatar
const userAvatar_1 = require("./middleware/userAvatar");
const FindCompany_1 = require("./useCases/CompanyUseCases/FindCompany");
const validatePermissions_1 = require("./middleware/validatePermissions");
const DeleteUser_1 = require("./useCases/UserUseCases/DeleteUser");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/teste', (0, multer_1.default)(userAvatar_1.uploadAvatar.getConfig).single("userAvatar"), (req, res) => {
    if (req.file) {
        //Se ele existir, retornamos um sucess com o payload do arquivo gerado
        //Aqui sua criatividade é o limite
        return res.json({
            response: req.file,
        });
    }
    //Caso não seja um arquivo validado, retornamos o status 409
    //Doc para o status: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/409
    res.status(409);
    //E retornamos uma msg para o usuário final: Não é um tipo de arquivo válido
    return res.json({
        response: `Não é um tipo de arquivo válido`,
    });
});
router.post('/users', (0, multer_1.default)(userAvatar_1.uploadAvatar.getConfig).single("userAvatar"), ensureAuthenticated_1.ensureAuthenticated, (0, validatePermissions_1.is)(['manager', 'admin']), (request, response) => {
    return CreateUser_1.createUserController.handle(request, response);
});
router.get('/users/:id', (request, response) => {
    return FindUser_1.findUserController.handle(request, response);
});
router.delete('/users/:userId', (request, response) => {
    return DeleteUser_1.deleteUserController.handle(request, response);
});
router.post('/auth', (request, response) => {
    console.log("hello");
    return AuthenticateUser_1.authenticateUserController.handle(request, response);
});
router.post('/refresh-token', (request, response) => {
    return RefreshToken_1.refreshTokenUserController.handle(request, response);
});
router.post('/company', (request, response) => {
    return CreateCompany_1.createCompanyController.handle(request, response);
});
router.get('/company/:id', ensureAuthenticated_1.ensureAuthenticated, (0, validatePermissions_1.is)(['manager', 'admin']), (request, response) => {
    return FindCompany_1.findCompanyController.handle(request, response);
});
router.post('/users/permission/set-permission', ensureAuthenticated_1.ensureAuthenticated, (0, validatePermissions_1.is)(['manager', 'admin']), (request, response) => {
    return SetUserPermission_1.setUserPermissionController.handle(request, response);
});
// router.post('/company/:companyId/department/:departmentId/set-department',ensureAuthenticated,is(['manager']),(request, response) => {
//   return setUserDepartmentController.handle(request, response);
// });
router.post('/company/:companyId/department', ensureAuthenticated_1.ensureAuthenticated, (0, validatePermissions_1.is)(['manager', 'admin']), (request, response) => {
    return CreateDepartment_1.createDepartmentController.handle(request, response);
});
router.post('/employee', (request, response) => {
    return CreateEmployee_1.createEmployeeController.handle(request, response);
});
router.post('/appointment-configuration', (request, response) => {
    return CreateAppointmentConfiguration_1.createAppointmentConfigurationController.handle(request, response);
});
