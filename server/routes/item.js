const express = require("express")
const sql = require("mssql")
const config = require("../utils/config")
const multer  = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'images/items')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1])
//     }
//   })

//   const upload = multer({ storage: storage })

var route = express.Router()

route.get(`/`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute('select_items') 
    let data = await query.recordset
    await db.close()
    res.send(data)

})
route.get(`/allitems`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute('select_all_items')
    let data = await query.recordset
    await db.close()
    res.send(data)

})

route.get(`/:id`, async (req, res) => {

    let params = req.params
    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Item_Id`, sql.Int, params.id)
        .execute(`select_item_id`)

    let data = await query.recordset
    await db.close()
    res.send(data[0])
})

route.post(`/additem`, async (req, res) => {

    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Title`, sql.NVarChar(50), body.Title)
        .input(`sku`, sql.NVarChar(50), body.sku)
        .input(`Description`, sql.NVarChar(sql.MAX), body.Description)
        .input(`Item_Image`, sql.NVarChar(sql.MAX), body.Item_Image)
        .input(`Upload_By`, sql.Int, body.Upload_By)
        .input(`Category_Name`, sql.NVarChar(50), body.Category_Name)
        .input(`Price`, sql.Float, body.Price)
        .input(`InStock`, sql.Bit, body.InStock)
        .input(`Color`, sql.NVarChar(50), body.Color)
        .input(`size`, sql.NVarChar(50), body.size)
        .input(`Sell_Price`, sql.Float, body.Sell_Price)
        .input(`Item_Image1`, sql.NVarChar(sql.MAX), body.Item_Image1)
        .input(`Item_Image2`, sql.NVarChar(sql.MAX), body.Item_Image2)
        .input(`Item_Image3`, sql.NVarChar(sql.MAX), body.Item_Image3)


        .output(`Item_Id`, sql.Int)
        .execute(`add_item`)

    let data = await query

    await db.close()

    res.send(data)

})

route.delete(`/deleteitem/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Item_Id`, sql.Int, params.id)
        .execute(`delete_item`)
    let data = await query
    await db.close()
    res.send(data)
})

route.put(`/updateitem/:id`, async (req, res) => {
    let params = req.params
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Item_Id`, sql.Int, params.id)
        .input(`Title`, sql.NVarChar(50), body.Title)
        .input(`sku`, sql.NVarChar(50), body.sku)
        .input(`Description`, sql.NVarChar(sql.MAX), body.Description)
        .input(`Item_Image`, sql.NVarChar(sql.MAX), body.Item_Image)
        .input(`Upload_By`, sql.Int, body.Upload_By)
        .input(`Category_Name`, sql.NVarChar(50), body.Category_Name)
        .input(`Price`, sql.Float, body.Price)
        .input(`InStock`, sql.Bit, body.InStock)
        .input(`Color`, sql.NVarChar(50), body.Color)
        .input(`size`, sql.NVarChar(50), body.size)
        .input(`Sell_Price`, sql.Float, body.Sell_Price)
        .input(`Item_Image1`, sql.NVarChar(sql.MAX), body.Item_Image1)
        .input(`Item_Image2`, sql.NVarChar(sql.MAX), body.Item_Image2)
        .input(`Item_Image3`, sql.NVarChar(sql.MAX), body.Item_Image3)


        .execute(`update_item`)
    let data = await query
    await db.close()
    res.send(data)

})

route.put(`/activeitem/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error)=>res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Item_Id`, sql.Int, params.id)
        .execute(`active_item`)
    let data = await query
    await db.close()
    res.send(data)

})



// route.post('/upload', upload.single('item'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log(req.file, req.body)
//     res.send("cololo")
//   })



module.exports = route