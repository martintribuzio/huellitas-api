import express from 'express';
import subscriptionController from '@controllers/subscriptionController';
import { validate, createRules } from '@rules/subscriptionRules';

const router = express.Router();

router.post("/create", createRules(), validate, subscriptionController.create);

export default router