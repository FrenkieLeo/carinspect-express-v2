const express = require('express')
const router = express.Router()
const IllegalModel= require('../model/illegal')

router.get("/",async(req,res)=>{
    console.log('illegal')
    const result = await IllegalModel.findAll();
    const filterData = result.filter(item => {
      return item.show == 1
    })
    res.json({
      code:20000,
      data:filterData
    })
  })

  router.post("/update",async(req,res)=>{
    const data = req.body
    const updateData = data.updateData
    const insertData = data.insertData
    const deleteData = data.deleteData
    const update_result = []
    // 实在没办法，单拎出来搞试试——更新数据
    if(updateData){
      for(let i in updateData) {
        const update_newData = {
            id:updateData[i].id,
            name:updateData[i].name,
            car_type:updateData[i].car_type,
            driver:updateData[i].driver,
            maintenance_type:updateData[i].maintenance_type,
            driver_phone:updateData[i].driver_phone,
            illegal_time:updateData[i].illegal_time,
            illegal_location:updateData[i].illegal_location,
            illegal_behaviour:updateData[i].illegal_behaviour,
            illegal_deduct:updateData[i].illegal_deduct,
            illegal_fee:updateData[i].illegal_fee
        }
        const updateEveryLoop = await IllegalModel.update(update_newData,{
          where:{
            id:update_newData.id
          }
        })
        update_result.push(updateEveryLoop)
      }
    }
    if(deleteData) {
      for(let i in deleteData) {
        const delete_newData = {
            id:deleteData[i].id,
            name:deleteData[i].name,
            show:0
        }
        const deleteEveryLoop = await IllegalModel.update(delete_newData,{
          where:{
            id:delete_newData.id
          }
        })
        update_result.push(deleteEveryLoop)
      }
    }
  
    if(insertData){
      for(let i in insertData) {
        const insert_newData = {
          id:insertData[i].id,
          name:insertData[i].name,
          car_type:insertData[i].car_type,
          driver:insertData[i].driver,
          maintenance_type:insertData[i].maintenance_type,
          driver_phone:insertData[i].driver_phone,
          illegal_time:insertData[i].illegal_time,
          illegal_location:insertData[i].illegal_location,
          illegal_behaviour:insertData[i].illegal_behaviour,
          illegal_deduct:insertData[i].illegal_deduct,
          illegal_fee:insertData[i].illegal_fee
        }
        const insertEveryLoop = await IllegalModel.create(insert_newData)
        update_result.push(insertEveryLoop)
      }
    }
  
    if(update_result){
      res.json({
        code:20000,
        message:'更新成功',
        data:{
          update_result
        }
      })
    }
  })


module.exports = router