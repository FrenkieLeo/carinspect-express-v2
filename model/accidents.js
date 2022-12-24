const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const AccidentsModel = sequelize.define("Accidents",{
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
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    injury:{
        type:DataTypes.STRING,
        allowNull:false
    },
    injury_evaluation:{
        type:DataTypes.STRING,
        allowNull:false
    },
    car_evaluation:{
        type:DataTypes.STRING,
        allowNull:false
    },
    accidents_time:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    thing_evaluation:{
        type:DataTypes.STRING,
        allowNull:false
    },
    total_loss:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
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

// AccidentsModel.sync({alter:true})


module.exports = AccidentsModel