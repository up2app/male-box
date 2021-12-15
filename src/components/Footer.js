import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaWaze } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Footer = (props) => {

    const WazeIcon = (
        <FaWaze icon={FaWaze} />
    )
    const WhatsappIcon = (
        <IoLogoWhatsapp icon={IoLogoWhatsapp} />
    )
    const instagramIcon = (
        <FaInstagram icon={FaInstagram} />
    )
    const mailIcon = (
        <FiMail icon={FiMail} />
    )

    return (
        <>
            <div className="footer">
                <Container fluid>
                    <Row>
                        <Col md="9">
                            <div className="links-footer">
                                <Link to="/">צור קשר</Link>
                                <Link to="/">משלוחים</Link>
                                <Link to="/">תקנון</Link>
                            </div>
                            <div className="links-footer-icon">
                                <Link to="/">{WazeIcon}</Link>
                                <Link to="/">{WhatsappIcon}</Link>
                                <Link to="/">{instagramIcon}</Link>
                                <Link to="/">{mailIcon}</Link>
                            </div>

                        </Col>
                        <Col md="3">
                            <div className="adress-logo-footer">
                                <h1>male box</h1>
                                <p>בן יהודה 113 ת"א טל. 03-5299458</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )

}


export default Footer;