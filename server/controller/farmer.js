import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import 'express-async-errors';
import { config } from '../config/config.js';
import db from '../models/index.js';

export async function signup(req, res, next) {
	const { phoneNum, password, name, email, role } = req.body;

	try {
		const found = await db.Farmers.findByFarmerEmail(email);
		if (found) {
			throw new Error(`${email} already exists`);
		}
		const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
		const userId = await db.Farmers.createFarmer({
			// userId = user.id
			email,
			password: hashed,
			name,
			phoneNum,
			role,
		});
		const token = createJwtToken(userId);
		res.status(201).json({ token, email });
	} catch (err) {
		next(err);
	}
}

const createJwtToken = (id) => {
	return jwt.sign({ id }, config.jwt, {
		expiresIn: '2d',
	});
};
