const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const FuelModel = sequelize.define("Fuel",{
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
    fuel_card:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    trade_type:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'加油'
    },
    gas_station:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    fuel_type:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'95'
    },
    price:{
        type:DataTypes.STRING,
        allowNull:false
    },
    volume:{
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
    trade_time:{
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

// FuelModel.sync({alter:true})


module.exports = FuelModel