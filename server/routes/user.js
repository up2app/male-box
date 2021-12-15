const express = require("express")
const sql = require("mssql")
const config = require("../utils/config")
var route = express.Router()
const jwt = require("jsonwebtoken");

route.get(`/`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute('select_user')
    let data = await query.recordset
    await db.close()
    res.send(data)

})
route.get(`/allusers`, async (req, res) => {

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request().execute('select_all_user')
    let data = await query.recordset
    await db.close()
    res.send(data)

})

route.get(`/:id`, async (req, res) => {

    let params = req.params
    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`User_Id`, sql.Int, params.id)
        .execute(`select_user_id`)

    let data = await query.recordset
    await db.close()
    res.send(data[0])
})

route.post(`/register`, async (req, res) => {

    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`User_Name`, sql.NVarChar(50), body.User_Name)
        .input(`First_Name`, sql.NVarChar(50), body.First_Name)
        .input(`Last_Name`, sql.NVarChar(50), body.Last_Name)
        .input(`Email`, sql.NVarChar(50), body.Email)
        .input(`Password`, sql.NVarChar(50), body.Password)
        .input(`User_Type`, sql.Int, body.User_Type)
        .output(`User_Id`, sql.Int)
        .execute(`register_user`)

    let data = await query

    await db.close()

    res.send(data)

})

route.post(`/login`, async (req, res) => {

    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Email`, sql.NVarChar(50), body.Email)
        .input(`Password`, sql.NVarChar(50), body.Password)
        .input(`token`, sql.NVarChar(sql.MAX), body.token)
        .execute(`sign_in_user`)
    let data = await query

    await db.close()

    res.send(data)

})


route.delete(`/deleteuser/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`User_Id`, sql.Int, params.id)
        .execute(`delete_user`)
    let data = await query
    await db.close()
    res.send(data)
})

route.put(`/updateuser/:id`, async (req, res) => {
    let params = req.params
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`User_Id`, sql.Int, params.id)
        .input(`User_Name`, sql.NVarChar(50), body.User_Name)
        .input(`First_Name`, sql.NVarChar(50), body.First_Name)
        .input(`Last_Name`, sql.NVarChar(50), body.Last_Name)
        .input(`Email`, sql.NVarChar(50), body.Email)
        .input(`User_Image`, sql.NVarChar(sql.MAX), body.User_Image)
        .input(`Gender`, sql.NVarChar(1), body.Gender)
        .input(`User_Type`, sql.Int, body.User_Type)
        .input(`IsActive`, sql.Bit, body.IsActive)
        .input(`Address`, sql.NVarChar(50), body.Address)
        .input(`City`, sql.NVarChar(50), body.City)
        .input(`House_Num`, sql.SmallInt, body.House_Num)
        .input(`Postal_Code`, sql.Int, body.Postal_Code)
        .input(`Phone`, sql.NVarChar(50), body.Phone)

        .execute(`update_user`)
    let data = await query
    await db.close()
    res.send(data)

})

route.put(`/activeuser/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`User_Id`, sql.Int, params.id)
        .execute(`active_user`)
    let data = await query
    await db.close()
    res.send(data)

})


route.post(`/forgotpassword`, async (req, res) => {
    let params = req.params
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Email`, sql.NVarChar(50), body.Email)
        .input(`New_Password`, sql.NVarChar(50), body.New_Password)

        .execute(`Forgot_Password`)
    let data = await query
    await db.close()
    res.send(data)

})

route.post(`/logout`, async (req, res) => {
    let body = req.body

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`Email`, sql.NVarChar(50), body.Email)
        .input(`token`, sql.NVarChar(sql.MAX), body.token)

        .execute(`logout`)
    let data = await query
    await db.close()
    res.send(data)

})
route.get(`/selectuserbytoken/:id`, async (req, res) => {
    let params = req.params

    sql.on(`error`, (error) => res.send(error))

    let db = await sql.connect(config.db)
    let query = await db.request()
        .input(`token`, sql.NVarChar(sql.MAX), params.id)
        .execute(`select_user_by_token`)
    let data = await query
    await db.close()
    res.send(data)

})


/////////////////////////////////////

// const users = [
//     {
//         id: "1",
//         email: "john",
//         password: "John0908",
//         isAdmin: true,
//     },
//     {
//         id: "2",
//         email: "jane",
//         password: "Jane0908",
//         isAdmin: false,
//     },
// ];

// let refreshTokens = [];

// route.post("/refresh", (req, res) => {
//     //take the refresh token from the user
//     const refreshToken = req.body.token;

//     //send error if there is no token or it's invalid
//     if (!refreshToken) return res.status(401).json("You are not authenticated!");
//     if (!refreshTokens.includes(refreshToken)) {
//         return res.status(403).json("Refresh token is not valid!");
//     }
//     jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
//         err && console.log(err);
//         refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//         const newAccessToken = generateAccessToken(user);
//         const newRefreshToken = generateRefreshToken(user);

//         refreshTokens.push(newRefreshToken);

//         res.status(200).json({
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//         });
//     });

//     //if everything is ok, create new access token, refresh token and send to user
// });

// // const generateAccessToken = (user) => {
// //     return jwt.sign({ id: user.User_id, isAdmin: user.User_Type }, "mySecretKey", {
// //         expiresIn: "5s",
// //     });
// // };

// // const generateRefreshToken = (user) => {
// //     return jwt.sign({ id: user.User_id, isAdmin: user.User_Type }, "myRefreshSecretKey");
// // };


// // route.post("/login", async (req, res) => {

// //     let body = req.body

// //     let email = body.Email
// //     let password = body.Password


// //     sql.on(`error`, (error) => res.send(error))

// //     let db = await sql.connect(config.db)
// //     let query = await db.request()
// //         .input(`Email`, sql.NVarChar(50), body.Email)
// //         .input(`Password`, sql.NVarChar(50), body.Password)
// //         .execute(`sign_in_user`)
// //     let data = await query


// //     let user = data.recordset[0]
// //     console.log(user)
// //     if (user !== undefined) {
// //         let ok = user.Email === email && user.Password === password;

// //         if (ok) {
// //             //Generate an access token

// //             const accessToken = generateAccessToken(user);
// //             const refreshToken = generateRefreshToken(user);
// //             refreshTokens.push(refreshToken);
// //             res.json({
// //                 email: user.Email,
// //                 isAdmin: user.User_Type,
// //                 accessToken,
// //                 refreshToken,
// //             });

// //         }
// //         else {
// //             res.status(400).json("email or password incorrect!");
// //         }
    
// //     }
// //     else {
// //         res.status(400).json("email or password incorrect!");
// //     }

// // });

// // const verify = (req, res, next) => {
// //     const authHeader = req.headers.authorization;
// //     if (authHeader) {
// //         const token = authHeader.split(" ")[1];
// //         jwt.verify(token, "mySecretKey", (err, user) => {
// //             if (err) {
// //                 return res.status(403).json("Token is not valid!");
// //             }
// //             req.user = user;
// //             next();
// //         });
// //     } else {
// //         res.status(401).json("You are not authenticated!");
// //     }
// // };


// // route.post("/logout", verify, (req, res) => {
// //     const refreshToken = req.body.token;
// //     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
// //     res.status(200).json("You logged out successfully.");
// // });
// // route.post(`/addtoken`, async (req, res) => {
// //     let body = req.body

//     sql.on(`error`, (error) => res.send(error))

//     let db = await sql.connect(config.db)
//     let query = await db.request()
//         .input(`token`, sql.VarBinary(sql.MAX), body.token)
//         .input(`Email`, sql.NVarChar(50), body.Email)
//         .input(`Password`, sql.NVarChar(50), body.Password)
//         .execute(`add_token`)
//     let data = await query
//     await db.close()
//     res.send(data)
// })



module.exports = route