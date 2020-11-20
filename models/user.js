const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt 가 몇자리인지 = 얼마나 복잡하게 암호화 할 것인지.

const userSchema = mongoose.Schema({
  username: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 50,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// bcrypt측에서는 arrow function을 추천하지 않는다.
userSchema.pre("save", function (next) {
  // 비밀번호를 암호화 시킨다.
  var user = this; // 여기서 user는 위에서 만든 userSchema이다 -> index.js의  register에서 user를 만들 때 new User(req.body) 를 했기 때문

  if (user.isModified("password")) {
    // password가 건들여질 때 에만 사용한다. (이메일이나, username 등이 변경될 때에는 사용하지 않도록.)
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
