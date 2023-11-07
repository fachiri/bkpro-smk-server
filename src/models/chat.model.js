module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define("chats", {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    chat: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return Chat;
}