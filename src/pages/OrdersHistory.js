import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from "react-bootstrap";
import Login from "../components/Login";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


const OrderHistory = (props) => {

    const { id } = useParams()

    const [orders, setOrders] = useState(null)

    /* open or close modal login */
    const [LoginModal, setLogintModal] = useState(false);
    const OpenLogin = (event) => {
        if (!LoginModal) {
            setLogintModal(true);
        }
        else
            setLogintModal(false);
    }

    const getParsedDate = (date) => {
        let newdate = ''
        newdate = String(date).replace('T', ' | ')
        newdate = String(newdate).replace('Z', ' ')
        newdate = String(newdate).replace('-', '/')
        newdate = String(newdate).replace('-', '/')
        let seconds = newdate.substr(18);
        newdate = String(newdate).replace(seconds, ' ')
        return newdate
    }


    const LoadOrders = async () => {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'))[0]
            try {
                let res = await fetch('/api/order/selectorderbyuserid/'+ user.User_id.toString(), { method: 'GET' })
                let data = await res.json()
                setOrders(data)
            }
            catch (err) { console.log(err) }
        }
    }

    useEffect(() => {
        LoadOrders()
    }, [])

    if (localStorage.getItem('user')) {
        if (orders !== null)
            return (
                <>
                    <NavBar></NavBar>
                    <Table responsive className="table-history">
                        <thead>
                            <tr>
                                <th>תאריך הזמנה</th>
                                <th>מספר הזמנה</th>
                                <th>מחיר הזמנה</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>
                            {

                                orders.map((o) => {
                                    return (
                                        <tr>
                                            <>
                                                <td>
                                                    {getParsedDate(o.Order_Date)}
                                                </td>
                                                <td>
                                                    {o.Order_Id}
                                                </td>
                                                <td>
                                                    {o.Price_In_Order}
                                                </td>
                                                <td>
                                                    <button className="btn-see-order"> לצפייה בהזמנה</button>
                                                </td>
                                            </>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <Footer></Footer>
                </>
            )
        else {
            return (
                <div className="centerPP">
                    <div class="loader"></div>
                    <h1 className="logoMaleBox2">male box</h1>
                </div>
            )
        }
    }
    else {
        return (
            <>
                <Login fromOrder={true} open={true} func={OpenLogin}></Login>
            </>
        )

    }
}


export default OrderHistory;