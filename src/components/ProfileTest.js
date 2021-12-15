import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormFeild from './formFeild';
import { useHistory } from 'react-router-dom';


const Profile = (props) => {

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

    const [user, setUser] = useState(null)



    const LogOut = () => {
        sessionStorage.clear();
        props.func()
        window.location.reload(true)
    }

    const [editUser, setEditUser] = useState(false);

    const Edit = () => {
        if (editUser === false) {
            setEditUser(true)
        }
        else {
            setEditUser(false)

        }
    }

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
                "Phone": null
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

                history.push(window.location.pathname)
                return
            }
            if (data.rowsAffected[0] < 0) {
                return alert('שגיאה בעדכון משתמש')
            }


        }
        catch (err) { console.log(err) }
        Edit()

    }
    const LoadUser = async (id) => {
        try {
            let res = await fetch('/api/users/' + id, { method: 'GET' })
            let data = await res.json()
            setUser(data)
        }
        catch (err) { console.log(err) }
    }



    useEffect(() => {
        if (user === null) {
            if (sessionStorage.getItem('user')) {

                let userId = JSON.parse(sessionStorage.getItem('user'))
                if (userId !== null) {
                    LoadUser(userId)
                }

            }

        }
        if (user !== null) {
            setUserName(user.User_Name)
            setFirstName(user.First_Name)
            setLastName(user.Last_Name)
            setEmail(user.Email)
            setPhone(user.Phone === null ? '' : user.Phone)
            setUserId(user.User_id)
            setPassword(user.Password)
            setUser_Image(user.User_Image)
            setGender(user.Gender)
            setUser_Type(user.User_Type)
            setIsActive(user.IsActive)
            setAddress(user.Address)
            setCity(user.City)
            setHouse_Num(user.House_Num)
            setPostal_Code(user.Postal_Code)
        }
    }, [user])
    if(user !== null)
    {
        return (
            <>
                <div className={props.open ? 'dark-background active' : 'dark-background'} onClick={props.func}>
                </div>
                <div className="center-login">
                    <div className={props.open ? 'profile active' : 'profile'}>
                        <div className="btn-close" onClick={props.func}>
                        </div>
    
                        <div className="header-profile">
                            <div className="title-profile">
                                <h1>הפרופיל שלי</h1>
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
    
                        <div className="center">
                            <div className={Loader ? 'loader' : ''}></div>
                        </div>
                        <h2 className={UpdateConfirm ? 'confirmreg active' : 'confirmreg'}>! העדכון בוצע בהצלחה</h2>
    
                        <hr />
                        <div className="footer-profile">
                            {editUser === false ? <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={Edit} className="logout">עריכת פרטים</p> : <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={UpdateUser} className="logout">שמור</p>}
    
                        </div>
                        <hr />
                        <div className="footer-profile">
                            <p style={{ fontWeight: "bold", cursor: "pointer" }} /* onClick={Edit}*/ className="logout">היסטוריית הזמנות</p>
    
                        </div>
                        <hr />
                        <div className="footer-profile">
                            <p style={{ fontWeight: "bold", color: "rgb(185, 0, 0)" }} onClick={LogOut} className="logout">התנתק</p>
                        </div>
    
    
                    </div>
                </div>
    
            </>
        )
    
    }

    else
    {
        return (
            <>
                <div className={props.open ? 'dark-background active' : 'dark-background'} onClick={props.func}>
                </div>
                <div className="center-login">
                    <div className={props.open ? 'profile active' : 'profile'}>
                        <div className="btn-close" onClick={props.func}>
                        </div>
    
                        <div className="header-profile">
                        <div className="center">
                                <div className='loader'></div>
                         </div>
                        </div>
    
                        <div className="center">
                            <div className={Loader ? 'loader' : ''}></div>
                        </div>
                        <h2 className={UpdateConfirm ? 'confirmreg active' : 'confirmreg'}>! העדכון בוצע בהצלחה</h2>
    
                        <hr />
                        <div className="footer-profile">
                            {editUser === false ? <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={Edit} className="logout">עריכת פרטים</p> : <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={UpdateUser} className="logout">שמור</p>}
    
                        </div>
                        <hr />
                        <div className="footer-profile">
                            <p style={{ fontWeight: "bold", cursor: "pointer" }} /* onClick={Edit}*/ className="logout">היסטוריית הזמנות</p>
    
                        </div>
                        <hr />
                        <div className="footer-profile">
                            <p style={{ fontWeight: "bold", color: "rgb(185, 0, 0)" }} onClick={LogOut} className="logout">התנתק</p>
                        </div>
    
    
                    </div>
                </div>
    
            </>
        )
    
    }

}


export default Profile;