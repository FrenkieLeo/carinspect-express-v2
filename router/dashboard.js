const express = require('express')
const router = express.Router()
const OrderModel = require('../model/order')
const FuelModel = require('../model/fuel')
const EtcModel = require('../model/etc')
const DateModel = require('../model/date')
const EtcStationModel = require('../model/etcStation')
const VehiclesModel = require('../model/vehicles')
const path = require('path')
const fs = require('fs-extra')  // 文件读写
const iconv = require('iconv-lite');  //  数据编码转换
const Json2csvParser = require('json2csv').Parser;


let allData = ''
router.get("/", async (req, res) => {
  console.log('getDashboardData')
  const returnData = {}
  // 日里程超过200公里
  const order_database = await OrderModel.findAll();
  returnData['problemMile'] = order_database.filter(item => {
    return parseFloat(item.driving_mile) >= 200
  })

  // 周末/节假日用车
  const date_database = await DateModel.findAll({
    where: {
      workday: 2
    }
  });
  const date_data = []
  for (i in date_database) {
    date_data.push(date_database[i].date)
  }
  const order_data = []
  for (let i in order_database) {
    const id = '' + order_database[i].order
    const time = new Date(order_database[i].start_time)
    const year = time.getFullYear()
    const month = time.getMonth() < 9 ? '0' + time.getMonth() + 1 : time.getMonth() + 1
    const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    order_data.push(['' + year + '' + month + '' + date, id])
  }
  const problemHoliday = []
  for (let i in order_data) {
    if (date_data.indexOf(order_data[i][0]) > -1) {
      problemHoliday.push(order_data[i][1])
    }
  }
  let problemOrder = []
  for (i in problemHoliday) {
    const findOrder = await OrderModel.findOne({
      where: {
        order: problemHoliday[i]
      }
    })
    problemOrder.push(findOrder)
  }

  returnData['problemHoliday'] = problemOrder





  // returnData['holiday_data'] = order_database.filter(item => {
  //   return Date.get
  // })

  // 连续加油预警
  const DateMinus = function (date1, date2) {
    const sdate = new Date(date1);
    const now = new Date(date2);
    const days = now.getTime() - sdate.getTime();
    console.log('dateMinus', days)
    const day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
  }
  const vehicles_database = await VehiclesModel.findAll({
    attributes: ['number']
  })
  const vehicles = []
  for (let i in vehicles_database) {
    vehicles.push(vehicles_database[i].number)
  }
  let problemFuel = []
  for (let i in vehicles) {
    const spec_vehicle_data = await FuelModel.findAll({
      where: {
        name: vehicles[i],
        trade_type: '加油'
      },
      order: [
        ['trade_time', 'DESC']
      ]
    });
    const specList = []
    for (let j in spec_vehicle_data) {
      specList.push([new Date(spec_vehicle_data[j].trade_time).getMonth(), new Date(spec_vehicle_data[j].trade_time).getDate(), spec_vehicle_data[j].trade_time])
    }
    for (let z in specList) {
      if (z > 0) {
        const monthMinus = specList[z - 1][0] - specList[z][0]
        const dateMinus = specList[z - 1][1] - specList[z][1]
        if (monthMinus == 0 && dateMinus < 3) {
          problemFuel.push({ name: vehicles[i], secondTime: specList[z - 1][2], firstTime: specList[z][2] })
        } else if (monthMinus > 0) {
          problemFuel.push({ name: vehicles[i], secondTime: specList[z - 1][2], firstTime: specList[z][2] })
        }
      }
    }
  }

  returnData['fuel_data'] = problemFuel

  // 离穗用车
  const etc_database = await EtcModel.findAll({
    attributes: ['name', 'entry', 'exit', 'entry_time']
  })
  const etcStation_database = await EtcStationModel.findAll()
  const stationList = []
  const problemEtc = []
  for (let i = 0; i < etcStation_database.length; i++) {
    stationList.push(etcStation_database[i].name)
  }
  for (let i = 0; i < etc_database.length; i++) {
    if (stationList.indexOf(etc_database[i].entry) == -1 || stationList.indexOf(etc_database[i].exit) == -1) {
      problemEtc.push(etc_database[i])
    }
  }

  returnData['leaveGZ_data'] = problemEtc
  allData = returnData
  res.json({
    code: 20000,
    data: returnData
  })
})

router.get("/problem/:name", async (req, res, next) => {
  const returnData = {}
  // 日里程超过200公里
  const order_database = await OrderModel.findAll();
  let filterOrder = order_database.filter(item => {
    return parseFloat(item.driving_mile) >= 200
  })
  let problemMile = []
  for (let i in filterOrder) {
    problemMile.push(filterOrder[i].dataValues)
  }
  returnData['problemMile'] = problemMile


  // 周末/节假日用车
  const date_database = await DateModel.findAll({
    where: {
      workday: 2
    }
  });
  const date_data = []
  for (i in date_database) {
    date_data.push(date_database[i].date)
  }
  const order_data = []
  for (let i in order_database) {
    const id = '' + order_database[i].order
    const time = new Date(order_database[i].start_time)
    const year = time.getFullYear()
    const month = time.getMonth() < 9 ? '0' + time.getMonth() + 1 : time.getMonth() + 1
    const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    order_data.push(['' + year + '' + month + '' + date, id])
  }
  const problemHoliday = []
  for (let i in order_data) {
    if (date_data.indexOf(order_data[i][0]) > -1) {
      problemHoliday.push(order_data[i][1])
    }
  }
  let problemOrder = []
  for (i in problemHoliday) {
    const findOrder = await OrderModel.findOne({
      where: {
        order: problemHoliday[i]
      }
    })
    problemOrder.push(findOrder.dataValues)
  }


  returnData['problemHoliday'] = problemOrder





  // returnData['holiday_data'] = order_database.filter(item => {
  //   return Date.get
  // })

  // 连续加油预警
  const DateMinus = function (date1, date2) {
    const sdate = new Date(date1);
    const now = new Date(date2);
    const days = now.getTime() - sdate.getTime();
    console.log('dateMinus', days)
    const day = parseInt(days / (1000 * 60 * 60 * 24));
    return day;
  }
  const vehicles_database = await VehiclesModel.findAll({
    attributes: ['number']
  })
  const vehicles = []
  for (let i in vehicles_database) {
    vehicles.push(vehicles_database[i].number)
  }
  let problemFuel = []
  for (let i in vehicles) {
    const spec_vehicle_data = await FuelModel.findAll({
      where: {
        name: vehicles[i],
        trade_type: '加油'
      },
      order: [
        ['trade_time', 'DESC']
      ]
    });
    const specList = []
    for (let j in spec_vehicle_data) {
      specList.push([new Date(spec_vehicle_data[j].trade_time).getMonth(), new Date(spec_vehicle_data[j].trade_time).getDate(), spec_vehicle_data[j].trade_time])
    }
    for (let z in specList) {
      if (z > 0) {
        const monthMinus = specList[z - 1][0] - specList[z][0]
        const dateMinus = specList[z - 1][1] - specList[z][1]
        if (monthMinus == 0 && dateMinus < 3) {
          problemFuel.push({ name: vehicles[i], secondTime: specList[z - 1][2], firstTime: specList[z][2] })
        } else if (monthMinus > 0) {
          problemFuel.push({ name: vehicles[i], secondTime: specList[z - 1][2], firstTime: specList[z][2] })
        }
      }
    }
  }

  returnData['fuel_data'] = problemFuel

  // 离穗用车
  const etc_database = await EtcModel.findAll({
    attributes: ['name', 'entry', 'exit', 'entry_time']
  })
  const etcStation_database = await EtcStationModel.findAll()
  const stationList = []
  const problemEtc = []
  for (let i = 0; i < etcStation_database.length; i++) {
    stationList.push(etcStation_database[i].name)
  }
  for (let i = 0; i < etc_database.length; i++) {
    if (stationList.indexOf(etc_database[i].entry) == -1 || stationList.indexOf(etc_database[i].exit) == -1) {
      problemEtc.push(etc_database[i].dataValues)
    }
  }
  // console.log('leaveGZ', etc_database[3])
  returnData['leaveGZ_data'] = problemEtc
  res.locals.data = returnData
  next()
},
  (req, res, next) => {
    let options = {
      root: path.join(__dirname, '../static/problemFile/'),
      dotfiles: 'ignore',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
    const name = req.params.name
    const fileName = name + '.csv'
    const route = options.root + fileName
    const csvData = res.locals.data[name]
    const keys = Object.keys(csvData[0])//field
    let json2csvParser1 = new Json2csvParser({ keys });
    let tocsv = json2csvParser1.parse(csvData)
    tocsv = tocsv.replace(/\"/g, '')
    // console.log('tocsv',csvData)
    fs.writeFile(route, `\ufeff${tocsv}`, 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    // res.sendFile(fileName, options, function (err) {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log('Sent:', fileName)
    //   }
    // })
    console.log('route', route)
    res.setHeader('Content-Type', 'application/vnd.ms-excel;charset=utf-8')
    res.setHeader('Cache-Control','must-revalidate, post-check=0, pre-check=0');
    res.setHeader('Content-Type','application/force-download');
    res.setHeader('Content-Type','application/octet-stream');
    res.setHeader('Content-Type','application/download');
    res.setHeader('Content-Disposition',`attachment;filename=${name}.csv `);
    res.download(route, fileName, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('downloaded', fileName)
      }
    })

    // res.json(
    //   {
    //     data:tocsv
    //   }
    // )
  })

router.post("/update", async (req, res) => {
  const data = req.body
  for (let i in data) {
    const returnData = {
      yearday: data[i].yearday,
      year: data[i].year,
      month: data[i].month,
      date: data[i].date,
      yearweek: data[i].yearweek,
      week: data[i].week,
      weekend: data[i].weekend,
      workday: data[i].workday,
      holiday: data[i].holiday,
      holiday_or: data[i].holiday_or,
      holiday_overtime: data[i].holiday_overtime,
      holiday_today: data[i].holiday_today,
      holiday_legal: data[i].holiday_legal,
      holiday_recess: data[i].holiday_recess,
    }
    await DateModel.create(returnData)
  }

  res.json({
    code: 20000,
    message: '更新成功',
    data: data
  })
})


module.exports = router