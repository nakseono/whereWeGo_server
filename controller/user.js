const { user } = require("../models");

module.exports = {
  signUpController: (req, res) => {
    const { email, password, username } = req.body;

    user
      .findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          email: email,
          password: password,
          username: username,
        },
      })

      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send("사용중인 이메일 입니다.");
        }
        const data = await user.get({ plain: true });
        res.status(201).send("회원가입 성공!");
      })

      .catch((err) => {
        res.status(404).send("err");
        console.log(err);
      });
  },

  signInController: (req, res) => {
    const { email, password } = req.body;
    const sess = req.session;

    user
      .findOne({
        where: {
          email: email,
          password: password,
        },
      })

      .then((data) => {
        if (!data) {
          return res.status(404).send("존재하지 않는 유저입니다.");
        }
        sess.userid = data.id;
        res.status(200).send("로그인 성공!");
      })

      .catch((err) => {
        res.status(404).send("err");
        console.log(err);
      });
  },
};
