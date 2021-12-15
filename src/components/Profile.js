import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormFeild from './formFeild';
import { useHistory } from 'react-router-dom';


const Profile = (props) => {


    //vars
    const history = useHistory()
    const [userName, setUserName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [User_Image, setUser_Image] = useState('');
    const [Gender, setGender] = useState('');
    const [User_Type, setUser_Type] = useState('');
    const [IsActive, setIsActive] = useState('');
    const [Address, setAddress] = useState('');
    const [City, setCity] = useState('');
    const [House_Num, setHouse_Num] = useState('');
    const [Postal_Code, setPostal_Code] = useState('');
    const [UpdateConfirm, setUpdateConfirm] = useState(false)
    const [Loader, setLoader] = useState(false)
    const [LogoutConfirm, setLogoutConfirm] = useState(false)


    //function logout and remove user for localstorage and change token from db
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
                "Email": email,
                "token": token
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
            localStorage.removeItem('user')
            localStorage.removeItem('token')

        }
        catch (err) { console.log(err) }
    }

    //If the user wants to update details we will change the situation to true or false
    const [editUser, setEditUser] = useState(false);
    const Edit = () => {
        if (editUser === false) {
            setEditUser(true)
        }
        else {
            setEditUser(false)

        }
    }

    // update user on db
    const UpdateUser = async () => {
        setLoader(true)
        setUpdateConfirm(false)
        try {
            let user = {

                "User_Name": userName,
                "First_Name": firstname,
                "Last_Name": lastname,
                "Password": password,
                "Email": email,
                "User_Image": null,
                "Gender": null,
                "User_Type": 1,
                "IsActive": true,
                "Address": null,
                "City": null,
                "House_Num": null,
                "Postal_Code": null,
                "Phone": phone
            }

            let res = await fetch('/api/users/updateuser/' + userId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)

            })
            let data = await res.json()


            if (data.rowsAffected[0] >= 1) {
                setLoader(false)
                setUpdateConfirm(true);
                Edit()

                let user = [{
                    "User_id": userId,
                    "User_Name": userName,
                    "First_Name": firstname,
                    "Last_Name": lastname,
                    "Password": password,
                    "Email": email,
                    "User_Image": User_Image,
                    "Gender": Gender,
                    "User_Type": 1,
                    "IsActive": true,
                    "Address": Address,
                    "City": City,
                    "House_Num": House_Num,
                    "Postal_Code": Postal_Code,
                    "Phone": phone
                }]
                localStorage.setItem('user', JSON.stringify(user))
                return
            }
            if (data.rowsAffected[0] < 0) {
                return alert('שגיאה בעדכון משתמש')
            }


        }
        catch (err) { console.log(err) }
        Edit()

    }


    // get user from local storage and save in vars
    useEffect(() => {
        if (localStorage.getItem('token')) {
            let user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                setUserName(user[0].User_Name)
                setFirstName(user[0].First_Name)
                setLastName(user[0].Last_Name)
                setEmail(user[0].Email)
                setPhone(user[0].Phone === null ? '' : user[0].Phone)
                setUserId(user[0].User_id)
                setUser_Image(user[0].User_Image)
                setUser_Type(user[0].User_Type)
                setIsActive(user[0].IsActive)
                setAddress(user[0].Address)
                setCity(user[0].City)
                setHouse_Num(user[0].House_Num)
                setPostal_Code(user[0].Postal_Code)
            }
        }
    }, [])

    return (
        <>
            <div className={props.open ? 'dark-background active' : 'dark-background'} onClick={props.func}>
            </div>
            <div className="center-profile">
                <div className={props.open ? 'profile active' : 'profile'}>
                    <div className="btn-close" onClick={props.func}>
                    </div>
                    <div className="header-profile">
                        <div className="title-profile">
                            <center><h1 className="profile-name">{firstname[0]}{lastname[0]}</h1></center>
                        </div>
                    </div>

                    <div className="content-profile">
                        <div className="details">
                            <p style={{ fontWeight: "bold" }}>:שם פרטי</p>
                            {editUser === false ? <p>{firstname}</p> : <input value={firstname} onChange={(event) => { setFirstName(event.target.value) }} />}
                        </div>

                        <div className="details">
                            <p style={{ fontWeight: "bold" }}>:שם משפחה</p>
                            {editUser === false ? <p>{lastname}</p> : <input value={lastname} onChange={(event) => { setLastName(event.target.value) }} />}
                        </div>

                        <div className="details">
                            <p style={{ fontWeight: "bold" }}>UserName:</p>
                            {editUser === false ? <p>{userName}</p> : <input value={userName} onChange={(event) => { setUserName(event.target.value) }} />}
                        </div>

                        <div className="details">
                            <p style={{ fontWeight: "bold" }}>E-mail</p>
                            <p>{email}</p>
                        </div>

                        <div className="details">
                            <p style={{ fontWeight: "bold" }}>טלפון</p>
                            {editUser === false ? <p>{phone}</p> : <input value={phone} onChange={(event) => { setPhone(event.target.value) }} />}
                        </div>

                    </div>

                    <hr />
                    <h2 className={UpdateConfirm ? 'confirmreg active' : 'confirmreg'}>! העדכון בוצע בהצלחה</h2>

                    <div className="footer-profile">
                        {editUser === false ? <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={Edit}>עריכת פרטים</p> : <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={UpdateUser} >שמור</p>}

                    </div>
                    <div className="footer-profile">
                        <Link to={"/ordershistory"}> <p style={{ fontWeight: "bold", cursor: "pointer" }} >היסטוריית הזמנות</p></Link>

                    </div>
                    <div className="footer-profile">
                        {
                            <center>
                                {
                                    Loader ? <div className={Loader ? 'loader' : ''}></div> : <p style={{ fontWeight: "bold", color: "rgb(185, 0, 0)" }} onClick={(e) => LogOut(e)} className="logout">התנתק</p>
                                }
                            </center>
                        }
                    </div>
                </div>
            </div>

        </>
    )

}


export default Profile;