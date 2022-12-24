const { Sequelize, DataTypes } = require("sequelize");
const{sequelize} = require('./init')


const FilesModel = sequelize.define("FilesModel",{
    file_id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        unique:'file_id',
        primaryKey:true,
    },
    module_name:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'附件模块',
    },
    click_id:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    click_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    file_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    cloud_id:{
        type:DataTypes.STRING,
        unique:'cloud_id',
        allowNull:true,
    },
    env:{
        type:DataTypes.STRING,
        allowNull:true,
        comment:'环境id',
        defaultValue:'prod-8gq9maz9a2ab0d3d'
    },
    app_id:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: 'wxffb18c76c3fe00cf'
    },
    download:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    max_age:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    token:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    file_type:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    file_size:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    file_date:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue: DataTypes.UUIDV4
    },
    status: {
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    }
})

// (async () => {
//     await sequelize.sync({ force: true });
// })();

// FilesModel.sync({alter:true})
// ,{
//     indexes: [
//         {
//           unique: true,
//           fields: ['file_id']
//         },
//     ]
// }

module.exports = FilesModel