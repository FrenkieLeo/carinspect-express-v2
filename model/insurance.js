const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const InsuranceModel = sequelize.define("Insurance",{
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
    insurance_type:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    insurance_project:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    company:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    insurance_order:{
        type:DataTypes.STRING,
        allowNull:false
    },
    insurance_fee:{
        type:DataTypes.STRING,
        allowNull:false
    },
    insurance_starttime:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    insurance_endtime:{
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

// InsuranceModel.sync({alter:true})


module.exports = InsuranceModel