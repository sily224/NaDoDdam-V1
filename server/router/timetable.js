import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as timetableController from '../controller/timetable.js';

const router = express.Router();

// GET /timetables
// GET /timetables?date=:date
router.get('/', timetableController.getTimeTables);

// POST /timetables
router.post('/:id', timetableController.createTimeTable);

// PUT /timetable/:id
router.put('/:id', timetableController.updateTimeTable);

// DELETE /timetable/:id
// router.delete('./:id', farmController.removeFarm);
export default router;
