import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as timetableController from '../controller/timetable.js';

const router = express.Router();

//router.get('/', farmOwnerController.getFarms);

// GET /api/farm/location?address=:address => 지역에 따른 농장조회 ex) 경기도, 충청남도, 부산, 서울
// router.get('/location', farmOwnerController.getByLocation);

// 농장주 등록하기
router.post('/', timetableController.createTimeTable);

// 아래 라우터는 농장소유주 테이블을 만들고 해당 농장의 소유주를 확인하는 미들웨어를 만든 후 구현하기(미구현)

// 농장 정보 수정하기 put
//router.put('/:id', farmController.updateFarm);

// 농장 정보 삭제하기 delete
// router.delete('./:id', farmController.removeFarm);
export default router;
