import ItemCart from './ItemCart';
import NavBar from './NavBar';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login'
const MyCart = (props) => {



    const history = useHistory()

    // The quantity and total price of the shopping cart
    let itemFromLS = JSON.parse(localStorage.getItem('cart'))
    let price = 0
    let counter = 0
    if (itemFromLS) {
        for (let i = 0; i < itemFromLS.length; i++) {
            price += Number(itemFromLS[i].PriceOfItem)
            counter += itemFromLS.quantity
        }

    }

    //get user fron local storage
    const [User, setUser] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('user')) {
            let UserFromLS = JSON.parse(localStorage.getItem('user'))[0]
            setUser(UserFromLS)
        }
    }, [])

    //open login modal
    const [LoginModal, setLogintModal] = useState(false);
    const OpenLogin = (event) => {
        if (!LoginModal) {
            setLogintModal(true);
        }
        else
            setLogintModal(false);
    }

    
    return (
        <>
            <div className={props.open ? 'dark-background active' : 'dark-background'} onClick={props.func}>
            </div>
            <div className={props.open ? 'my-cart active' : 'my-cart'}>
                <div className="btn-close" onClick={props.func}>
                </div>
                <div className="header-cart">
                    <div className="title-cart">
                        <h1>עגלת הקניות</h1>
                    </div>
                </div>
                <div className="content-cart">
                    {

                        itemFromLS ? itemFromLS.map(i => { return (<ItemCart itemName={i.NameOfItem} price={i.PriceOfItem} quantity={Number(i.quantity)} image={i.ItemImage} size={i.currentSize} color={i.currentColor} id={i.id}></ItemCart>) }) : <h4>עגלת הקניות ריקה</h4>
                    }
                </div>
                <div className="footer-cart">
                    <h3>סה״כ</h3>
                    <h3 className="price-cart">{price}</h3>
                    {
                        itemFromLS ? <button className="btn-payment" onClick={(e) => { history.push({ pathname: '/order', state: { detail: true } }) }
                        }>המשך לתשלום</button> : <button disabled className="btn-payment">המשך לתשלום</button>
                    }
                </div>

            </div>
        </>
    )

}




export default MyCart;