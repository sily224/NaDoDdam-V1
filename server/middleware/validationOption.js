import { validate } from './validate.js';
import { body } from 'express-validator';

    export const validateLogin = [
        body('email').trim().normalizeEmail().isEmail().withMessage('invalid email'),
        body('password')
            .trim()
            .isLength({ min: 5 })
            .withMessage('password should be at least 5 characters'),
        validate,
    ]

    export const validateSignup = [
        ...validateLogin,
        // body("phoneNum").trim().notEmpty().isMobilePhone().withMessage("phoneNum should be not empty"),
        body('name').trim().notEmpty().withMessage('username should be not empty'),
        validate,
    ]


