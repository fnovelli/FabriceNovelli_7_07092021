const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    class User extends Model {}

    User.init({
      // Model attributes are defined here
      Name: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      Nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
      },
      Email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
          type: DataTypes.STRING(64)

      }
    }, {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'User' // We need to choose the model name
    });
    
    // the defined model is the class itself
    console.log(User === sequelize.models.User)};