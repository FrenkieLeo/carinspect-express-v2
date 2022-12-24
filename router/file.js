const express = require('express')
const router = express.Router()
const FilesModel= require('../model/files.js')
// const multipart = require('connect-multiparty')
const multiparty = require('multiparty');
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')
// var multipartMiddleware = multipart();

const {getAccessToken , getUploadLink , uploadFile, getDownload} = require('../utils/wechat');
const { resolve } = require('path');
const { rejects } = require('assert');
let currentUrl, filePath, fileName, save_module, save_spec, save_name, save_id

router.post("/", async(req,res)=>{
  //创建static文件，上传成功之后就删除
    let form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.uploadDir = path.resolve(__dirname, "../static");
    form.parse(req, (err, fields, files)=>{
      filePath = files.file[0].path
      fileName = files.file[0].originalFilename
      save_module = fields.click_module[0]
      save_spec = `${fields.click_name[0]}_${fields.click_id[0]}`
      save_name = fields.click_name[0]
      save_id = fields.click_id[0]
    })
    

    const tokenBody = await getAccessToken()
    const access_token = tokenBody.access_token
    let uploadLink = await getUploadLink(access_token,`${save_module}/${save_spec}/${fileName}`)
    currentUrl = uploadLink.url
    let file_id = uploadLink.file_id

    



    
    const data = new FormData()
    data.append("key", `${save_module}/${save_spec}/${fileName}`);
    data.append("Signature", uploadLink.authorization);
    data.append("x-cos-security-token", uploadLink.token);
    data.append("x-cos-meta-fileid", uploadLink.cos_file_id);

    const file =  fs.createReadStream(filePath);
    data.append("file", file);

    const dataLength = await new Promise((resolve,reject)=>{
      data.getLength((err,len)=>{
        if(err){ 
          reject(err)
        }
        resolve(len)
      })
    })

    const uploadFileResult = await new Promise((resolve,reject) => {
      uploadFile(data,currentUrl,dataLength).then(res=>{
        if(res == 'success'){
          resolve('success')
        }else{
          reject('failure')
        }
      }).catch(err => {
        console.log(err)
        res.json({
          code:40000,
          message:'上传失败，请重新尝试！也许是文件过大',
          data:err
        })
      })
    })

    const file_list = {
      fileid: file_id,
      max_age:7200
    }
    const downloadLink = await new Promise((resolve,reject)=>{
      if(uploadFileResult == 'success'){
        getDownload(access_token,file_list).then(res => {
          console.log('uploadFile',res)
          if(res.file_list[0].download_url){
            const download = res.file_list[0].download_url
            resolve(download)
          }else{
            resolve('failure')
          }
        }).catch(err=> {
          console.log('uploadError',err)
        })
      }
    })

      console.log('get download link',downloadLink)
      if(downloadLink !== 'failure'){
        const fileInfo = await FilesModel.create({
          module_name: save_module,
          click_id: save_id,
          click_name:save_name,
          file_name: fileName,
          cloud_id: file_id,
          download:downloadLink,
          token:access_token,
          max_age:7200
        })
        if(uploadLink.errcode == 0){
          res.json({
            code:20000,
            data:fileInfo
          })
        }
      }
    
    // console.log('already get upload link', download)
    

    

    
})

router.post("/getFileInfo",async(req,res)=>{
  const data =  req.body
  const file = await new Promise((resolve,reject)=>{
      FilesModel.findAll({
        where:{
          module_name:data.click_module,
          click_name:data.click_name,
          status:1
        }
    }).then(res => {
      if(res){
        resolve(res)
      }else{
        resolve('cannot get relative')
      }
    })
  })
  res.json({
    code:20000,
    data:file
  })
})


router.post("/deleteFile",async(req,res)=>{
  const data =  req.body
  const selected = data.selectRecords
  const clicked = data.click
  console.log('you want to delete', selected)
  let deleteResult = []
  if(selected){
    for(let i in selected) {
      const deleteData = {
          name:selected[i].name,
          status:0
      }
      const handle_delete = await new Promise((resolve,reject)=>{
        FilesModel.update(deleteData,{
          where:{
            module_name:clicked.click_module,
            click_name: clicked.click_name
          }
        }).then(res => {
          if(res){
            resolve('deleted')
          }else{
            reject('cannot delete files')
          }
        })
      })
      if(handle_delete == 'deleted'){
        deleteResult.push(1)
      }
    }
    if(deleteResult.length == selected.length){
      res.json({
        code:20000,
        message:'you have successfully deleted files'
      })
    }else{
      res.json({
        code:40000,
        message:'some files did not be deleted'
      })
    }
  }
})



module.exports = router