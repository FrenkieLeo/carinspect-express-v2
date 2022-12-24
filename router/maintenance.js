const express = require('express')
const router = express.Router()
const MaintenanceModel= require('../model/maintenance')

router.get("/",async(req,res)=>{
    console.log('maintenance')
    const result = await MaintenanceModel.findAll();
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
            driver:updateData[i].driver,
            maintenance_order:updateData[i].maintenance_order,
            maintenance_type:updateData[i].maintenance_type,
            maintenance_project:updateData[i].maintenance_project,
            maintenance_address:updateData[i].maintenance_address,
            maintenance_reason:updateData[i].maintenance_reason,
            maintenance_reason:updateData[i].maintenance_reason,
            maintenance_fee:updateData[i].maintenance_fee,
            maintenance_time:updateData[i].maintenance_time,
            finish_time:updateData[i].finish_time,
            current_mile:updateData[i].current_mile,
        }
        const updateEveryLoop = await MaintenanceModel.update(update_newData,{
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
        const deleteEveryLoop = await MaintenanceModel.update(delete_newData,{
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
          driver:insertData[i].driver,
          maintenance_order:insertData[i].maintenance_order,
          maintenance_type:insertData[i].maintenance_type,
          maintenance_project:insertData[i].maintenance_project,
          maintenance_address:insertData[i].maintenance_address,
          maintenance_reason:insertData[i].maintenance_reason,
          maintenance_fee:insertData[i].maintenance_fee,
          maintenance_time:insertData[i].maintenance_time,
          finish_time:insertData[i].finish_time,
          current_mile:insertData[i].current_mile,
        }
        const insertEveryLoop = await MaintenanceModel.create(insert_newData)
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