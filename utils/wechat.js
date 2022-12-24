const appid = 'wx7e4d5f68d409220b'
const secret = '292cc98f937bbdbada410c3b60f243ff'
const grant_type = 'client_credential'
const env = 'prod-7gouvh28e181fbff'
// const FormData = require('form-data');

// const fs = require('fs')
const axios = require('axios')
const request = require('request')




const getAccessToken = () => {
    return new Promise((resolve, reject) => {
        request({
          method: 'GET',
          url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appid}&secret=${secret}`, 
        },function (error, response) {
          resolve(JSON.parse(response.body))
        })
      })
}

const getUploadLink = (access_token,file_name) => {
    return new Promise((resolve, reject) => {
        request({
          method: 'Post',
          url: `https://api.weixin.qq.com/tcb/uploadfile?access_token=${access_token}`,
          body:JSON.stringify({
            "env": env,
            "path":file_name
          })
        },function (error, response) {
          if(!error && response.statusCode == 200){
            resolve(JSON.parse(response.body))
          }else{
            reject(error)
          }
        })
      })
}

const uploadFile = (formdata, url, length) => {
  return new Promise((resolve, reject) => {
    axios.post(url,formdata,{
      headers:{
        'Content-length':length,
        'Content-type':'multipart/form-data'
      }
    }).then(res=>{
      console.log('已经上传')
      resolve('success')
    }).catch(err=>{
      console.log('上传失败')
      reject('failure')
    })
  })
}

const getDownload = (access_token, file_list) => {
  return new Promise((resolve,reject) => {
    request({
      method: 'Post',
      url: `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${access_token}`,
      body:JSON.stringify({
        "env": env,
        "file_list": [
          file_list
        ]
      })
    },function (error, response) {
      if(!error && response.statusCode == 200){
        resolve(JSON.parse(response.body))
      }else{
        reject(error)
      }
    })
  })
}

module.exports = {
    getAccessToken,
    getUploadLink,
    uploadFile,
    getDownload
}