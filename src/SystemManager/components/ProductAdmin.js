import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { BiNoEntry } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import { MdModeEdit } from "react-icons/md";

const ProductAdmin = (props) => {

    const freezeIcon = (
        <BiNoEntry icon={BiNoEntry} />
    )
    const activeIcon = (
        <GiConfirmed icon={GiConfirmed} />
    )
    const editIcon = (
        <MdModeEdit icon={MdModeEdit} />
    )

    const history = useHistory()


    const Activeitem = async (item) => {

        try {

            let res = await fetch('/api/items/activeitem/' + props.id.toString(), {
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

    const FreezeItem = async (e) => {


        console.log(props.id)
        try {

            let res = await fetch('/api/items/deleteitem/' + props.id.toString(), {
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


    return (
        <>
                <div className="item">
                    <div className="item-header">
                        <img className={props.isactive ?'':"freezeImage"} src={props.image} alt="" />

                        <div className={props.isactive ? 'noactive' : "noactive active"}>לא פעיל</div>

                        <div className="iconProduct">
                            <div className="freezeIcon" onClick={(e) => FreezeItem(e.target)}>{freezeIcon}
                                <span class="tooltiptextfreeze">הקפאה</span>
                            </div>
                            <div className="activeIcon" onClick={(e) => Activeitem(e)}>{activeIcon}
                                <span class="tooltiptextactive">הפעלה</span>
                            </div>
                            <div className="editIcon" onClick={(e) => history.push({ pathname: '/edititem', state: { detail: true, item: props.item} })}>{editIcon}
                                <span class="tooltiptextedit">עריכה</span>
                            </div>

                        </div>
                        <div className="editIcon" onClick={(e) => window.open('/products/'+props.id, "_blank")}>
                                <center><button class="btn-view-item">לצפייה בעמוד המוצר</button></center>
                         </div>
                    </div>
                    <div className="item-footer">
                        <div className="item-name">
                            {props.name}
                        </div>
                        <div className="item-price">
                            <h6>{props.price + " ₪"}</h6>
                        </div>
                    </div>

                </div>
        </>
    )

}


export default ProductAdmin;