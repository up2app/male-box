import React, { useState, useEffect } from 'react';
import { BiLogOut } from 'react-icons/bi';
import LinkMenu from './LinkMenu';
const NavBarSys = (props) => {



    const [LogoutConfirm, setLogoutConfirm] = useState(false)

    const [Loader, setLoader] = useState(false)
    const [admin, setAdmin] = useState(null);


    useEffect(() => {

        if (localStorage.getItem('admin')) {

            setAdmin(JSON.parse(localStorage.getItem('admin')))
        }

    }, [])


    const LogOut = async () => {

        const d = new Date();
        let hour = d.getHours();
        let ms = d.getMilliseconds();
        var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        var token = randomToken(16) + hour + ms; // example output → '3ZGErMDCwxTOZYFp'
        setLoader(true)
        setLogoutConfirm(false)
        try {
            let user = {
                "Email": admin[0].email,
                "token": admin[0].token
            }

            let res = await fetch('/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)

            })
            let data = await res.json()
            window.location.reload(true)
            setLoader(false)
            setLogoutConfirm(true)
            localStorage.removeItem('admin')
            localStorage.removeItem('tokenadmin')


        }
        catch (err) { console.log(err) }
    }


    return (

        <>
            {/* <nav className="nav-sys">

                <p style={{fontWeight:"bold"}}>{props.admin[0].User_Name} , שלום </p>

                <h1 className="logoMaleBox3">male box</h1>
                
                {
                    Loader ?<div className="loader" style={{width:"20px" , height:"20px"}}></div> :<button className="btn-logout" onClick={(e) => LogOut()}>התנתק</button> 
                }
            </nav> */}

            <div className="nav-dashboard">
                <div className="nav-dash-header">
                
                <center><h1 className="logoMaleBox4">male box</h1></center>
                <p style={{ fontWeight: "bold" }}>{ admin ?  admin[0].User_Name : ''} , שלום </p>
                {
                    Loader ? <div className="loader" style={{ width: "20px", height: "20px" }}></div> : <button className="btn-logout" onClick={(e) => LogOut()}>התנתק</button>
                }
                </div>
                <div className="nav-dash-contect">
                    
                    <LinkMenu name="ניהול הזמנות" link='/ordermanagement'></LinkMenu>
                    <LinkMenu name="ניהול מוצרים" link='/itemmanagement'></LinkMenu>
                    <LinkMenu name="ניהול משתמשים" link='/usermanagement'></LinkMenu>
                    <LinkMenu name="ניהול קטגוריות" link='/categorymanagement'></LinkMenu>
                    <LinkMenu name="גלריה"></LinkMenu>
                </div>
            </div>

        </>
    )

}


export default NavBarSys;