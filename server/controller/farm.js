import 'express-async-errors';
import { config } from '../config/config.js';
import db from '../models/index.js';
import Farms from '../models/farm.js';

// 서비스가 확장되어 타입이 늘어나면 ex (딸기, 수박, 파인애플 등등) 특정타입을 받아 특정타입의 농장을 조회
export async function getFarms(req, res, next) {
  const { type } = req.query;
  const data = await (type
    ? db['Farms'].getByType(type)
    : db['Farms'].getAll());
  if (!data) {
    return res.status(404).json({ message: '해당 농장을 찾을 수 없습니다.' });
  }
  res.status(200).json(data);
}

export async function getByLocation(req, res, next) {
  const { address } = req.query;
  console.log(address);
  const data = await db.Farms.getByAddress(address);
  console.log('data = ', data.dataValues);
  if (!data) {
    return res.status(404).json({ message: '해당지역에는 농장이 없습니다.' });
  }
  res.status(200).json(data);
}

export async function createFarm(req, res, next) {
  const { type, name, address, description, owner } = req.body;
  const farm = await db['Farms'].createFarm({
    type,
    name,
    address,
    description,
    owner,
  });
  res.status(201).json(farm);
}
