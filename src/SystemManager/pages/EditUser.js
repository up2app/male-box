import FormFeild from '../../components/formFeild';
import React, { useState, useEffect  ,useRef} from 'react';
import LoginAdmin from '../components/LoginAdmin';
import { useHistory } from 'react-router-dom';


const EditUser = (props) => {

    const [user, setUser] = useState(null)

    const ifadmin = useRef([])
    const ifactive = useRef([])

    const history = useHistory()

    useEffect(() => {

        let UserToEdit = null

        if (props.location.state !== undefined) {
            let confirm = props.location.state.detail
            setConfirm(confirm)

            UserToEdit = props.location.state.user
            if(UserToEdit)
            {
            console.log(UserToEdit)
            setUserName(UserToEdit.User_Name)
            setPassword(UserToEdit.Password)
            setFirstName(UserToEdit.First_Name)
            setLastName(UserToEdit.Last_Name)
            setEmail(UserToEdit.Email)
            setConfirmPassword(UserToEdit.Password)
            setGender(UserToEdit.Gender)
            setUsertype(UserToEdit.User_Type)
            setIsActive(UserToEdit.IsActive)
            setAddress(UserToEdit.Address)
            setCity(UserToEdit.City)
            setHouse_Num(UserToEdit.House_Num)
            setPostal_Code(UserToEdit.Postal_Code)
            setPhone(UserToEdit.Phone)
            setUser(UserToEdit)
            }
        }


    }, [])

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [gender, setGender] = useState('')
    const [usertype, setUsertype] = useState('')
    const [IsActive, setIsActive] = useState('')
    const [Address, setAddress] = useState('')
    const [City, setCity] = useState('')
    const [House_Num, setHouse_Num] = useState('')
    const [Postal_Code, setPostal_Code] = useState('')
    const [Phone, setPhone] = useState('')


    const [erruserName, setErruserName] = useState(false)
    const [errpassword, setErrpassword] = useState(false)
    const [errfirstname, setErrfirstname] = useState(false)
    const [errlastname, setErrlastname] = useState(false)
    const [erremail, setErremail] = useState(false)
    const [errconfirmPassword, setErrconfirmPassword] = useState(false)


    const [EditConfirm, setEditConfirm] = useState(false)
    const [Loader, setLoader] = useState(false)

    const [confirm, setConfirm] = useState(false)




    const EditUserFunc = async () => {
        setLoader(true)
        setEditConfirm(false)
        let userid = user.User_id.toString()
        try {
            let user = {
                "User_Name": userName,
                "First_Name": firstname,
                "Last_Name": lastname,
                "Password": password,
                "Email": email,
                "User_Image": null,
                "Gender": gender,
                "User_Type": ifadmin.current.checked===true ? '1' : '2',
                "IsActive": ifactive.current.checked===true ? true : false,
                "Address": Address,
                "City": City,
                "House_Num": House_Num,
                "Postal_Code": Postal_Code,
                "Phone": Phone
            }

            let res = await fetch('/api/users/updateuser/'+ userid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)

            })
            let data = await res.json()
            setLoader(false)
            setEditConfirm(true)
            history.push("/usermanagement")

        }
        catch (err) { console.log(err) }
    }

    const CheckEdit = (e) => {
        e.preventDefault();
        setErruserName(false)
        setErrpassword(false)
        setErrfirstname(false)
        setErrlastname(false)
        setErremail(false)
        setErrconfirmPassword(false)
        let confirm = false;

        if (userName === '') {
            setErruserName(true)
            confirm = true
        }
        if (firstname === '') {
            setErrfirstname(true)
            confirm = true

        }
        if (lastname === '') {
            setErrlastname(true)
            confirm = true

        }
        if (email === '') {
            setErremail(true)
            confirm = true

        }
        if (password === '') {
            setErrpassword(true)
            confirm = true

        }
        if (confirmPassword === '') {
            setErrconfirmPassword(true)
            confirm = true

        }

        if (password !== confirmPassword) {
            setErrpassword(true)
            setErrconfirmPassword(true)
            confirm = true

        }

        if (confirm === true) {
            return
        }
        EditUserFunc()
    }
    const setActive = () =>
    {
        if(user.IsActive == false)
        user.IsActive=true
        else if(user.IsActive == true)
        user.IsActive=false
        history.push({ pathname: '/edituser', state: { detail: true, user: user } })
    }
    const setType = () =>
    {
        if(user.User_Type == false)
        user.User_Type=true
        else if(user.User_Type == true)
        user.User_Type=false
        history.push({ pathname: '/edituser', state: { detail: true, user: user } })
    }


    if (confirm  !== null && user !==null) {
        if (localStorage.getItem('admin')) {
            return (

                <>

                    <div className="EditPage">
                        <div className="form-regiters">
                            <form action="" onSubmit={e => { CheckEdit(e) }}>
                                <h1>עדכון פרטי משתמש</h1>
                                <div className="fields">
                                    <FormFeild className="feild" value={firstname} type="text" name="(חובה) שם פרטי" action={setFirstName} err={errfirstname} />
                                    <FormFeild className="feild" value={lastname} type="text" name="(חובה) שם משפחה" action={setLastName} err={errlastname} />
                                    <FormFeild className="feild" value={userName} type="text" name="User Name (חובה)" action={setUserName} err={erruserName} />
                                    <FormFeild className="feild" value={email} type="email" name="(חובה) אימייל" action={setEmail} err={erremail} />
                                    <FormFeild className="feild" value={password} type="password" name="(חובה) סיסמא" action={setPassword} err={errpassword} />
                                    <FormFeild className="feild" value={confirmPassword} type="password" name="(חובה) אישור סיסמא" action={setConfirmPassword} err={errconfirmPassword} />
                                    <FormFeild className="feild" value={gender} type="text" name="מין" action={setGender} />
                                    <FormFeild className="feild" value={Address} type="text" name="כתובת" action={setAddress} />
                                    <FormFeild className="feild" value={City} type="text" name="עיר" action={setCity} />
                                    <FormFeild className="feild" value={House_Num} type="text" name="מס בית" action={setHouse_Num} />
                                    <FormFeild className="feild" value={Postal_Code} type="text" name="מיקוד" action={setPostal_Code} />
                                    <FormFeild className="feild" value={Phone} type="text" name="טלפון" action={setPhone} />
                                    <div className="ifadmin">
                                        {user.User_Type === 1 ? <div><input type="checkbox" checked ref={ifadmin} onClick={(e) => setType()} /> <label> אדמין </label></div> : <div><input type="checkbox" ref={ifadmin} onClick={(e) => user.User_Type=1 } onClick={(e) => setType()} /><label>אדמין</label></div>}
                                    </div>
                                    <div className="ifactive">
                                        {user.IsActive === true ? <div><input type="checkbox" checked ref={ifactive} onClick={(e) => setActive()} /> <label> פעיל </label></div> : <div><input type="checkbox" ref={ifactive} onClick={(e) => user.IsActive=true} onClick={(e) => setActive()} /><label>פעיל</label></div>}
                                    </div>

                                    <button className="BtnEdit" type="submit"> עדכן ושמור</button>
                                </div>
                                <div className="center">
                                    <div className={Loader ? 'loader' : ''}></div>
                                </div>
                                {/* <h2 className={EditConfirm ? 'confirmreg active' : 'confirmreg'}>! העדכון בוצעה בהצלחה</h2> */}
                            </form >
                        </div>
                    </div>

                </>
            )
        }
        else {
            return (
                <>
                    <LoginAdmin></LoginAdmin>
                </>
            )
        }
    }
    else {
        return ""
    }
}
export default EditUser;