const express = require('express')
const router = express.Router()
const AnnualModel= require('../model/annual')

router.get("/",async(req,res)=>{
    console.log('XXXXXXXXannual')
    const result = await AnnualModel.findAll();
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
            annual_order:updateData[i].annual_order,
            test_time:updateData[i].test_time,
            next_time:updateData[i].next_time,
        }
        const updateEveryLoop = await AnnualModel.update(update_newData,{
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
        const deleteEveryLoop = await AnnualModel.update(delete_newData,{
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
          annual_order:insertData[i].annual_order,
          test_time:insertData[i].test_time,
          next_time:insertData[i].next_time,
        }
        const insertEveryLoop = await AnnualModel.create(insert_newData)
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