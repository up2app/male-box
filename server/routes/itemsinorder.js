const express = require("express")
const sql = require("mssql")
const config = require("../utils/config")

var route = express.Router()

route.get(`/`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute('selectItemInOrder')
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
        .execute(`selectItemInOrderById`)

    let data = await query.recordset
    await db.close()
    res.send(data[0])
})

route.post(`/additeminorder`, async (req, res) => {

    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Order_Id`, sql.Int, body.Order_Id)
        .input(`Item_Id`, sql.Int, body.Item_Id)
        .input(`Quantity`, sql.Int , body.Quantity)
        
        .execute(`new_add_item_in_order`)

    let data = await query

    await db.close()

    res.send(data)

})

route.delete(`/removeiteminorder/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Item_Id`, sql.Int, params.id)
        .execute(`remove_item_in_order`)
    let data = await query
    await db.close()
    res.send(data)
})

route.put(`/editcountiteminorder/:id`, async (req, res) => {
    let params = req.params
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Order_Id`, sql.Int, params.Order_Id)
        .input(`Item_Id`, sql.Int, body.Item_Id)
        .output(`Quantity`, sql.Int, body.Quantity)      

        .execute(`edit_count_item_in_order`)
    let data = await query
    await db.close()
    res.send(data)

})




module.exports = route