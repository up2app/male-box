import { useState, useEffect, useRef } from 'react';
import { Container, Table } from "react-bootstrap";
import LoginAdmin from '../components/LoginAdmin';
import NavBarSys from '../components/NavBarSys';

import { BiNoEntry } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import { MdModeEdit } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { FaSort } from "react-icons/fa";

import { useHistory } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import OrderUser from '../components/OrderUser';
import AllItems from '../../components/AllItems';



const OrderManagement = (props) => {

    const [Order, setOrder] = useState(null)
    const [Users, setUsers] = useState(null)
    const [AllOrder, setAllOrder] = useState(null)

    const [SearchNameInOrder, setSearchNameInOrder] = useState('')
    const [SearchDateInOrder, setSearchDateInOrder] = useState('')
    const [Items, setItems] = useState('')

    const history = useHistory()


    const freezeIcon = (
        <BiNoEntry icon={BiNoEntry} />
    )
    const activeIcon = (
        <GiConfirmed icon={GiConfirmed} />
    )
    const editIcon = (
        <MdModeEdit icon={MdModeEdit} />
    )
    const OrderIcon = (
        <AiOutlineOrderedList icon={AiOutlineOrderedList} />
    )
    const SortIcon = (
        <FaSort icon={FaSort} />
    )

    const onlyactive = useRef([])
    const onlypaid = useRef([])


    const LoadOrder = async () => {
        try {
            let res = await fetch('/api/order/allorders', { method: 'GET' })
            let data = await res.json()
            setOrder(data)
            setAllOrder(data)

        }
        catch (err) { console.log(err) }
    }
    const LoadUser = async (id) => {
        try {
            let res = await fetch('/api/users', { method: 'GET' })
            let data = await res.json()
            setUsers(data)
        }
        catch (err) { console.log(err) }
    }

    useEffect(() => {
        LoadOrder()
        LoadUser()
    }, [])


    useEffect(() => {
        if (SearchNameInOrder === '') {
            setOrder(AllOrder)
            history.push(window.location)
            return
        }
    }, [SearchNameInOrder])

    const OnlyActiveFunc = () => {
        if (onlyactive.current.checked === false) {
            setOrder(AllOrder)
            history.push(window.location)
        }
        else if (onlyactive.current.checked === true) {
            let newOrder = []
            for (let i = 0; i < AllOrder.length; i++) {
                if (AllOrder[i].IsActive === true) {
                    newOrder.push(AllOrder[i])
                }
            }
            setOrder(newOrder)
            history.push(window.location)

        }
    }
    const OnlyPaidFunc = () => {
        if (onlypaid.current.checked === false) {
            setOrder(AllOrder)
            history.push(window.location)
        }
        else if (onlypaid.current.checked === true) {
            let newOrder = []
            for (let i = 0; i < AllOrder.length; i++) {
                if (AllOrder[i].Paid === true) {
                    newOrder.push(AllOrder[i])
                }
            }
            setOrder(newOrder)
            history.push(window.location)

        }
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

    const ReturnUser = (id) => {
        let currentUser = ""
        if (Users !== null) {
            currentUser = Users.find(u => u.User_id === id)
            if (currentUser !== undefined) {
                currentUser = currentUser.First_Name + " " + currentUser.Last_Name
                return currentUser
            }
        }

    }

    const ActiveOrder = async (order) => {

        try {

            let res = await fetch('/api/Order/activeorder/' + order.Order_Id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },

            })

            let data = await res.json()
            window.location.reload(true)

        }
        catch (err) { console.log(err) }
    }

    const FreezeOrder = async (order, e) => {

        try {

            let res = await fetch('/api/Order/deleteorder/' + order.Order_Id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
            let data = await res.json()
            window.location.reload(true)

        }
        catch (err) { console.log(err) }
    }

    const ReverseTable = () => {

        setOrder(Order.reverse())
        history.push(window.location)

    }
    const ReturnTotal = () => {
        
        let total=0;
        if(Order !== null)
        {
            for (let i = 0; i < Order.length; i++) {
                
                total+=Order[i].Price_In_Order
            }
            return total
        }
    }


    const NameInOrder = (e) => {

        setSearchNameInOrder(e)
        let newOrder = []
        for (let i = 0; i < AllOrder.length; i++) {

            let usercurrent = ReturnUser(AllOrder[i].User_id)
            if (usercurrent !== undefined) {
                if (usercurrent.toString().toUpperCase().includes(e.toUpperCase())) {
                    newOrder.push(AllOrder[i])
                }
            }
        }
        setOrder(newOrder)
        history.push(window.location)

    }
    const DateInOrder = (e) => {


        setSearchDateInOrder(e)
        let newOrder = []
        for (let i = 0; i < AllOrder.length; i++) {

            let PareOrder = AllOrder[i].Order_Date.substr(10, AllOrder[i].length)
            PareOrder = AllOrder[i].Order_Date.replace(PareOrder, '')

            if (PareOrder === e) {
                newOrder.push(AllOrder[i])
            }
            setOrder(newOrder)
            history.push(window.location)
        }
    }


    const [OrderModal, setOrderModal] = useState(false);

    const [CurrentOrder, setCurrentOrder] = useState(false);


    const OpenOrder = (Co) => {

        let CurrentOrder = Co

        if (!OrderModal) {
            setOrderModal(true);
        }
        else {
            setOrderModal(false);
        }
        setCurrentOrder(CurrentOrder)
        history.push(window.location)


    }


    if (localStorage.getItem('admin')) {
        if (Order !== null && Users !== null) {
            return (
                <>
                    <NavBarSys></NavBarSys>
                    {
                        CurrentOrder !== null ? <OrderUser open={OrderModal} func={OpenOrder} Order={CurrentOrder} nameofuser={ReturnUser(CurrentOrder.User_id)} DateInOrder ={getParsedDate(CurrentOrder.Order_Date)} AllItems = {AllItems}></OrderUser> : ''
                    }
                    <Container>
                        <div className="top-pageOM">
                            <div className="onlybutton">
                                <div className="onlyactive"><input className="btn-adduser" id="onlyactive" type="checkbox" ref={onlyactive} onClick={(e) => OnlyActiveFunc()}></input><label htmlFor="onlyactive">הצג הזמנות פעילות בלבד</label></div>
                                <div className="onlyactive"><input className="btn-adduser" id="onlyactive" type="checkbox" ref={onlypaid} onClick={(e) => OnlyPaidFunc()}></input><label htmlFor="onlyactive">הצג רק הזמנות ששולמו</label></div>
                            </div>
                            <div className="search-by">
                                <div className="input-by">
                                    <label className="label1">חפש לפי שם</label>
                                    <input className="search-by-input" value={SearchNameInOrder}  onChange={(e) => NameInOrder(e.target.value)} />
                                </div>
                                <div className="input-by">
                                    <label className="label1">חפש לפי תאריך</label>
                                    <input className="search-by-input" type="date" value={SearchDateInOrder}  onChange={(e) => DateInOrder(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <Table responsive className="table-Order">
                            <thead>
                                <tr>
                                    <th>עריכה/צפייה</th>
                                    <th>מחיר בהזמנה</th>
                                    <th>? שולם</th>
                                    <th>שם בהזמנה</th>
                                    <th>תאריך הזמנה</th>
                                    <th onClick={(e) => ReverseTable()}>id {SortIcon}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Order.map((o) => {
                                        return (
                                            <tr className={o.IsActive === false ? 'freeze' : ''}  >
                                                <>
                                                    <td className="iconsmanager">
                                                        <div className="freezeIcon" onClick={(e) => FreezeOrder(o, e)}>{freezeIcon}
                                                            <span class="tooltiptextfreeze">הקפאה</span>
                                                        </div>
                                                        <div className="activeIcon" onClick={(e) => ActiveOrder(o)}>{activeIcon}
                                                            <span class="tooltiptextactive">הפעלה</span>
                                                        </div>
                                                        <div className="editIcon" onClick={(e) => history.push({ pathname: '/editorder', state: { detail: true, Order: o  , AllOrder:AllOrder } })}>{editIcon}
                                                            <span class="tooltiptextedit">עריכה</span>
                                                        </div>
                                                        <div className="UserIcon" onClick={(e) => OpenOrder(o)}>{OrderIcon}
                                                            <span class="tooltiptextview" >צפייה</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {o.Price_In_Order}
                                                    </td>

                                                    <td>
                                                        {o.Paid ? 'שולם' : 'לא שולם'}
                                                    </td>

                                                    <td>
                                                        {ReturnUser(o.User_id)}
                                                    </td>

                                                    <td>
                                                        {getParsedDate(o.Order_Date)}
                                                    </td>

                                                    <td>
                                                        {o.Order_Id}
                                                    </td>
                                                </>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <div className="TotalPriceOrders">
                          <h4 className="TotalAllPrice">: סכום כל ההזמנות</h4>
                          <h6 className="TotalAllPrice">{ReturnTotal()}</h6>
                        </div>


                        </Table>
                    </Container>

                </>
            )
        }
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
                <LoginAdmin></LoginAdmin>
            </>
        )

    }


}


export default OrderManagement;