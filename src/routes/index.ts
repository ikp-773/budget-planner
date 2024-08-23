import express from 'express';
import { AuthController, TestController, UserController } from '../controllers';
import { Endpoints } from './endpoints';
import { authenticateToken } from '../middlewares/auth';
import { validateUserRegistration } from '../middlewares/registration_validator';

const router = express.Router();

router.get(Endpoints.test, TestController.testEndpoint);

router.post(
    Endpoints.register,
    validateUserRegistration,
    AuthController.register
);
router.post(Endpoints.login, AuthController.login);
router.get(Endpoints.logout, AuthController.logout);
router.post(Endpoints.refreshToken, AuthController.refreshToken);
router.get(Endpoints.user, authenticateToken, UserController.getUser);

export default router;
