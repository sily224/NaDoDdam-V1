import 'express-async-errors';
import db from '../models/index.js';

export async function like(req, res, next) {

    const user_id = req.userId;
    const farm_id = req.params.farmId;

    try {
        const like = await db.LikeFarms.createLike({
            user_id,
            farm_id
        });

        res.status(201).json(like);
    } catch(err) {
        next(err);
    }
}