const express = require('express')
const router = express.Router()
const InsuranceModel= require('../model/insurance')

router.get("/",async(req,res)=>{
    console.log('insurance')
    const result = await InsuranceModel.findAll();
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
          insurance_type:updateData[i].insurance_type,
          insurance_project:updateData[i].insurance_project,
          company:updateData[i].company,
          insurance_order:updateData[i].insurance_order,
          insurance_fee:updateData[i].insurance_fee,
          insurance_starttime:updateData[i].insurance_starttime,
          insurance_endtime:updateData[i].insurance_endtime
        }
        const updateEveryLoop = await InsuranceModel.update(update_newData,{
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
        const deleteEveryLoop = await InsuranceModel.update(delete_newData,{
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
          insurance_type:insertData[i].insurance_type,
          insurance_project:insertData[i].insurance_project,
          company:insertData[i].company,
          insurance_order:insertData[i].insurance_order,
          insurance_fee:insertData[i].insurance_fee,
          insurance_starttime:insertData[i].insurance_starttime,
          insurance_endtime:insertData[i].insurance_endtime
        }
        const insertEveryLoop = await InsuranceModel.create(insert_newData)
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