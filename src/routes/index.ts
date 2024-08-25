import express from 'express';
import { AuthController, TestController, UserController } from '../controllers';
import { Endpoints } from './endpoints';
import { authenticateToken } from '../middlewares/auth';
import { validateUserRegistration } from '../middlewares/registration_validator';

const router = express.Router();

// test
router.get(Endpoints.test, TestController.testEndpoint);

// user authentication
router.post(
    Endpoints.register,
    validateUserRegistration,
    AuthController.register
);
router.post(Endpoints.login, AuthController.login);
router.post(Endpoints.refreshToken, AuthController.refreshToken);

// user management
router.get(Endpoints.user, authenticateToken, UserController.getUser);
router.patch(Endpoints.user, authenticateToken, UserController.updateUser);
router.delete(Endpoints.user, authenticateToken, UserController.deleteUser);

export default router;
