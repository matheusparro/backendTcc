import { Router } from "express";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { authenticateUserController } from "./useCases/AuthenticateUser";
import { createCompanyController } from "./useCases/CompanyUseCases/CreateCompany";
import { refreshTokenUserController } from "./useCases/RefreshToken";
import { createUserController } from "./useCases/UserUseCases/CreateUser";
import { findUserController } from "./useCases/UserUseCases/FindUser";
import { setUserPermissionController } from "./useCases/UserUseCases/SetUserPermission";
import { createDepartmentController } from "./useCases/DepartmentUseCases/CreateDepartment";
//import { setUserDepartmentController } from "./useCases/UserUseCases/SetUserDepartment";
import { createEmployeeController } from "./useCases/EmployeeUseCases/CreateEmployee";
import {  createAppointmentConfigurationController } from "./useCases/AppointmentConfigurationUseCases/CreateAppointmentConfiguration";
import multer from "multer";

//Middleware de Upload para o Avatar
import { uploadAvatar } from "./middleware/userAvatar"
import { findCompanyController } from "./useCases/CompanyUseCases/FindCompany";
import { is } from "./middleware/validatePermissions";
import { deleteUserController } from "./useCases/UserUseCases/DeleteUser";
import { createAppointmentController } from "./useCases/AppointmentUseCases/CreateAppointment";
import { findAllDepartmentController } from "./useCases/DepartmentUseCases/FindAllDepartment.ts";
import { findAllUserCompanyController } from "./useCases/UserUseCases/FindAllUserCompany";
import { updateUserController } from "./useCases/UserUseCases/UpdateUser";
import { findAllAppointmentConfigurationController } from "./useCases/AppointmentConfigurationUseCases/FindAllAppointmentConfiguration";
import { findEmployeeController } from "./useCases/EmployeeUseCases/FindEmployee";
import { updateAppointmentConfigurationController } from "./useCases/AppointmentConfigurationUseCases/UpdateAppointmentConfiguration";
import { updateDepartmentController } from "./useCases/DepartmentUseCases/UpdateDeparment";
import { updateEmployeeController } from "./useCases/EmployeeUseCases/UpdateEmployee";
import { findCompTimeByMonthController } from "./useCases/CompTime/FindCompTimeByMonth";
import { findLastAppointmentByUserController } from "./useCases/AppointmentUseCases/FindLastAppointmentByUser";
import { findAllDepartmentHoursController } from "./useCases/DepartmentUseCases/FindAllDepartmentHours";
import { findCompTimeController } from "./useCases/CompTime/FindCompTime";
import { findAllFormatedAppointmentByUserController } from "./useCases/AppointmentUseCases/FindAllFormatedAppointmentByUser";
import { createAppointmentControllerteste } from "./useCases/AppointmentUseCases/CreateAppointment copy";
import { changePasswordUserController } from "./useCases/UserUseCases/ChangePasswordUser";
import { forgotPasswordController } from "./useCases/UserUseCases/ForgotPassword";
const router = Router()

router.post('/teste', multer().single("testeImagem"), (req, res) => {
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
})

router.post('/users', multer(uploadAvatar.getConfig).single("userAvatar"), ensureAuthenticated, is(['manager', 'admin']), (request, response) => {
  return createUserController.handle(request, response);
});

router.put('/users/:id', multer(uploadAvatar.getConfig).single("userAvatar"), ensureAuthenticated, is(['manager', 'admin']), (request, response) => {
  return updateUserController.handle(request, response);
});

router.get('/users/:id', (request, response) => { //////////////////////// FIND ONE BY ID
  return findUserController.handle(request, response);
});

router.delete('/users/:userId', (request, response) => { ////////////////////// DELETE BY ID
  return deleteUserController.handle(request, response);
});
router.get('/company/:companyId/users/', (request, response) => { //////////////////////// FIND ALL USER BY COMPANY
  return findAllUserCompanyController.handle(request, response);
});


router.post('/auth', (request, response) => {
  return authenticateUserController.handle(request, response);
});

router.post('/refresh-token', (request, response) => {
  return refreshTokenUserController.handle(request, response);
});

router.post('/company', (request, response) => {
  return createCompanyController.handle(request, response);
});


router.get('/company/:id', ensureAuthenticated, is(['manager', 'admin']), (request, response) => {
  return findCompanyController.handle(request, response);
});

router.post('/users/permission/set-permission', ensureAuthenticated, is(['manager', 'admin']), (request, response) => {
  return setUserPermissionController.handle(request, response);
});

router.patch('/users/:id/change-password', ensureAuthenticated, (request, response) => {
  return changePasswordUserController.handle(request, response);
});

router.post('/forgot-password', (request, response) => {
  return forgotPasswordController.handle(request, response);
});

// router.post('/company/:companyId/department/:departmentId/set-department',ensureAuthenticated,is(['manager']),(request, response) => {
//   return setUserDepartmentController.handle(request, response);
// });
router.post('/company/:companyId/department', ensureAuthenticated, is(['manager', 'admin']), (request, response) => { // CRIAR UM DEPARTAMENTO
  return createDepartmentController.handle(request, response);
});

router.get('/company/:companyId/department/all/month', (request, response) => { //BUSCAR HORAS DO MES DE TODOS OS DEPARTAMENTOS
  return findAllDepartmentHoursController.handle(request, response);
});

router.post('/employee', (request, response) => {
  return createEmployeeController.handle(request, response);
});
router.get('/employee/:id', (request, response) => {
  return findEmployeeController.handle(request, response);
});

router.get('/employee/:employeeId/comp_time/year', (request, response) => {
  return findCompTimeByMonthController.handle(request, response);
});

router.get('/employee/:employeeId/comp_time/', (request, response) => {
  return findCompTimeController.handle(request, response);
});

router.post('/appointment',multer().single("faceToAnalize"), (request, response) => {
  
  return createAppointmentController.handle(request, response);
});

router.put('/appointment/:id', (request, response) => {
  
  return createAppointmentControllerteste.handle(request, response);
});


router.get('/employee/:employeeId/appointment/last', (request, response) => {
  
  return findLastAppointmentByUserController.handle(request, response);
});

router.get('/employee/:employeeId/appointment', (request, response) => {
  
  return findAllFormatedAppointmentByUserController.handle(request, response);
});


router.get('/company/:companyId/department/all', (request, response) => {
  
  return findAllDepartmentController.handle(request, response);
});

router.get('/company/:companyId/appointment-configuration/all', (request, response) => {
  
  return findAllAppointmentConfigurationController.handle(request, response);
});

router.post('/company/:companyId/appointment-configuration', (request, response) => {
  return createAppointmentConfigurationController.handle(request, response);
});

router.patch('/appointment-configuration/:id', (request, response) => {
  return updateAppointmentConfigurationController.handle(request, response);
});

router.patch('/department/:id', (request, response) => {
  
  return updateDepartmentController.handle(request, response);
});

router.put('/employee/:id', (request, response) => {
  return updateEmployeeController.handle(request, response);
});
export { router }