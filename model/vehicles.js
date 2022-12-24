const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const VehiclesModel = sequelize.define("Vehicles",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    number:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:' '
    },
    department:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'综合管理部'
    },
    model:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    company:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"广州交投实业有限公司"
    },
    car_type:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:'5座SUV'
    },
    belonging:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"实业购买"
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

// VehiclesModel.sync({alter:true})


module.exports = VehiclesModel