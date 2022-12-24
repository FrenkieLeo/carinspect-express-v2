const express = require('express')
const router = express.Router()
const DriversModel= require('../model/drivers')

router.get("/",async(req,res)=>{
    const result = await DriversModel.findAll();
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
          department:updateData[i].department,
          phone:updateData[i].phone,
          license_number:updateData[i].license_number,
          license_expire:updateData[i].license_expire,
          license_type:updateData[i].license_type,
          test_situation:updateData[i].test_situation,
          title:updateData[i].title,
      }
      const updateEveryLoop = await DriversModel.update(update_newData,{
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
      const deleteEveryLoop = await DriversModel.update(delete_newData,{
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
          department:insertData[i].department,
          phone:insertData[i].phone,
          license_number:insertData[i].license_number,
          license_expire:insertData[i].license_expire,
          license_type:insertData[i].license_type,
          test_situation:insertData[i].test_situation,
          title:insertData[i].title
      }
      const insertEveryLoop = await DriversModel.create(insert_newData)
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