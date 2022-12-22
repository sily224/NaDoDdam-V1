import 'express-async-errors';
import db from '../models/index.js';

export async function like(req, res, next) {

    const user_id = req.userId;
    const farm_id = req.params.farmId;

    try {
        const user = await db.LikeFarms.findLike(user_id)
        const data = [];

        user.forEach((user)=> data.push(user.farm_id));

        if(data.includes(Number(farm_id))) {
            throw new Error("이미 찜한 농장입니다.")
        }
        
        const like = await db.LikeFarms.createLike({
            user_id,
            farm_id
        });

        res.status(201).json(like);
    } catch(err) {
        next(err);
    }
}

export async function likecancel(req, res, next) {
    const user_id = req.userId;
    const farm_id = req.params.farmId; 

    try {
        const found = await db.LikeFarms.findLike(user_id) 

        if(!found) {
            throw new Error("해당 유저가 찜한 체험은 없습니다.")
        }

        const data =[];
        found.forEach((found)=> data.push(found.farm_id))

        if(!(data.includes(Number(farm_id)))) {
            throw new Error("해당 농장에 대한 찜 정보가 없습니다.")
        }

        const cancel = await db.LikeFarms.deleteLike(user_id, farm_id);

        res.status(200).json({message: "delete!"})
    } catch(err) {
        next(err);
    }
}

export async function getLikeData(req, res, next) {
    const user_id = req.userId;

    try{
        const found = await db.LikeFarms.findLike(user_id);

        if(!found) {
            throw new Error("해당 유저가 찜한 체험은 없습니다.")
        }

        res.status(200).json(found)
    }catch(err) {

    }
}