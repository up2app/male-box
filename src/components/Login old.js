import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormFeild from './formFeild';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [erremail, setErremail] = useState(false)
    const [errpassword, setErrpassword] = useState(false)

    const [LoginConfirm, setLoginConfirm] = useState(false)
    const [faildLogin, setFaildLogin] = useState(false)

    const [Loader, setLoader] = useState(false)


    const LoginUser = async () => {
        setLoader(true)
        //setRegisterConfirm(false)
        try {
            let user = {
                "Email": email,
                "Password": password
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
                console.log(data.recordsets[0][0])
                sessionStorage.setItem('user', JSON.stringify(data.recordsets[0][0]))
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
        LoginUser()

    }


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
                                <FormFeild className="feild1" type="text" name="אימייל" action={setEmail} err={erremail} />
                                <FormFeild className="feild1" type="password" name="סיסמא" action={setPassword} err={errpassword} />
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
    else {
        return (
            <>
                <div className={props.open ? 'dark-background active' : 'dark-background'} onClick={props.func}>
                </div>
                <div className="center-login">
                    <div className={props.open ? 'login active' : 'login'}>
                        <div className="header-login">
                            <div className="title-login">
                                <h1>על מנת להמשיך בהזמנה יש לבצע התחברות</h1>
                            </div>
                        </div>
                        <div className="content-login">
                            <form onSubmit={e => { CheckLogin(e) }}>
                                <FormFeild className="feild1" type="text" name="אימייל" action={setEmail} err={erremail} />
                                <FormFeild className="feild1" type="password" name="סיסמא" action={setPassword} err={errpassword} />
                                <button className="BtnLogin" type="submit">המשך בהזמנה</button>
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