import express from 'express';
import authController from '@controllers/authController';
import { validate, registerRules, loginRules } from '@rules/authRules';

const router = express.Router();

router.post("/register", registerRules(), validate, authController.register);
router.post("/login", loginRules(), validate, authController.login);

export default router