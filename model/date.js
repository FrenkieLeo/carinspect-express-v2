const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const DateModel = sequelize.define("Date",{
    yearday:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    year:{
        type:DataTypes.STRING,
    },
    month:{
        type:DataTypes.STRING,
    },
    date:{
        type:DataTypes.STRING,
    },
    yearweek:{
        type:DataTypes.STRING,
    },
    week:{
        type:DataTypes.STRING,
    },
    weekend:{
        type:DataTypes.STRING,
    },
    workday:{
        type:DataTypes.STRING,
    },
    holiday:{
        type:DataTypes.STRING,
    },
    holiday_or:{
        type:DataTypes.STRING,
    },
    holiday_overtime:{
        type:DataTypes.STRING,
    },
    holiday_today:{
        type:DataTypes.STRING,
    },
    holiday_legal:{
        type:DataTypes.STRING,
    },
    holiday_recess:{
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

// DateModel.sync({alter:true})


module.exports = DateModel