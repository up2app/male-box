import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FormFeild from '../components/formFeild';
import React, { useState } from 'react';
import ButtonMaleBox from '../components/ButtonMaleBox';




const Register = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [erruserName, setErruserName] = useState(false)
    const [errpassword, setErrpassword] = useState(false)
    const [errfirstname, setErrfirstname] = useState(false)
    const [errlastname, setErrlastname] = useState(false)
    const [erremail, setErremail] = useState(false)
    const [errconfirmPassword, setErrconfirmPassword] = useState(false)
    

    const [RegisterConfirm, setRegisterConfirm] = useState(false)
    const [Loader, setLoader] = useState(false)

    // let res = await fetch(`${url}/cities/cityname`, {
    //     method: 'POST',
    //     body: JSON.stringify({ City_Name: cityName }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },}

    const RegisterUser = async () => {
        setLoader(true)
        setRegisterConfirm(false)
        try{
        let user =   {
            "User_Name": userName,
            "First_Name": firstname,
            "Last_Name": lastname,
            "Password": password,
            "Email": email,
            "User_Image": null,
            "Gender": null,
            "User_Type": 2,
            "IsActive": true,
            "Address": null,
            "City": null,
            "House_Num": null,
            "Postal_Code": null,
            "Phone": null
        }
        
        let res = await fetch('/api/users/register' , {
            method:'POST' , 
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
            
        })
        let data = await res.json()
        if(Number(data.output["User_Id"])!== -1)
        {
            setLoader(false)
            setRegisterConfirm(true);
            return
        }
        if(Number(data.output["User_Id"])=== -1)
        {
            setLoader(false)
            return alert('משתמש כבר קיים במערכת')
        }
        }
        catch(err){console.log(err)}
    }

    const CheckRegister = (e) =>
    {
        e.preventDefault();
        setErruserName(false)
        setErrpassword(false)
        setErrfirstname(false)
        setErrlastname(false)
        setErremail(false)
        setErrconfirmPassword(false)
        let confirm= false;
    
        if(userName === '' )
        {
            setErruserName(true)
            confirm = true
        }
        if(firstname === '')
        {
            setErrfirstname(true)
            confirm = true

        }
        if(lastname === '')
        {
            setErrlastname(true)
            confirm = true

        }
        if( email === '')
        {
            setErremail(true)
            confirm = true

        }
        if(password === '')
        {
            setErrpassword(true)
            confirm = true

        }
        if(confirmPassword === '')
        {
            setErrconfirmPassword(true)
            confirm = true

        }

        if(password !== confirmPassword)
        {
            setErrpassword(true)
            setErrconfirmPassword(true)
            confirm = true

        }

        if(confirm === true)
        {
            return
        }
        console.log("tomer")
        RegisterUser()
    }

    return (

        <>
            <NavBar></NavBar>

            <div className="registerPage">
                <div className="form-regiters">
                    <form action="" onSubmit={e => { CheckRegister(e)}}>
                    <h1>הרשמה</h1>
                        <div className="fields">
                            <FormFeild className="feild" value={firstname} type="text" name="שם פרטי" action={setFirstName} err={errfirstname}/>
                            <FormFeild className="feild" value={lastname}type="text" name="שם משפחה" action={setLastName} err={errlastname}/>
                            <FormFeild className="feild" value={userName}type="text" name="User Name" action={setUserName}err={erruserName} />
                            <FormFeild className="feild" value={email}type="email" name="אימייל" action={setEmail} err={erremail}/>
                            <FormFeild className="feild" value={password}type="password" name="סיסמא" action={setPassword} err={errpassword}/>
                            <FormFeild className="feild" value={confirmPassword}type="password" name="אישור סיסמא" action={setConfirmPassword} err={errconfirmPassword}/>
                            <button className="BtnRegister" type="submit">הרשמה</button>
                        </div>
                        <div className="center">
                        <div className={Loader ? 'loader' : ''}></div>
                        </div>
                        <h2 className={RegisterConfirm ? 'confirmreg active' : 'confirmreg'}>! ההרשמה בוצעה בהצלחה</h2>
                    </form >
                </div>
            </div>
            <Footer></Footer>

        </>
    )
}
export default Register;