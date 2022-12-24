const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const EtcModel = sequelize.define("Etc",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:' ',
    },
    etc:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    entry:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    exit:{
        type:DataTypes.STRING,
        allowNull:false
    },
    should_pay:{
        type:DataTypes.STRING,
        allowNull:false
    },
    actual_pay:{
        type:DataTypes.STRING,
        allowNull:false
    },
    entry_time:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    exit_time:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
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

// EtcModel.sync({alter:true})


module.exports = EtcModel