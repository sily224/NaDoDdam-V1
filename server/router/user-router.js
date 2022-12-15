import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as authController from '../contoller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('username should be not empty'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('phonNum').trim().notEmpty().isMobilePhone().withMessage("phoneNum should be not empty"),
  body('email').trim().normalizeEmail().isEmail().withMessage('invalid email'),
  validate,
];

// signup
router.post('/signup', validateCredential, authController.signup);
// login
router.post('/login', validateCredential, authController.login);
// me
router.get('/me', isAuth, authController.me); //회원정보 조회
router.get("/userlist", authController.totalUser);

export default router;