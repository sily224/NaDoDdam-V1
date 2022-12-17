import 'express-async-errors';
import { config } from '../config/config.js';
import db from '../models/index.js';
import Farms from '../models/farm.js';

export async function getFarms(req, res, next) {
  const { type } = req.query;
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
  console.log(farm);
  res.status(201).json(farm);
}
