const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const OrderModel = sequelize.define("Order",{
    order:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    licence:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:' ',
    },
    driver:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    start_place:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    pass_place:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    end_place:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    driving_time:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    driving_mile:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    reason:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    start_time:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    end_time:{
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

// OrderModel.sync({alter:true})


module.exports = OrderModel