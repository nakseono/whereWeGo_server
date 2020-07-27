// 서버 구동을 위한 모듈들과 라우터, 포트 번호 등을 정의하는 파일이다.
// const express = require('express');
const express = require('express');
require('./models');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const {
  signInController,
  signUpController,
  userContoroller
} = require('./controllers');

const app = express();

const port = 4000;

app.use(
  session({
    secret: '@switzerland',
    resave: false,
    saveUninitialized: true
  })
);

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// ? Optional : cors
app.use(
  cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true
  })
);

app.get('/user', userContoroller);
app.post('/signin', signInController);
app.post('/signup', signUpController);

module.exports = app;
