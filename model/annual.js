const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const AnnualModel = sequelize.define("Annual",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:' '
    },
    car_type:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:' ',
    },
    annual_order:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    test_time:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    next_time:{
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

// AnnualModel.sync({alter:true})


module.exports = AnnualModel