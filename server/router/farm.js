import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as farmController from '../controller/farm.js';

const router = express.Router();

// GET /api/farms => 모든 농장조회
// GET /api/farms?type=:type => 타입에 따른 농장조회
router.get('/', farmController.getFarms);

// GET /api/farm/location?address=:address => 지역에 따른 농장조회 ex) 경기도, 충청남도, 부산, 서울
router.get('/location', farmController.getByLocation);

// 농장 등록하기 post
router.post('/', farmController.createFarm);
// 농장 정보 수정하기 put

// 농장 정보 삭제하기 delete

export default router;
