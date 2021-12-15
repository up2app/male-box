import ItemWishList from './ItemWishList';
import ImageItemWishList from '../img/aviv.jpg';
import {useEffect } from 'react';
import { useHistory } from 'react-router-dom';



//componenets for wishlist 
const WishList = (props) => {

    let itemFromLS = JSON.parse(localStorage.getItem('wishlist'))

    
    const history = useHistory()

    //check if wishlist empty remove wishlist from local storage
    useEffect(() => {

        if(itemFromLS)
        {
            if(itemFromLS.length === 0)
            {
                localStorage.removeItem("wishlist");
                itemFromLS = JSON.parse(localStorage.getItem('wishlist'))
                history.push(window.location.pathname)
            }    
        }
    }, [])




    return (
        <>
            <div className={props.open ? 'dark-background active' : 'dark-background'} onClick={props.func}>
            </div>
            <div className={props.open ? 'my-wishlist active' : 'my-wishlist'}>
                <div className="btn-close" onClick={props.func}>
                </div>
                <div className="header-wishlist">
                    <div className="title-wishlist">
                        <h1>Wish List</h1>
                    </div>
                </div>
                <div className="content-wishlist">
                    {
                        itemFromLS ? itemFromLS.map(i => { return (<ItemWishList image={i.ItemImage} price={i.PriceOfItem} itemName={i.NameOfItem} id={i.id}></ItemWishList>) }) : <h4>רשימת המשאלות ריקה</h4>
                    }
                </div>
            </div>
        </>
    )

}


export default WishList;