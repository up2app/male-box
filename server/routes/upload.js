const express = require("express")
const sql = require("mssql")
const config = require("../utils/config")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../build/images/items')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
    }
  })

  const upload = multer({ storage: storage })

  var route = express.Router()

  route.post('/image', upload.single('item'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any


    // url to test the api: http://localhost:5001/api/upload/image
    
    //TODO: save url to DB
    let urlToSave = `/images/items/${req.file.filename}`
    
    res.send({url:urlToSave})
  })

  module.exports = route

