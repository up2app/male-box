import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { useHistory  , Link} from 'react-router-dom';
import { useParams } from "react-router-dom"


const ItemCart = (props) => {

    const history = useHistory()
    const [quantity, setQuantity] = useState(props.quantity);
    if (quantity < 0) {
        setQuantity(0)
    }
    if (quantity > 10) {
        setQuantity(10)
    }
    if (props.quantity === 0 || props.quantity < 0) {
        let itemFromLs = JSON.parse(localStorage.getItem('cart'))
        itemFromLs = itemFromLs.filter(i => i.quantity !== props.quantity)
        localStorage.setItem('cart', JSON.stringify(itemFromLs))
        history.push(window.location.pathname)
    }

    const Pluse = (
        <AiOutlinePlus />
    )
    const Minus = (
        <AiOutlineMinus />
    )
    const TrashIcon = (
        <BiTrash />
    )

    const PluseItemInCart = () => {
        setQuantity(Number(quantity) + 1);
        let itemFromLs = JSON.parse(localStorage.getItem('cart'))
        if (itemFromLs) {
            for (let i = 0; i < itemFromLs.length; i++) {
                if (itemFromLs[i].id === props.id && itemFromLs[i].currentSize === props.size && itemFromLs[i].currentColor === props.color) {
                    itemFromLs[i].quantity = quantity + 1
                    if(itemFromLs[i].quantity <=10)
                    {
                        itemFromLs[i].PriceOfItem += (itemFromLs[i].PriceOfItem / quantity)
                    }
                    localStorage.setItem('cart', JSON.stringify(itemFromLs))
                    history.push(window.location.pathname)
                    break
                }
            }
        }
    }
    const MinusItemInCart = () => {
        setQuantity(Number(quantity) - 1);
        let itemFromLs = JSON.parse(localStorage.getItem('cart'))
        if (itemFromLs) {
            for (let i = 0; i < itemFromLs.length; i++) {
                if (itemFromLs[i].id === props.id && itemFromLs[i].currentSize === props.size && itemFromLs[i].currentColor === props.color) {
                    itemFromLs[i].quantity = quantity - 1
                    itemFromLs[i].PriceOfItem -= (itemFromLs[i].PriceOfItem / quantity)
                    if (itemFromLs[i].quantity === -1) {
                        itemFromLs[i].quantity = 0
                    }
                    localStorage.setItem('cart', JSON.stringify(itemFromLs))
                    history.push(window.location.pathname)
                    break
                }
            }
        }
    }
    const DeleteItem = () => {
        let itemFromLs = JSON.parse(localStorage.getItem('cart'))
        for (let i = 0; i < itemFromLs.length; i++) {
            if (itemFromLs[i].id === props.id && itemFromLs[i].currentSize === props.size && itemFromLs[i].currentColor === props.color) {
                itemFromLs[i].quantity = 0
                localStorage.setItem('cart', JSON.stringify(itemFromLs))
                history.push(window.location.pathname)
                break
            }
        }

    }

    useEffect(() => {
        setQuantity(props.quantity);
    }, [props.quantity])



    return (
        <>
            <div className="item-in-cart">
                <div className="item-image-cart">
                    <Link to={"/products/" + props.id}>
                        <img src={props.image} alt="" />
                    </Link>
                </div>
                <div className="text-price-in-cart">
                    <h4 className='namePrice' >{props.itemName}</h4>
                    <div className="plus-minus-input">
                        <div id="pluse" className="item-plus-minus" onClick={e => { PluseItemInCart(e) }}>
                            {Pluse}
                        </div>
                        <div id="quantity" className="item-plus-minus">
                            {quantity}
                        </div>
                        <div id="minus" className="item-plus-minus" onClick={e => { MinusItemInCart(e) }}>
                            {Minus}
                        </div>
                    </div>
                    <p>צבע:&nbsp;&nbsp;{props.color}</p>
                    <p>{props.size}&nbsp;&nbsp;:מידה</p>
                    <p>מחיר:&nbsp;&nbsp;{props.price}₪</p>
                    <div className="trash-edit">
                        <div id="trashIcon" className="trash-edit-icon" onClick={DeleteItem}>
                            {TrashIcon}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default ItemCart;