import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import * as Users from '../models/auth.js';
import { config } from '../config/config.js';
import {Router} from "express";
import db from '../models/index.js';
const userRouter = Router();

console.log("db",db['Users'].getUsers());
// export async function signup(req, res, next) {
//   const { phoneNum, password, name, email, role} = req.body;
//   const found = await userRepository.findByUsername(name);
//   if (found) {
//     return res.status(409).json({ message: `${name} already exists`});
//   }
//   const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
//   const userId = await userRepository.createUser({
//     // userId = user.id
//     email,
//     password: hashed,
//     name,
//     phoneNum,
//     role,
//   });
//   const token = createJwtToken(userId);
//   console.log(userId)
//   res.status(201).json({ token, username });
// }

userRouter.post("/signup", async(req, res, next)=> {
  try {
    // if (is.emptyObject(req.body)) {
    //   throw new Error(
    //     "headers의 Content-Type을 application/json으로 설정해주세요"
    //   );
    // }

  const { phoneNum, password, name, email, role} = req.body;
  const found = await db["Users"].findByUsername(name);
  if (found) {
    return res.status(409).json({ message: `${name} already exists`});
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await db["Users"].createUser({
    // userId = user.id
    email,
    password: hashed,
    name,
    phoneNum,
    role,
  });
  const token = createJwtToken(userId);
  console.log(userId)
  res.status(201).json({ token, username });

  } catch(err) {
    next(err);
  }
})


userRouter.get("/userlist", async function (req, res, next) {
  //  로그인인증미들웨어 잠시 삭제함.
  try {
    // 전체 사용자 목록을 얻음
    const users = await db['Users'].getUsers()
    console.log(users);

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});


// export async function login(req, res, next) {
//   const { username, password } = req.body;
//   const user = await Users.findByUsername(username);
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid user or password' });
//   }
//   const isValidPassword = bcrypt.compare(password, user.password);
//   if (!isValidPassword) {
//     return res.status(401).json({ message: 'Invalid user or password' });
//   }
//   const token = createJwtToken(user.id);
//   res.status(200).json({ token, username });
// }

// export async function me(req, res, next) {
//   const user = await Users.findById(req.userId);
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }
//   res.status(200).json({ token: req.token, name: user.name });
// }

const createJwtToken = (id) => {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
};

export {userRouter};