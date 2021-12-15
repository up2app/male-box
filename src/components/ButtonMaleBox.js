import Button from '@restart/ui/esm/Button';
import { Link } from 'react-router-dom';
const ButtonMaleBox = (props) => {

    return (
        <>
        <Button className="btn-male-box">
           <Link to={props.link}>{props.text}</Link>
        </Button>
        </>
    )

}


export default ButtonMaleBox;