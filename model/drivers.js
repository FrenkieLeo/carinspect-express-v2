const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const DriversModel = sequelize.define("Drivers",{
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
    department:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'综合管理部'
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    is_driver:{
        type:DataTypes.TINYINT,
        allowNull:false,
        defaultValue:1,
    },
    company:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"广州交投实业有限公司"
    },
    license_number:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:''
    },
    license_expire:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    license_type:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:'C1'
    },
    test_situation:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:'2022已测'
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"员工"
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

// DriversModel.sync({alter:true})


module.exports = DriversModel