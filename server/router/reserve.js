import express from 'express';
import 'express-async-errors';
import * as reserveController from '../controller/reserve.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/reserve', isAuth, reserveController.reserve); //예약 등록

router.get('/reserve', isAuth, reserveController.getReserveData); // user 예약 조회

// router.delete('/reserve',isAuth, reserveController.reserveDrop); //예약 삭제

// router.patch('/reserve/:id', isAuth, reserveController.reserveUpdate);

export default router;
