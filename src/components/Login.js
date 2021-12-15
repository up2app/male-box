import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormFeild from './formFeild';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";


const Login = (props) => {

    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [erremail, setErremail] = useState(false)
    const [errpassword, setErrpassword] = useState(false)
    const [LoginConfirm, setLoginConfirm] = useState(false)
    const [faildLogin, setFaildLogin] = useState(false)
    const [Loader, setLoader] = useState(false)
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);




    //function to login user and create token on db
    const LoginUser = async () => {
        setLoader(true)
        setLoginConfirm(false)

        const d = new Date();
        let hour = d.getHours();
        let ms = d.getMilliseconds();
        var randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        var token = randomToken(16) + hour + ms; // example output → '3ZGErMDCwxTOZYFp'
        var now = new Date().getTime();
        localStorage.setItem('setupTime', now)

        try {
            let user = {
                "Email": email,
                "Password": password,
                "token": token
            }

            let res = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)

            })
            let data = await res.json()
            if (data.recordsets[0][0] !== undefined) {
                //check if user not active 
                if (data.recordsets[0][0]["IsActive"] === false) {
                    alert("משתמש לא פעיל")
                    setLoader(false)
                    setFaildLogin(true)
                    return
                }

                //create user to local storage 
                let Email = data.recordsets[0][0].Email
                let User_Name = data.recordsets[0][0].User_Name
                let First_Name = data.recordsets[0][0].First_Name
                let Last_Name = data.recordsets[0][0].Last_Name
                let Phone = data.recordsets[0][0].Phone
                let House_Num = data.recordsets[0][0].House_Num
                let City = data.recordsets[0][0].City
                let Postal_Code = data.recordsets[0][0].Postal_Code
                let User_id = data.recordsets[0][0].User_id
                let User_Image = data.recordsets[0][0].User_Image
                let User_Type = data.recordsets[0][0].User_Type
                let IsActive = data.recordsets[0][0].IsActive
                let Address = data.recordsets[0][0].Address

                let userToLocalStorage = [{
                    Email, User_Name, First_Name, Last_Name
                    , Phone, House_Num, City, Postal_Code, User_id, User_Image, User_Type, IsActive, Address
                }]
                //set in local storage
                localStorage.setItem('user', JSON.stringify(userToLocalStorage))
                localStorage.setItem('token', JSON.stringify(token))

                setLoader(false)
                setLoginConfirm(true)
                props.func()
                window.location.reload(true)
            }
            else {
                setLoader(false)
                setLoginConfirm(false)
                setFaildLogin(true)
            }
        }
        catch (err) { console.log(err) }
    }

    // Check if the user has filled in all the details
    const CheckLogin = (e) => {
        e.preventDefault();
        setErrpassword(false)
        setErremail(false)
        setFaildLogin(false)
        let confirm = false;

        if (email === '') {
            setErremail(true)
            confirm = true

        }
        if (password === '') {
            setErrpassword(true)
            confirm = true

        }
        if (confirm == true) {
            return
        }
        LoginUser(e)

    }

    //Login to connect to the account
    if (!props.fromOrder) {
        return (
            <>
                <div className={props.open ? 'dark-background active' : 'dark-background'} onClick={props.func}>
                </div>
                <div className="center-login">
                    <div className={props.open ? 'login active' : 'login'}>
                        <div className="btn-close" onClick={props.func}>
                        </div>
                        <div className="header-login">
                            <div className="title-login">
                                <h1>התחברות</h1>
                            </div>
                        </div>
                        <div className="content-login">
                            <form onSubmit={e => { CheckLogin(e) }}>
                                <FormFeild className="feild1" value={email} type="text" name="אימייל" action={setEmail} err={erremail} />
                                <FormFeild className="feild1" value={password} type="password" name="סיסמא" action={setPassword} err={errpassword} />
                                <button className="BtnLogin" type="submit">התחברות</button>

                            </form>
                        </div>
                        <div className="footer-login">
                            <div className={faildLogin ? 'faildLogin active' : 'faildLogin'}>שם המשתמש או הסיסמא שגויים</div>
                            <Link className="alreadyAccount" to={"/Register"}>אין לי עדיין חשבון</Link>
                            <div className="center">
                                <div className={Loader ? 'loader' : ''}></div>
                            </div>
                        </div>

                    </div>
                </div>

            </>
        )
    }
     //Login to continue ordering
    else {
        return (
            <>
                <div className={props.open ? 'dark-background active' : 'dark-background'} onClick={props.func}>
                </div>
                <div className="center-login">
                    <div className={props.open ? 'login active' : 'login'}>
                        <div className="header-login">
                            <div className="title-login">
                                <h1>על מנת להמשיך יש לבצע התחברות</h1>
                            </div>
                        </div>
                        <div className="content-login">
                            <form onSubmit={e => { CheckLogin(e) }}>
                                <FormFeild className="feild1" value={email} type="text" name="אימייל" action={setEmail} err={erremail} />
                                <FormFeild className="feild1" value={password} type="password" name="סיסמא" action={setPassword} err={errpassword} />
                                <button className="BtnLogin" type="submit">המשך</button>
                            </form>
                        </div>
                        <div className="footer-login">
                            <div className={faildLogin ? 'faildLogin active' : 'faildLogin'}>שם המשתמש או הסיסמא שגויים</div>
                            <Link className="alreadyAccount" to={"/Register"}>אין לי עדיין חשבון</Link>
                            <div className="center">
                                <div className={Loader ? 'loader' : ''}></div>
                            </div>
                        </div>

                    </div>
                </div>

            </>
        )


    }

}

export default Login;