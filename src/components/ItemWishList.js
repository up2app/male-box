import { BiTrash } from 'react-icons/bi'
import { GrEdit } from 'react-icons/gr'
import { Link, useHistory } from 'react-router-dom';


const ItemWishList = (props) => {

    const TrashIcon = (
        <BiTrash />
    )
    const EditIcon = (
        <GrEdit />
    )
    const history = useHistory()

    const DeleteItem = () => {
        let itemFromLs = JSON.parse(localStorage.getItem('wishlist'))
        itemFromLs =  itemFromLs.filter(i => i.id !== props.id)
        localStorage.setItem('wishlist', JSON.stringify(itemFromLs))
        history.push(window.location.pathname)
    }


    return (
        <>
            <div className="item-in-WishList">
                <div className="item-image-WishList">
                <Link to={"/products/"+props.id}>
                <img src={props.image} alt="" />
                </Link>
                </div>
                <div className="text-price-in-WishList">
                    <h4 className='nameItem' >{props.itemName}</h4>
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


export default ItemWishList;