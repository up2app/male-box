import FormFeild from '../../components/formFeild';
import React, { useState, useEffect, useRef } from 'react';
import LoginAdmin from '../components/LoginAdmin';
import { useHistory } from 'react-router-dom';


const EditOrder = (props) => {

    const [Order, setOrder] = useState(null)

    const ifpaid = useRef([])
    const ifactive = useRef([])

    const history = useHistory()

    useEffect(() => {

        let OrderToEdit = null

        if (props.location.state !== undefined) {
            let confirm = props.location.state.detail
            setConfirm(confirm)

            OrderToEdit = props.location.state.Order
            if (OrderToEdit) {
                setUser_id(OrderToEdit.User_id)
                setOrder_Date(OrderToEdit.Order_Date)
                setPaid(OrderToEdit.Paid)
                setPrice_In_Order(OrderToEdit.Price_In_Order)
                setOrder_Note(OrderToEdit.Order_Note)
                setDiscount(OrderToEdit.Discount)
                setIsActive(OrderToEdit.IsActive)
                setContact_Name(OrderToEdit.Contact_Name)
                setContact_Email(OrderToEdit.Contact_Email)
                setContact_Phone(OrderToEdit.Contact_Phone)
                setOrder(OrderToEdit)
            }
        }


    }, [])

    const [User_id, setUser_id] = useState(null)
    const [Order_Date, setOrder_Date] = useState(null)
    const [Paid, setPaid] = useState(null)
    const [Price_In_Order, setPrice_In_Order] = useState(null)
    const [Order_Note, setOrder_Note] = useState(null)
    const [Discount, setDiscount] = useState(null)
    const [IsActive, setIsActive] = useState(null)

    const [Contact_Name, setContact_Name] = useState(null)
    const [Contact_Email, setContact_Email] = useState(null)
    const [Contact_Phone, setContact_Phone] = useState(null)


    const [errUser_id, setErrUser_id] = useState(false)
    const [errOrder_Date, setErrOrder_Date] = useState(false)
    const [errPaid, setErrPaid] = useState(false)
    const [errPrice_In_Order, setErrPrice_In_Order] = useState(false)


    const [EditConfirm, setEditConfirm] = useState(false)
    const [Loader, setLoader] = useState(false)

    const [confirm, setConfirm] = useState(false)




    const EditOrderFunc = async () => {
        setLoader(true)
        setEditConfirm(false)
        let Orderid = Order.Order_Id.toString()
        try {
            let Order = {
                "User_id": User_id,
                "Order_Date": Order_Date,
                "Paid": ifpaid.current.checked===true ? true : false,
                "Price_In_Order": Price_In_Order,
                "Order_Note": Order_Note,
                "Discount": Discount,
                "IsActive": ifactive.current.checked===true ? true : false,
                "Contact_Name": Contact_Name,
                "Contact_Email": Contact_Email,
                "Contact_Phone": Contact_Phone
            }

            let res = await fetch('/api/order/updateorder/' + Orderid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Order)

            })
            let data = await res.json()
            setLoader(false)
            setEditConfirm(true)
            alert("העדכון בוצע בהצלחה")
            history.push("/ordermanagement")

        }
        catch (err) { console.log(err) }
    }



    const CheckEdit = (e) => {
        e.preventDefault();
        setErrUser_id(false)
        setErrPrice_In_Order(false)
        
        let confirmedit = false;

        if (User_id === '') {
            setErrUser_id(true)
            confirmedit = true
        }
        if (Price_In_Order === '') {
            setErrPrice_In_Order(true)
            confirmedit = true
        }
        if (confirmedit === true) {
            return
        }
         EditOrderFunc()
    }
    const setActive = () => {
        if (Order.IsActive === false)
        {
            Order.IsActive = true
            setIsActive(true)
        }
        else if (Order.IsActive === true)
        {
            Order.IsActive = false
            setIsActive(false)
        }
        history.push({ pathname: '/editorder', state: { detail: true, Order: Order } })
    }

    const setPaidChange = () => {
        if (Order.Paid === false)
            Order.Paid = true
        else if (Order.Paid === true)
            Order.Paid = false
        history.push({ pathname: '/editorder', state: { detail: true, Order: Order } })
    }


    if (confirm !== null && Order !== null) {
        if (localStorage.getItem('admin')) {
            return (

                <>

                    <div className="EditPage">
                        <div className="form-regiters">
                            <form action="" onSubmit={e => { CheckEdit(e) }}>
                                <h1>עדכון פרטי הזמנה</h1>
                                <div className="fields">

                                    <FormFeild className="feild" value={User_id} type="text" name="משתמש" action={setUser_id} err={errUser_id} />
                                    <FormFeild className="feild" value={Price_In_Order} type="text" name="מחיר בהזמנה" action={setPrice_In_Order} err={errPrice_In_Order} />
                                    <FormFeild className="feild" value={Discount} type="text" name="הנחה" action={setDiscount}  />
                                    <div className="ifactive">
                                        {Order.IsActive === true ? <div><input type="checkbox" checked ref={ifactive} onClick={(e) => setActive()} /> <label> פעיל </label></div> : <div><input type="checkbox" ref={ifactive} onClick={(e) => Order.IsActive = true} onClick={(e) => setActive()} /><label>פעיל</label></div>}
                                    </div>
                                    <div className="ifpaid">
                                        {Order.Paid === true ? <div><input type="checkbox" checked ref={ifpaid} onClick={(e) => setPaidChange()} /> <label> ? שולם </label></div> : <div><input type="checkbox" ref={ifpaid} onClick={(e) => Order.Paid = true} onClick={(e) => setPaidChange()} /><label> ? שולם</label></div>}
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
export default EditOrder;