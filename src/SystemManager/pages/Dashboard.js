import React, { useState, useEffect } from 'react';
import LoginAdmin from '../components/LoginAdmin';
import NavBarSys from '../components/NavBarSys';
import DashInfo from '../components/DashInfo';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaCalendarCheck } from "react-icons/fa";
import { FaShekelSign } from "react-icons/fa";
import { Container } from 'react-bootstrap';

const AdminMenu = (props) => {

    const [admin, setAdmin] = useState(null);

    const orderIcon = (
        <FaCalendarCheck icon={FaCalendarCheck} />
    )
    const ShekelIcon = (
        <FaShekelSign icon={FaShekelSign} />
    )
    const [orders, setOrders] = useState(null)
    const [ordersmonth, setOrdersMonth] = useState(null)

    const [cash, setCash] = useState(null)
    const [cashmonth, setCashMonth] = useState(null)


    const LoadOrders = async () => {
        try {
            let res = await fetch('/api/order/ordertoday', { method: 'GET' })
            let data = await res.json()
            setOrders(data)
        }
        catch (err) { console.log(err) }
    }
    const LoadOrdersMonth = async () => {
        try {
            let res = await fetch('/api/order/ordermonth', { method: 'GET' })
            let data = await res.json()
            setOrdersMonth(data)
        }
        catch (err) { console.log(err) }
    }


    useEffect(() => {
        LoadOrders()
        LoadOrdersMonth()
    }, [])

    useEffect(() => {
        if (orders !== null) {
            let cash = 0
            for (let i = 0; i < orders.length; i++) {
                cash += orders[i].Price_In_Order
            }
            setCash(cash)
        }
    }, [orders])

    useEffect(() => {
        if (ordersmonth !== null) {
            let cashm = 0
            for (let i = 0; i < ordersmonth.length; i++) {
                cashm += ordersmonth[i].Price_In_Order
            }
            setCashMonth(cashm)
        }
    }, [ordersmonth])



    useEffect(() => {

        if (localStorage.getItem('tokenadmin')) {

            setAdmin(JSON.parse(localStorage.getItem('admin')))
        }

    }, [])

    if (admin !== null) {
        return (
            <>
                <NavBarSys admin={admin}></NavBarSys>
                <Container>
                    <div className="information">
                        <DashInfo title="מספר ההזמנות היום" content={orders !== null ? orders.length : '0'} icon={orderIcon}></DashInfo>
                        <DashInfo title="סכום ההזמנות היום" content={cash !== null ? cash : '0'} icon={ShekelIcon}></DashInfo>
                        <DashInfo title="מספר ההזמנות החודש" content={ordersmonth !== null ? ordersmonth.length : '0'} icon={orderIcon}></DashInfo>
                        <DashInfo title="סכום ההזמנות החודש" content={cashmonth !== null ? cashmonth : '0'} icon={ShekelIcon}></DashInfo>

                    </div>
                </Container>
            </>
        )

    }
    else {
        return (
            <LoginAdmin ></LoginAdmin>
        )

    }

}


export default AdminMenu;