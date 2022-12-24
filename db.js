const { Sequelize, DataTypes } = require("sequelize");


// // 从环境变量中读取数据库配置
// const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;
const MYSQL_ADDRESS = 'sh-cynosdbmysql-grp-as2uyv3y.sql.tencentcdb.com:20531';
const MYSQL_USERNAME = 'root';
const MYSQL_PASSWORD ='FZbuk3nb';

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("carinspect", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
//定义Drivers表
const Drivers = sequelize.define("Drivers",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    department:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
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
    },
    license_expire:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    license_type:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:'C1'
    },
    test_situation:{
        type:DataTypes.STRING,
        allowNull:true
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

// 数据库初始化方法
async function init() {
  await Drivers.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Drivers,
};
