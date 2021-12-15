const express = require("express")
const sql = require("mssql")
const config = require("../utils/config")
var route = express.Router()

route.get(`/`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute('select_category')
    let data = await query.recordset
    await db.close()
    res.send(data)

})
route.get(`/:id`, async (req, res) => {

    let params = req.params
    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Category_id`, sql.Int, params.id)
        .execute(`select_category_id`)

    let data = await query.recordset
    await db.close()
    res.send(data[0])
})

route.post(`/addcategory`, async (req, res) => {

    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Category_Name`, sql.NVarChar(50), body.Category_Name)
        .input(`Category_Image`, sql.NVarChar(sql.MAX), body.Category_Image)

        .output(`Category_id`, sql.Int)
        .execute(`add_category`)

    let data = await query

    await db.close()

    res.send(data)

})

route.delete(`/deletecategory/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Category_id`, sql.Int, params.id)
        .execute(`delete_category`)
    let data = await query
    await db.close()
    res.send(data)
})

route.put(`/updatecategory/:id`, async (req, res) => {
    let params = req.params
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Category_id`, sql.Int, params.id)
        .input(`Category_Name`, sql.NVarChar(50), body.Category_Name)
        .input(`Category_Image`, sql.NVarChar(sql.MAX), body.Category_Image)

        .execute(`update_category`)
    let data = await query
    await db.close()
    res.send(data)

})




module.exports = route