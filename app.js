const express = require('express');
require('./models');

const session = require('express-session');

const app = express();

const port = 4000;

const { 
  signUpController, 
  signInController
} = require('./controller/user');

app.use(express.json()); // body-parser와 같은 역할을 한다.

app.use(
  session({
    secret: 'secretCode',
    resave: false,
    saveUninitialized: true
  })
);

app.post('/signUp', signUpController);
app.post('/signIn', signInController);

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/signIn', (req, res) => {
  res.send('this is signIn page')
})

app.get('/signUp', (req, res) => {
  res.send('this is signUp page')
})