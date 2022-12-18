import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import db from './models/index.js';
import authRouter from './router/auth.js';
import farmRouter from './router/farm.js';
import reserveRouter from './router/reserve.js';

const app = express();
const PORT = process.env.PORT || 3000;

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Server Response Success');
})

app.use("/api", router);

// sequelize.sync({force: false})
// .then(()=> {
//   console.log("데이터베이스 연결 성공 !!")
// })
// .catch((err)=> {
//   console.error(err);
// });

db.sequelize
  .sync()
  .then(()=> {
    console.log("데이터베이스 연결 성공!")
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
<<<<<<< HEAD

export { app };
=======
>>>>>>> 4818e69f0a85527dd21350acca9288a53b351582

export {app};