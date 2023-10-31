module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    username: {
      type: Sequelize.CHAR(30),
      unique: true,
      allowNull: false
    },
    master_number: {
      type: Sequelize.CHAR(20),
      allowNull: false,
      unique: true
    },
    role: {
      type: Sequelize.CHAR(5),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    remember_token: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    },
    class: {
      type: Sequelize.STRING
    }
  })

  return User;
}