const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { User } = require("./models/User");
const config = require("./config/key");

// /application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// /application/json
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World test1"));

app.post("/register", (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  // .save는 mongoDB의 method이다.
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  //! 1. 요청된 이메일을 DB에서 찾는다
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (!user) {
        // 요청한 이메일에 따른 user 가 없다면,
        return res.json({
          // json 형식으로 response를 보낸다.
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다.",
        });
      }

      //! 2. 찾은 이메일에 맞는 비밀번호가 맞는지 검사한다
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });

        //! 3. 비밀번호까지 맞다면 토큰을 생성한다
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          // token을 저장한다 -> cookie, local storage 등등.. -> 우선은 쿠키에다가 넣는다. -> cookieParser 설치해야한다.

          res
            .cookie("x_auth", user.token) //! 현재 매개변수로 들어온 user에 token이 들어가있으므로, 이렇게 .cookie를 이용해 보내주면 cookie에 x_auth라는 이름으로 user.token 의 값이 들어간다.
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
