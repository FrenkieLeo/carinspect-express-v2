const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const EtcStation = sequelize.define("EtcStation",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
    },
    show:{
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue:1,
    }
})

// (async () => {
//     await sequelize.sync({ force: true });
// })();

// EtcStation.sync({alter:true})


module.exports = EtcStation