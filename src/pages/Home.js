import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import HomePageImg2 from '../img/slide 1.jpg';
import HomePageImg3 from '../img/slide 1.jpg';
import HomePageImg4 from '../img/slide 1.jpg';
import CasualIMG from '../img/home_page_casual.jpg';
import TailoredIMG from '../img/home _page_ tailored.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ButtonMaleBox from '../components/ButtonMaleBox';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import FormField from '../components/formFeild';

const Home = () => {
  
    //setting for image slider 
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1

    };

    const [HomePage, setHomePage] = useState(null);

    const LoadHomePage = async () => {
        try {
            let res = await fetch('/api/homepage', { method: 'GET' })
            let data = await res.json()
            setHomePage(data)
            console.log(data)

        }
        catch (err) { console.log(err) }
    }

    // fetch all page from db
    useEffect(() => {

        LoadHomePage()

    }, [])

    const [image, setImage] = useState(null);

    const uploadImage = (input) => { // העלאת תמונה והמרה לבייס 64
    
        if (input.files && input.files[0]) {
            let reader = new FileReader();
    
            reader.onload = function (e) {
                setImage(e.target.result)
                console.log(e.target.result);
            }
            
    
            reader.readAsDataURL(input.files[0]); //convert to base64 string
        }
    }

    if(HomePage !== null)
    {
    return (
        <>
            <NavBar></NavBar>
            <div className="header_home_page">
                 {/* <FormField className="Input-image"  value={image} type="text" name="תמונה (חובה)" action={uploadImage} targetImg={image} type="file" /> */}
                {/* <button className='ttt' onClick={(e) => console.log(image)}>showimage</button> */}
                <Container >
                    <Row className="top_home_page">
                        <Slider className="carousel" {...settings}>
                            {
                                HomePage[0].MainImage ? 
                                <img className="HomePageImage" src={HomePage[0].MainImage} alt="" />
                                :
                                ''
                            }
                            {
                                HomePage[0].MainImage1 ? 
                                <img className="HomePageImage" src={HomePage[0].MainImage1} alt="" />
                                :
                                ''
                            }
                            {
                                HomePage[0].MainImage2 ? 
                                <img className="HomePageImage" src={HomePage[0].MainImage2} alt="" />
                                :
                                ''
                            }
                        </Slider>
                        {/* <div className="onImage"> */}
                        {/* <img src={LogoMaleBox} alt="" /> */}
                        <div className="tracking-in-contract-bck">
                            <h1>male box</h1>
                            <div className="btn-top-hp">
                            <ButtonMaleBox  link="/store/הכל" text={HomePage[0].ButtonText}></ButtonMaleBox>
                            </div>
                        </div>

                        {/* </div> */}
                    </Row>
                </Container>
            </div>
            <div className="content_home_page">
                <Container>
                    <Row className="categotries_home_page">
                        <Col md="6">
                            <div className="category">
                                <Link to="/gallery">
                                    <img className="categoryImage" loading='lazy' src={HomePage[0].Category_Image1} alt="" />
                                    <div className="btn-category">
                                        <ButtonMaleBox link='/gallery' text={HomePage[0].Category_Button2}></ButtonMaleBox>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="category">
                                <Link to="/store">
                                    <img className="categoryImage" loading='lazy' src={HomePage[0].Category_Image2} alt="" />
                                    <div className="btn-category">
                                        <ButtonMaleBox link='/store' text={HomePage[0].Category_Button}></ButtonMaleBox>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="about_us">
                <Container>
                    <Row className="about_us_h_p">
                        <div className="title_about_us">

                            <Col md="12">
                                <h1>מיכאל שליו ובני כהן שור</h1>
                            </Col>
                        </div>
                        <div className="text_about_us">
                            <Col md="12">
                                <p dir="rtl">תחת המותג malebox מציגים המעצבים מיכאל שליו ובני כהן שור את קולקציית בגדי הגברים שלהם, כבר למעלה מ20 שנה. המעצבים, בוגרי האקדמיה לאופנה שנקר מציעים קולקציה המבטאת אינטרפטציה אישית לטרנדים העולמיים באופנה ושילובם בנוף האורבני התל אביבי. התוצאה היא דגמים על זמניים כשהסוד הוא בגזרה ובאיכות ללא פשרות. כל דגם מיוצר בסטודיו בת״א, & hand made Custom made
                                </p>
                            </Col>
                        </div>
                        <div className="btn-about_us">
                            <ButtonMaleBox link='/' text='&lt; 	&nbsp;	&nbsp;אודות'></ButtonMaleBox>
                        </div>

                    </Row>
                </Container>
            </div>

            <Footer></Footer>

        </>
    )
    }
    else
    {
        return(<center>
        <div className="loading-item">
        <div class="loader"></div>
        <h1 className="logoMaleBox2">male box</h1>
        </div>
     </center>)
    }
}
export default Home;