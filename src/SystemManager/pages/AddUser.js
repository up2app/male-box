import FormFeild from '../../components/formFeild';
import React, { useState, useEffect  ,useRef} from 'react';
import LoginAdmin from '../components/LoginAdmin';
import { useHistory } from 'react-router-dom';


const AddUser = (props) => {


    const ifadmin = useRef([])
    const ifactive = useRef([])
    const history = useHistory()

    useEffect(() => {


        if (props.location.state !== undefined) {
            let confirm = props.location.state.detail
            setConfirm(confirm)

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


    const [AddUserConfirm, setAddUserConfirm] = useState(false)
    const [Loader, setLoader] = useState(false)

    const [confirm, setConfirm] = useState(false)




    const addUserFunc = async () => {
        setLoader(true)
        setAddUserConfirm(false)
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

            let res = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)

            })
            let data = await res.json()
            
            if(Number(data.output["User_Id"])!== -1)
            {
                setLoader(false)
                setAddUserConfirm(true)
                return
            }
            if(Number(data.output["User_Id"])=== -1)
            {
                setLoader(false)
                return alert('?????????? ?????? ???????? ????????????')
            }
            alert("! ???????? ???????? ????????????")
            history.push("/itemmanagement")
    
    

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
        addUserFunc()
    }

    if (confirm !== null) {
        if (localStorage.getItem('admin')) {
            return (

                <>

                    <div className="AddUserPage">
                        <div className="form-regiters">
                            <form action="" onSubmit={e => { CheckEdit(e) }}>
                                <h1>?????????? ??????????</h1>
                                <div className="fields">
                                    <FormFeild className="feild" value={firstname} type="text" name="(????????) ???? ????????" action={setFirstName} err={errfirstname} />
                                    <FormFeild className="feild" value={lastname} type="text" name="(????????) ???? ??????????" action={setLastName} err={errlastname} />
                                    <FormFeild className="feild" value={userName} type="text" name="User Name (????????)" action={setUserName} err={erruserName} />
                                    <FormFeild className="feild" value={email} type="email" name="(????????) ????????????" action={setEmail} err={erremail} />
                                    <FormFeild className="feild" value={password} type="password" name="(????????) ??????????" action={setPassword} err={errpassword} />
                                    <FormFeild className="feild" value={confirmPassword} type="password" name="(????????) ?????????? ??????????" action={setConfirmPassword} err={errconfirmPassword} />
                                    <FormFeild className="feild" value={gender} type="text" name="??????" action={setGender} />
                                    <FormFeild className="feild" value={Address} type="text" name="??????????" action={setAddress} />
                                    <FormFeild className="feild" value={City} type="text" name="??????" action={setCity} />
                                    <FormFeild className="feild" value={House_Num} type="text" name="???? ??????" action={setHouse_Num} />
                                    <FormFeild className="feild" value={Postal_Code} type="text" name="??????????" action={setPostal_Code} />
                                    <FormFeild className="feild" value={Phone} type="text" name="??????????" action={setPhone} />
                                    <div className="ifadmin">
                                        <input type="checkbox"  ref={ifadmin} /> <label> ?????????? </label>
                                    </div>
                                    <div className="ifactive">
                                       <input type="checkbox" checked ref={ifactive} /> <label> ???????? </label>
                                    </div>

                                    <button className="Btn-adduser" type="submit">???????? ??????????</button>
                                </div>
                                <div className="center">
                                    <div className={Loader ? 'loader' : ''}></div>
                                </div>
                                <h2 className={AddUserConfirm ? 'confirmreg active' : 'confirmreg'}>! ?????????? ???????? ????????????</h2>
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
export default AddUser;