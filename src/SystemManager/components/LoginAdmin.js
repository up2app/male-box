import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormFeild from '../../components/formFeild';
import { useHistory } from 'react-router-dom';


const LoginAdmin = (props) => {

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
                if (data.recordsets[0][0]["IsActive"] === false) {
                    alert("משתמש לא פעיל")
                    setLoader(false)
                    setFaildLogin(true)
                    return
                }
                if (data.recordsets[0][0]["User_Type"] !== 1) {
                    alert("משתמש לא אדמין ")
                    setLoader(false)
                    setFaildLogin(true)
                    return
                }
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
                localStorage.setItem('admin', JSON.stringify(userToLocalStorage))
                localStorage.setItem('tokenadmin', JSON.stringify(token))
                setLoader(false)
                setLoginConfirm(true)
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

    return (
        <>

            <div className="login-admin">
            <div className="center-login">
                <h1>מערכת ניהול</h1>
                <div className={'login active'}>
                    <div className="header-login">
                        <div className="title-login">
                            <h1 className="logoMaleBox3">male box</h1>
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
                        <div className="center">
                            <div style={{position:"absolute"  , margin:"80px"}} className={Loader ? 'loader' : ''}></div>
                        </div>
                        <center><span>v - 1.0.0</span></center>

                    </div>

                </div>
                
            </div>
            </div>

        </>
    )

}

export default LoginAdmin;