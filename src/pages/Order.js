import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useRef, useState, useEffect } from 'react';
import Login from "../components/Login";
import { Container, Row, Col } from "react-bootstrap";
import FormFeild from '../components/formFeild';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom"

import emailjs from 'emailjs-com';

const Order = (props) => {


    /* inputs */

    const [First_Name, setFirst_Name] = useState(null);
    const [Last_Name, setLast_Name] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Phone, setPhone] = useState(null);
    const [User_id, setUser_id] = useState(null);
    const [Order_id, setOrderId] = useState(null);
    const [Order_Note, setOrder_Note] = useState(null);
    const [Contact_Name, setContact_Name] = useState(null);
    const [Contact_Email, setContact_Email] = useState(null);
    const [Contact_Phone, setContact_Phone] = useState(null);

    const [confirm, setConfirm] = useState(null);

    const [UserFromLs, setUserFromLs] = useState(null);
    const [ERRFirst_Name, setERRFirst_Name] = useState(false);
    const [ERRLast_Name, setERRLast_Name] = useState(false);
    const [ERREmail, setERREmail] = useState(false);
    const [ERRPhone, setERRPhone] = useState(false);


    const history = useHistory()

    const [Item, setItem] = useState(null);

    const [OrderConfirm, setOrderConfirm] = useState(false)
    const [Loader, setLoader] = useState(false)
    const form = useRef();


    useEffect(() => {
        if (props.location.state !== undefined) {
            let confirm = props.location.state.detail
            setConfirm(confirm)
        }

    }, [])

    // get total price in order
    let price = 0
    let counter = 0
    let itemFromLS = JSON.parse(localStorage.getItem('cart'))
    if (itemFromLS) {
        for (let i = 0; i < itemFromLS.length; i++) {
            price += Number(itemFromLS[i].PriceOfItem)
            counter += itemFromLS.quantity
        }

    }
    ///////////////////////////

    /* open or close modal login */
    const [LoginModal, setLogintModal] = useState(false);
    const OpenLogin = (event) => {
        if (!LoginModal) {
            setLogintModal(true);
        }
        else
            setLogintModal(false);
    }


    /* if user exist in local storage */
    useEffect(() => {

        let User = JSON.parse(localStorage.getItem('user'))
        if (User) {
            User = User[0]
            setUserFromLs(User)
            setFirst_Name(User.First_Name)
            setLast_Name(User.Last_Name)
            setEmail(User.Email)
            setPhone(User.Phone)
            setUser_id(User.User_id)
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            let itemFromLS = JSON.parse(localStorage.getItem('cart'))
            setItem(itemFromLS)
        }
    }, [localStorage.getItem('cart')])

    const AddItemToOrder = async (Order_Id, item) => {
        try {
            let itemOrder = {
                "Order_Id": Order_Id,
                "Item_Id": item.id,
                "Quantity": item.quantity
            }

            let res = await fetch('/api/itemsinorder/additeminorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemOrder)

            })
            let data = await res.json()
            return true
        }
        catch (err) { return false }
    }

    const AddOrder = async () => {
        setLoader(true)
        setOrderConfirm(false)
        try {
            let order = {
                "User_id": User_id,
                "Price_In_Order": price,
                "Order_Note": "",
                "Discount": 0,
                "Contact_Name": First_Name,
                "Contact_Email": Last_Name,
                "Contact_Phone": Phone
            }

            let res = await fetch('/api/order/addorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)

            })
            let data = await res.json()
            setLoader(false)
            setOrderId(data.output.Order_Id)

            for (let i = 0; i < itemFromLS.length; i++) {
                let res = AddItemToOrder(data.output.Order_Id, itemFromLS[i])
                if (!res) {
                    alert('משהו ישתבש בהוספת מוצרים להזמנה')
                    break
                }
            }

            setOrderConfirm(true);
            localStorage.removeItem('cart')
            sendEmail()
            history.push({
                pathname: '/orderconfirm/' + data.output.Order_Id,
                state: { detail: true }
            }
            )

        }
        catch (err) { console.log(err) }
    }



    const CheckField = (e) => {


        setERRFirst_Name(false)
        setERRLast_Name(false)
        setERREmail(false)
        setERRPhone(false)

        let confirm = false;

        if (First_Name === '' || First_Name === null) {
            setERRFirst_Name(true)
            confirm = true
        }
        if (Last_Name === '' || Last_Name === null) {
            setERRLast_Name(true)
            confirm = true
        }
        if (Email === '' || Email === null) {
            setERREmail(true)
            confirm = true
        }
        if (Phone === null || Phone === '') {
            setERRPhone(true)
            confirm = true

        }
        if (confirm === true) {
            return
        }
        AddOrder()
    }

    const sendEmail = (e) => {

        emailjs.sendForm('gmail', 'template_lzk08pu', form.current, 'user_CZslmv5BC7vb1ujvwPVen')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

    };


    if(!JSON.parse(localStorage.getItem('cart')))
    {
        return""
    }

    //////////////////////////////////////////////////////////////////////
    /* if user not exist in local storage return modal login */
    
    let IfUserInLs = JSON.parse(localStorage.getItem('user'))
    if (!IfUserInLs) {
        return (
            <>
                <Login fromOrder={true} open={true} func={OpenLogin}></Login>
            </>
        )
    }

    else {
        if (confirm) {
            return (
                <>
                    <div className="OrderPage">
                        <div className="orderHeder">
                            <h3>יצירת הזמנה חדשה</h3>
                        </div>
                        <div className="orderContent">

                        </div>
                        <div className="orderFooter">
                            <Container>
                                <Row>
                                    <Col className="order" md='6'>
                                        <h4>פרטי ההזמנה</h4>
                                        <hr />
                                        <Row>
                                            <div className="detalis-orders">
                                                <Row className="row-item">
                                                    {
                                                        Item ? Item.map(i => {
                                                            return (
                                                                <>
                                                                    <div className="item-in-order">
                                                                        <p>{i['PriceOfItem']}</p>
                                                                        <p>{i['quantity']}</p>
                                                                        <p>x</p>
                                                                        <div className="npsc">
                                                                            <p><strong>{i['NameOfItem']}</strong></p>
                                                                            <p className="cs"> {i['currentColor']}/{i['currentSize']}</p>
                                                                        </div>
                                                                        <img className="img-item-in-order" src={i['ItemImage']} alt="" />
                                                                    </div>
                                                                    <hr />
                                                                </>
                                                            )
                                                        }) : <h1>אין פריטים בסל הקניות</h1>
                                                    }
                                                </Row>
                                                <div className="total-price-in-order">
                                                    <h1>{price}</h1>
                                                    <h1>סה״כ כולל מע"מ</h1>
                                                </div>
                                            </div>
                                        </Row>
                                    </Col>

                                    <Col className='client' md='6'>
                                        <h4>פרטי הלקוח</h4>
                                        <hr />
                                        <Row>
                                            <div className="detalis-orders">
                                                <FormFeild className="feild1" value={First_Name !== null ? First_Name : '...בטעינה'} type="text" name={First_Name !== null ? "שם פרטי" : ' ...בטעינה'} action={setFirst_Name} err={ERRFirst_Name} />
                                                <FormFeild className="feild1" value={Last_Name !== null ? Last_Name : '...בטעינה'} type="text" name={Last_Name !== null ? "שם משפחה" : ' ...בטעינה'} action={setLast_Name} err={ERRLast_Name} />
                                                <FormFeild className="feild1" value={Email !== null ? Email : '...בטעינה'} type="text" name={Email !== null ? "Email" : ' ...בטעינה'} action={setEmail} err={ERREmail} />
                                                <FormFeild className="feild1" value={Phone} type="text" name="טלפון" action={setPhone} err={ERRPhone} />
                                                <FormFeild className="feild1" value={Order_Note} type="text" name="הערות להזמנה" action={setOrder_Note}  />

                                            </div>
                                        </Row>
                                    </Col>
                                    <center><button className="btn-confirm-order" onClick={(event) => { CheckField(event.target) }}>בצע הזמנה</button></center>
                                    <div className="center">
                                        <div className={Loader ? 'loader' : ''}></div>
                                    </div>

                                </Row>
                            </Container>
                        </div>
                        <form style={{ display: "none" }} onSubmit={(e) => sendEmail(e)} ref={form}>
                            <input value={First_Name} name="firstname"></input>
                            <input value={Last_Name} name="lastname"></input>
                            <input value={Order_id} name="ordernumber"></input>
                            <input value={price} name="orderprice"></input>
                            {
                                itemFromLS.map(i => {return( <input value={i.NameOfItem} name="itemname"></input>)})
                            }
                        </form>
                    </div>
                </>
            )
        }
        else
        {
            return(
                ""
            )
        }

    }

}
export default Order;