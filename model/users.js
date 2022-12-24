const {Sequelize,DataTypes} = require('sequelize')
const{sequelize} = require('./init')

const UsersModel = sequelize.define('Users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    status: {
      type: Sequelize.TINYINT,
      allowNull:false,
      defaultValue: 0
    }
  })


// UsersModel.sync({alter:true})

module.exports = UsersModel
