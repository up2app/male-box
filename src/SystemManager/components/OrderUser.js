import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormFeild from '../../components/formFeild';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';


const OrderUser = (props) => {

    const history = useHistory()

    const [Order_Id, setOrder_Id] = useState(null)
    const [User_id, setUser_id] = useState(null)
    const [Order_Date, setOrder_Date] = useState(null)
    const [Paid, setPaid] = useState(null)
    const [Price_In_Order, setPrice_In_Order] = useState(null)
    const [Discount, setDiscount] = useState(null)
    const [IsActive, setIsActive] = useState(null)

    const [Contact_Name, setContact_Name] = useState(null)
    const [Contact_Email, setContact_Email] = useState(null)
    const [Contact_Phone, setContact_Phone] = useState(null)

    const [ItemInOrder, setItemInOrder] = useState(null)
    const [AllOrders, setAllOrders] = useState(null)

    const [Order, setOrder] = useState(null)


    useEffect(() => {

        setUser_id(props.Order.User_id)
        setOrder_Date(props.Order.Order_Date)
        setPaid(props.Order.Paid)
        setPrice_In_Order(props.Order.Price_In_Order)
        setDiscount(props.Order.Discount)
        setIsActive(props.Order.IsActive)
        setContact_Name(props.Order.Contact_Name)
        setContact_Email(props.Order.Contact_Email)
        setContact_Phone(props.Order.Contact_Phone)
        setAllOrders(props.AllOrders)

    }, [props.Order])

    const LoadItemInOrder = async (id) => {
        try {
            let res = await fetch('/api/itemsinorder/'+Order_Id, { method: 'GET' })
            let data = await res.json()
            setItemInOrder(data)
        }
        catch (err) { console.log(err) }
    }

    useEffect(() => {
        if(Order_Id !== null)
        {
            LoadItemInOrder()
            console.log(ItemInOrder)
        }
    }, [ItemInOrder])


    return (
        <>
            <div className="ProfileUser">
                <div className={props.open ? 'profile active' : 'profile'}>
                    <div className="btn-close" onClick={props.func}>
                    </div>
                    {
                        <center><h1 className="order-id">{props.Order.Order_Id}</h1></center>
                    }
                    <Row>
                    <Col>
                    <p style={{ fontWeight: "bold" }}>מספר הזמנה</p>
                    <p>{props.Order.Order_Id}</p>

                    <p style={{ fontWeight: "bold" }}>מבצע ההזמנה</p>
                    <p>{props.nameofuser}</p>

                    <p style={{ fontWeight: "bold" }}>תאריך הזמנה</p>
                    <p>{props.DateInOrder}</p>

                    <p style={{ fontWeight: "bold" }}>מחיר בהזמנה</p>
                    <p>{Price_In_Order}</p>

                    <p style={{ fontWeight: "bold" }}>הנחה</p>
                    <p>{Discount}</p>
                    </Col>
                    <Col>
                    <p style={{ fontWeight: "bold" }}>סטטוס הזמנה</p>
                    <p>{IsActive  ? 'פעילה' :'לא פעילה'}</p>

                    </Col>
                    </Row>

                </div>

                
                
            </div>

        </>
    )

}


export default OrderUser;