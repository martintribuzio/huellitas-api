import express from 'express';
import userController from '@controllers/userController';

const router = express.Router();

router.get("/show", userController.show);

export default router