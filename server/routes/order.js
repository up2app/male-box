const express = require("express")
const sql = require("mssql")
const config = require("../utils/config")
var route = express.Router()

route.get(`/`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute('select_order')
    let data = await query.recordset
    await db.close()
    res.send(data)

})
route.get(`/allorders`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute('select_all_order')
    let data = await query.recordset
    await db.close()
    res.send(data)

})


route.get(`/ordertoday`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute(`select_order_today`)
    let data = await query.recordset
    await db.close()
    res.send(data)
})
route.get(`/ordermonth`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute(`select_order_month`)
    let data = await query.recordset
    await db.close()
    res.send(data)
})

route.get(`/:id`, async (req, res) => {

    let params = req.params
    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.id)
        .execute(`select_order_id`)

    let data = await query.recordset
    await db.close()
    res.send(data[0])
})


route.get(`/selectorderbyuserid/:id`, async (req, res) => {

    let params = req.params
    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`User_id`, sql.Int, params.id)
        .execute(`select_order_active_not_paid`)

    let data = await query.recordset
    await db.close()
    res.send(data)
})


route.post(`/addorder`, async (req, res) => {

    /*
  @User_id int ,
  @Price_In_Order float,
  @Order_Note NVARCHAR(100) ,
  @Discount Float

     */

    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`User_id`, sql.Int, body.User_id)
        .input(`Price_In_Order`, sql.Float, body.Price_In_Order)
        .input(`Order_Note`, sql.NVarChar(100), body.Order_Note)
        .input(`Discount`, sql.Float, body.Discount)
        .input(`Contact_Name`, sql.NVarChar(50), body.Contact_Name)
        .input(`Contact_Email`, sql.NVarChar(50), body.Contact_Email)
        .input(`Contact_Phone`, sql.NVarChar(50), body.Contact_Phone)

        .output(`Order_Id`, sql.Int)
        .execute(`add_order`)

    let data = await query

    await db.close()

    res.send(data)

})

route.delete(`/deleteorder/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.id)
        .execute(`delete_order`)
    let data = await query
    await db.close()
    res.send(data)
})

route.put(`/updateorder/:id`, async (req, res) => {
    let params = req.params
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()

        .input(`Order_Id`, sql.Int, params.id)
        .input(`User_id`, sql.NVarChar(50), body.User_id)
        .input(`Paid`, sql.NVarChar(sql.MAX), body.Paid)
        .input(`Price_In_Order`, sql.NVarChar(sql.MAX), body.Price_In_Order)
        .input(`Order_Note`, sql.NVarChar(sql.MAX), body.Order_Note)
        .input(`Discount`, sql.NVarChar(sql.MAX), body.Discount)
        .input(`IsActive`, sql.NVarChar(sql.MAX), body.IsActive)
        .input(`Contact_Name`, sql.NVarChar(50), body.Contact_Name)
        .input(`Contact_Email`, sql.NVarChar(50), body.Contact_Email)
        .input(`Contact_Phone`, sql.NVarChar(50), body.Contact_Phone)

        .execute(`update_order`)
    let data = await query
    await db.close()
    res.send(data)

})

route.put(`/activeorder/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error)=>res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.id)
        .execute(`active_order`)
    let data = await query
    await db.close()
    res.send(data)

})




module.exports = route