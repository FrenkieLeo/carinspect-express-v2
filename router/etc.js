const express = require('express')
const router = express.Router()
const EtcModel= require('../model/etc')

router.get("/",async(req,res)=>{
    const result = await EtcModel.findAll();
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
            etc:updateData[i].etc,
            entry:updateData[i].entry,
            exit:updateData[i].exit,
            should_pay:updateData[i].should_pay,
            actual_pay:updateData[i].actual_pay,
            entry_time:updateData[i].entry_time,
            exit_time:updateData[i].exit_time
        }
        const updateEveryLoop = await EtcModel.update(update_newData,{
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
        const deleteEveryLoop = await EtcModel.update(delete_newData,{
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
          name:insertData[i].name,
          etc:insertData[i].etc,
          entry:insertData[i].entry,
          exit:insertData[i].exit,
          should_pay:insertData[i].should_pay,
          actual_pay:insertData[i].actual_pay,
          entry_time:insertData[i].entry_time,
          exit_time:insertData[i].exit_time
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

  router.post("/insert",async(req,res)=>{
    const data = req.body
    const update_result = []
    console.log(data)
    if(data){
      for(let i in data) {
        const insert_newData = {
          name:data[i].name,
          etc:data[i].etc,
          entry:data[i].entry,
          exit:data[i].exit,
          should_pay:data[i].should_pay,
          actual_pay:data[i].actual_pay,
          entry_time:data[i].entry_time,
          exit_time:data[i].exit_time
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