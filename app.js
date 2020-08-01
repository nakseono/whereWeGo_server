const express = require('express');
const sequelize = require('./models/index.js');

const app = express();

const port = 4000;

const driver = () => {
  sequelize.sync().then(() => {
    console.log('초기화 완료.');
  }).catch((err) => {
    console.error('초기화 실패');
    console.error(err);
  });
};

driver();

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});