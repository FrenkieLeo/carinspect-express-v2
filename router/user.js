const express = require('express')
const router = express.Router()
const UsersModel = require('../model/users')
const jwt = require('jsonwebtoken')
const {verify} = require('../utils/auth')



router.post("/login",(req,res,next)=>{
    console.log('you are in login module')
    const username = req.body.username
    const password = req.body.password
    UsersModel.findOne({
        where:{
            user_name:username
        }
    }).then(function(user){
        if(!user){
            return res.json({
                code:40000,
                message:'账号不存在',
                data:{}
            })
        }
        if(!user.status){
            return res.json({
                code:4000,
                message:'账号已停用',
                data:{}
            })
        }
        if(user.password == password){
            // 设置token
            const token =jwt.sign(
                {
                    _id:user.user_id,
                    username:user.user_name
                },
                'frenkieLeo',
                {
                    expiresIn: 3600*48
                }
            )
            return res.json({
                code: 20000,
                message: '登录成功',
                data: {
                    token:token
                }
              })
        }else{
            return res.json({
                code: 40000,
                message: '密码错误',
                data:{}
              })
        }
    })
})

router.get("/info",(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token.split(' ')[1],'frenkieLeo',function(err,data){
        if(err && err.message === 'invalid token'){
            return res.json({
                code:50008,
                message:'无效token'
            })
        }
        if(err && err.message === 'jwt expired'){
            return res.json({
                code:50014,
                message:'Token expired'
            })
        }
        return res.json({
            code:20000,
            message:'获取用户信息',
            data:data
        })
    })    
  })


router.post('/logout',(req,res)=>{
    return res.json({
        code:20000,
        message:'注销成功',
        data:null
    })
})

module.exports = router