const express = require("express");
require("./models");

const session = require("express-session");
const cors = require("cors");

const app = express();

const port = 4000;

const { signUpController, signInController } = require("./controller/user");

app.use(express.json()); // body-parser와 같은 역할을 한다.

app.use(
  session({
    secret: "secretCode",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.post("/signUp", signUpController);
app.post("/signIn", signInController);

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
