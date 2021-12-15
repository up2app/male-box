import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormFeild from '../../components/formFeild';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';


const ProfileUser = (props) => {

    const history = useHistory()

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

    const [user, setUser] = useState('')


    useEffect(() => {



        console.log(props.user)

        setUserName(props.user.User_Name)
        setPassword(props.user.Password)
        setFirstName(props.user.First_Name)
        setLastName(props.user.Last_Name)
        setEmail(props.user.Email)
        setConfirmPassword(props.user.Password)
        setGender(props.user.Gender)
        setUsertype(props.user.User_Type)
        setIsActive(props.user.IsActive)
        setAddress(props.user.Address)
        setCity(props.user.City)
        setHouse_Num(props.user.House_Num)
        setPostal_Code(props.user.Postal_Code)
        setPhone(props.user.Phone)
        setUser(props.user)

    }, [props.user])

    return (
        <>
            <div className="ProfileUser">
                <div className={props.open ? 'profile active' : 'profile'}>
                    <div className="btn-close" onClick={props.func}>
                    </div>
                    {
                        firstname !== undefined && lastname!==undefined ? <center><h1 className="profile-name">{firstname[0]}{lastname[0]}</h1></center> : ''
                    }
                    
                    <Row>
                    <Col>
                    <p style={{ fontWeight: "bold" }}>עיר</p>
                    <p>{City}</p>

                    <p style={{ fontWeight: "bold" }}>כתובת</p>
                    <p>{Address}</p>

                    <p style={{ fontWeight: "bold" }}>מספר בית</p>
                    <p>{House_Num}</p>

                    <p style={{ fontWeight: "bold" }}>טלפון</p>
                    <p>{Phone}</p>

                    <p style={{ fontWeight: "bold" }}>מיקוד</p>
                    <p>{Postal_Code}</p>
                    </Col>
                    <Col>
                    <p style={{ fontWeight: "bold" }}>:שם פרטי</p>
                    <p>{firstname}</p>
                    <p style={{ fontWeight: "bold" }}>:שם משפחה</p>
                    <p>{lastname}</p>

                    <p style={{ fontWeight: "bold" }}>UserName:</p>
                    <p>{userName}</p>

                    <p style={{ fontWeight: "bold" }}>E-mail</p>
                    <p>{email}</p>

                    <p style={{ fontWeight: "bold" }}>טלפון</p>
                    <p>{Phone}</p>

                    <p style={{ fontWeight: "bold" }}>סיסמא</p>
                    <p>{password}</p>
                    </Col>

                    </Row>

                </div>
            </div>

        </>
    )

}


export default ProfileUser;