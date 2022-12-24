const express = require('express')
const router = express.Router()
const AccidentsModel= require('../model/accidents')

router.get("/",async(req,res)=>{
    console.log('accidents')
    const result = await AccidentsModel.findAll();
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
            accidents_time:updateData[i].accidents_time,
            driver:updateData[i].driver,
            phone:updateData[i].phone,
            injury:updateData[i].injury,
            injury_evaluation:updateData[i].injury_evaluation,
            car_evaluation:updateData[i].car_evaluation,
            thing_evaluation:updateData[i].thing_evaluation,
            total_loss:updateData[i].total_loss,
            description:updateData[i].description
        }
        const updateEveryLoop = await AccidentsModel.update(update_newData,{
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
        const deleteEveryLoop = await AccidentsModel.update(delete_newData,{
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
          accidents_time:insertData[i].accidents_time,
          driver:insertData[i].driver,
          phone:insertData[i].phone,
          injury:insertData[i].injury,
          injury_evaluation:insertData[i].injury_evaluation,
          car_evaluation:insertData[i].car_evaluation,
          thing_evaluation:insertData[i].thing_evaluation,
          total_loss:insertData[i].total_loss,
          description:insertData[i].description
        }
        const insertEveryLoop = await AccidentsModel.create(insert_newData)
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