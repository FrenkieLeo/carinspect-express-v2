const express = require('express')
const router = express.Router()
const FuelModel= require('../model/fuel')

router.get("/",async(req,res)=>{
    const result = await FuelModel.findAll();
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
            fuel_card:updateData[i].fuel_card,
            gas_station:updateData[i].gas_station,
            fuel_type:updateData[i].fuel_type,
            trade_type:updateData[i].trade_type,
            price:updateData[i].price,
            volume:updateData[i].volume,
            should_pay:updateData[i].should_pay,
            actual_pay:updateData[i].actual_pay,
            trade_time:updateData[i].trade_time
        }
        const updateEveryLoop = await FuelModel.update(update_newData,{
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
        const deleteEveryLoop = await FuelModel.update(delete_newData,{
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
          fuel_card:insertData[i].fuel_card,
          gas_station:insertData[i].gas_station,
          fuel_type:insertData[i].fuel_type,
          trade_type:insertData[i].trade_type,
          price:insertData[i].price,
          volume:insertData[i].volume,
          should_pay:insertData[i].should_pay,
          actual_pay:insertData[i].actual_pay,
          trade_time:insertData[i].trade_time
        }
        const insertEveryLoop = await FuelModel.create(insert_newData)
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