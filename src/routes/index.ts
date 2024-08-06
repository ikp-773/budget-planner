import express from 'express';
import { TestController } from '../controllers';
import { Endpoints } from './endpoints';

const router = express.Router();
const testController = new TestController();

router.get(Endpoints.test, (req, res) => testController.testEndpoint(req, res));

export default router;
