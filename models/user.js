module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user', {

    },
    {}
  );
  user.associate = function(models) {};
  return user;
}// user 테이블에 필요한 스키마 정의하는 파일