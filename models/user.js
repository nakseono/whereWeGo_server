module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    // 스키마를 보고, 연결된 테이블을 여기서 연결시킨다.
  };
  return user;
};
