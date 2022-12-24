const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const MaintenanceModel = sequelize.define("Maintenance",{
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
    driver:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    maintenance_order:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    maintenance_type:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    maintenance_address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    maintenance_reason:{
        type:DataTypes.STRING,
        allowNull:false
    },
    maintenance_fee:{
        type:DataTypes.STRING,
        allowNull:false
    },
    maintenance_time:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    finish_time:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    current_mile:{
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

// MaintenanceModel.sync({alter:true})


module.exports = MaintenanceModel