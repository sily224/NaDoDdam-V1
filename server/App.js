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
<<<<<<< HEAD
  origin: "http://localhost:3000",
=======
  origin: 'http://localhost:3000',
>>>>>>> 4818e69f0a85527dd21350acca9288a53b351582
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.send("Server Response Success");
});

app.use("/api", router);
=======
app.use('/api', authRouter);
app.use('/api/farms', farmRouter);
app.use('/api', reserveRouter);
>>>>>>> 4818e69f0a85527dd21350acca9288a53b351582

app.get('/', (req, res) => {
  res.send('Server Response Success');
});

db.sequelize
  .sync()
  .then(() => {
<<<<<<< HEAD
    console.log("데이터베이스 연결 성공!");
=======
    console.log('데이터베이스 연결 성공!');
>>>>>>> 4818e69f0a85527dd21350acca9288a53b351582
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
