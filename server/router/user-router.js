import { express } from 'express';

const router = express.Router();

router.get("/register", async(req, res, next)=> {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNum = req.body.phoneNum;
    const role = req.body.role;

    const newUser = await userServie.addUser({
        id, email, password, phoneNum, role
    })

    res.status(201).json(newUser);
})

export {router};