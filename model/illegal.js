const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const IllegalModel = sequelize.define("Illegal",{
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
        unique:'name',
    },
    car_type:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:' ',
    },
    driver:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    driver_phone:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    illegal_location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    illegal_behaviour:{
        type:DataTypes.STRING,
        allowNull:false
    },
    illegal_deduct:{
        type:DataTypes.STRING,
        allowNull:false
    },
    illegal_time:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    illegal_fee:{
        type:DataTypes.STRING,
        allowNull:false
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

// IllegalModel.sync({alter:true})


module.exports = IllegalModel