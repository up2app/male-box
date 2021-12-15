import { icon } from "@fortawesome/fontawesome";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

const LinkMenu = (props) => {

    const hamburger = (
        <GiHamburgerMenu icon={GiHamburgerMenu} />
    )


    return (
        <>
            <div className="menu-dash">
                <Link to={props.link} className="link-menu" >
                    <div className="iconmenu">
                    {hamburger}
                    </div>
                    <div className="namemenu">
                    {props.name}
                    </div>
                </Link>
            </div>
        </>
    )

}


export default LinkMenu;