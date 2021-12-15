const express = require("express")
const sql = require("mssql")
const config = require("../utils/config")

var route = express.Router()

route.get(`/`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute('SelectAllHomePage')
    let data = await query.recordset
    await db.close()
    res.send(data)

})



route.put(`/updatehomepage`, async (req, res) => {
    let params = req.params
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()

        .input(`MainImage`, sql.NVarChar(sql.MAX), body.MainImage)
        .input(`MainImage1`, sql.NVarChar(sql.MAX), body.MainImage1)
        .input(`MainImage2`, sql.NVarChar(sql.MAX), body.MainImage2)
        .input(`ButtonText`, sql.NVarChar(50), body.ButtonText)
        .input(`Category_Image1`, sql.NVarChar(sql.MAX), body.Category_Image1)
        .input(`Category_Image2`, sql.NVarChar(sql.MAX), body.Category_Image2)
        .input(`Category_Button`, sql.NVarChar(sql.MAX), body.Category_Button)
        .input(`Category_Button2`, sql.NVarChar(sql.MAX), body.Category_Button2)

        .execute(`EditHomePage`)
    let data = await query
    await db.close()
    res.send(data)

})




module.exports = route