const express = require('express')
const router = express.Router()
const VehiclesModel= require('../model/vehicles')

router.get("/",async(req,res)=>{
    const result = await VehiclesModel.findAll();
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
    console.log('insertdata',data)
    const updateData = data.updateData
    const insertData = data.insertData
    const deleteData = data.deleteData
    const update_result = []
    // 实在没办法，单拎出来搞试试——更新数据
    if(updateData){
      for(let i in updateData) {
        const update_newData = {
            id:updateData[i].id,
            number:updateData[i].number,
            department:updateData[i].department,
            company:updateData[i].company,
            model:updateData[i].model,
            car_type:updateData[i].car_type,
            belonging:updateData[i].belonging
        }
        const updateEveryLoop = await VehiclesModel.update(update_newData,{
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
            number:deleteData[i].number,
            show:0
        }
        const deleteEveryLoop = await VehiclesModel.update(delete_newData,{
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
            number:insertData[i].number,
            department:insertData[i].department,
            company:insertData[i].company,
            model:insertData[i].model,
            car_type:insertData[i].car_type,
            belonging:insertData[i].belonging
        }
        console.log('insertData', insertData)
        const insertEveryLoop = await VehiclesModel.create(insert_newData)
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