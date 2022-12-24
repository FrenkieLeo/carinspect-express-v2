const express = require('express')
const router = express.Router()
const OrderModel= require('../model/order')

router.get("/",async(req,res)=>{
    console.log('Order')
    const result = await OrderModel.findAll();
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
            order:updateData[i].order,
            licence:updateData[i].licence,
            driver:updateData[i].driver,
            start_place:updateData[i].start_place,
            pass_place:updateData[i].pass_place,
            end_place:updateData[i].end_place,
            driving_time:updateData[i].driving_time,
            driving_mile:updateData[i].driving_mile,
            reason:updateData[i].reason,
            start_time:updateData[i].start_time,
            end_time:updateData[i].end_time
        }
        const updateEveryLoop = await OrderModel.update(update_newData,{
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
        const deleteEveryLoop = await OrderModel.update(delete_newData,{
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
          order:insertData[i].order,
          licence:insertData[i].licence,
          driver:insertData[i].driver,
          start_place:insertData[i].start_place,
          pass_place:insertData[i].pass_place,
          end_place:insertData[i].end_place,
          driving_time:insertData[i].driving_time,
          driving_mile:insertData[i].driving_mile,
          reason:insertData[i].reason,
          start_time:insertData[i].start_time,
          end_time:insertData[i].end_time
        }
        const insertEveryLoop = await OrderModel.create(insert_newData)
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


  router.post("/insert",async(req,res)=>{
    const data = req.body
    const update_result = []
    console.log(data)
    if(data){
      for(let i in data) {
        const insert_newData = {
          order:insertData[i].order,
          licence:insertData[i].licence,
          driver:insertData[i].driver,
          start_place:insertData[i].start_place,
          pass_place:insertData[i].pass_place,
          end_place:insertData[i].end_place,
          driving_time:insertData[i].driving_time,
          driving_mile:insertData[i].driving_mile,
          reason:insertData[i].reason,
          start_time:insertData[i].start_time,
          end_time:insertData[i].end_time
        }
        const insertEveryLoop = await EtcModel.create(insert_newData)
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


module.exports = router