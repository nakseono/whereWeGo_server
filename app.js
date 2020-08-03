const express = require('express');
require('./models');

const app = express();
app.use(express.json()); // body-parser와 같은 역할을 한다.
const session = require('express-session');

const port = 4000;

app.use(
  session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true
  })
);

app.get('/', (req, res) => {
  res.send('Hello World - server test');
})

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});