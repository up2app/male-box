import { BsHeart } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { BsHeartFill } from "react-icons/bs"
const Product = (props) => {


    //icons
    const Heart = (
        <BsHeart icon={BsHeart} />
    )
    const FillHeart = (
        <BsHeartFill icon={BsHeartFill} />
    )

    const history = useHistory()


    //function add to wishlist
    const addToWishList = (e) => {
        //all vars
        let NameOfItem = props.name
        let PriceOfItem =''
        if(props.sale !== 0)
        {
          PriceOfItem= props.sale
    
        }
        else
        {
          PriceOfItem= props.price
        }
        let ItemDes = ''
        let ItemImage = props.image
        let id = props.id
        id = id.toString()

        //create item to wishlist
        let item = [{ NameOfItem, PriceOfItem, id, ItemDes, ItemImage }]

        //check if wishlist exist in local storage
        if (localStorage.getItem('wishlist')) {

            let itemFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))
            let ok = true

            //if wishlist exist in local storage push new item to wishlist
            for (let i = 0; i < itemFromLocalStorage.length; i++) {
                if (itemFromLocalStorage[i].id === id) {
                    itemFromLocalStorage = itemFromLocalStorage.filter(i => i.id !== id)
                    localStorage.setItem('wishlist', JSON.stringify(itemFromLocalStorage))

                    return
                }
            }
            itemFromLocalStorage.push(null)
            itemFromLocalStorage[itemFromLocalStorage.length - 1] = item[0]
            localStorage.setItem('wishlist', JSON.stringify(itemFromLocalStorage))

        }
        else {
            //if wishlist not exist in local storage create new wishlist and put new item inside
            localStorage.setItem('wishlist', JSON.stringify(item))
        }

    }
    return (
        <>
            <div className="item">
                <div className="item-header">
                    <Link to={"/products/" + props.id}>
                        <img src={props.image} alt="" />
                    </Link>
                    <button className="add-to-wish-list-btn" onClick={(e) => addToWishList(e.target)}>{props.inWishList === true ? FillHeart : Heart} </button>

                </div>
                <div className="item-footer">
                    <div className="item-name">
                        <Link to={"/products/" + props.id}>{props.name}</Link>
                    </div>
                    {props.sale === 0 ? <div className="item-price">
                        <h6>{props.price + " ₪"}</h6>
                    </div> : <div className="item-price">
                        <h6 className="before-sale">{props.price + " ₪"}</h6>
                        <h6 className="sale-price">{props.sale + " ₪"}</h6>
                    </div>
                    
 }
                </div>
            </div>
        </>
    )

}


export default Product;