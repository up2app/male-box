import { useRef, useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom"
import emailjs from 'emailjs-com';
import { useHistory } from 'react-router-dom';

const OrderComfirn = (props) => {

    const { id } = useParams()
    const [userid , setUserId]= useState(null)
    const form = useRef();
    const history = useHistory()
    const [confirmOrder , setConfirmOrder]= useState(null)

    let user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if(user)
        {
            user = user[0]
            setUserId(user.User_id)
        }
        else
        {
            history.push("/")
            return(
                alert('משתמש לא מחובר')
            )
        }
        if(props.location.state !== undefined)
        {
            let confirmOrder = props.location.state.detail
            setConfirmOrder(confirmOrder)
        }
    
    
    }, [])
    if(confirmOrder === true)
    {
    return (
        <>
            <div className="confirmOrder">
            <div className="logoMaleBox2">male box</div>
                <div className="Order-C">
                <h2 className='confirmreg active'>! ההזמנה בוצעה בהצלחה</h2>
                <h5 style={{marginTop:"10px" , fontWeight:"bold"}}>male box ההזמנה נשלחה אליך למייל תודה שרכשת </h5>
                <h1> {id} :מספר ההזמנה שלך </h1>
                <Link to={"/ordershistory"}><button className="btn-history-order">צפה בהיסטוריית ההזמנות</button></Link>
                <Link to="/"><button className="btn-go-home">חזור לדף הבית</button></Link>
                </div>
            </div>

        </>
    )
    }
    else
    {
        return (
            <>
            </>
        )
    
    }

}


export default OrderComfirn;