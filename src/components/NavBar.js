import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";
import { BsHeart } from "react-icons/bs";
import MyCart from '../components/MyCart';
import WishList from './WishList';
import SearchInput from './SearchInput';
import { useState, useEffect } from 'react';
import Login from "../components/Login";
import Profile from "../components/Profile";
import ProductPage from "../pages/ProductPage";


const NavBar = (props) => {


    //icons
    const searchIcon = (
        <FiSearch icon={FiSearch} />
    )
    const UserIcon = (
        <AiOutlineUser icon={AiOutlineUser} />
    )
    const BagIcon = (
        <CgShoppingBag icon={CgShoppingBag} />
    )
    const Heart = (
        <BsHeart icon={BsHeart} />
    )

    // function to open cart modal 
    const [CartModal, setCartModal] = useState(false);
    const OpenCart = (event) => {
        if (!CartModal) {
            setCartModal(true);
        }
        else
            setCartModal(false);
    }

    // function to open login modal 
    const [LoginModal, setLogintModal] = useState(false);
    const OpenLogin = (event) => {
        if (!LoginModal) {
            setLogintModal(true);
        }
        else
            setLogintModal(false);
    }
    // function to open profile modal 
    const [ProfileModal, setProfileModal] = useState(false);
    const OpenProfile = (event) => {
        if (!ProfileModal) {
            setProfileModal(true);
        }
        else
            setProfileModal(false);
    }

    // function to open wishlist modal 
    const [WishListModal, setWishListModal] = useState(false);
    const OpenWishList = (event) => {
        if (!WishListModal) {
            setWishListModal(true);
        }
        else
            setWishListModal(false);
    }
    // function to open search modal 
    const [Search, setSearch] = useState(false);
    const OpenSearchInput = (event) => {
        if (!Search) {
            setSearch(true);
        }
        else
            setSearch(false);
    }
    
    //vars to counter items from cart
    const [Counter, setCounter] = useState('');
    let ItemFromLs = JSON.parse(localStorage.getItem('cart'))

    //vars to counter items from wishlist
    const [CounterWL, setCounterWL] = useState('');
    let ItemFromLsWL = JSON.parse(localStorage.getItem('wishlist'))

    const [userExist, setUserExist] = useState(false);
    const [userName, setUserName] = useState('');

    //get user from local storage
    useEffect(() => {
        if (localStorage.getItem('user')) {
            let user = JSON.parse(localStorage.getItem('user'))
            setUserExist(true)
            setUserName(user[0].User_Name)
        }
    }, [])

    // check if items count > 10 and if items count === 0 remove cart from loacal storage
    useEffect(() => {
    
        if (ItemFromLs) {
            let c = 0
            for (let i = 0; i < ItemFromLs.length; i++) {
                c += ItemFromLs[i].quantity
            }
            if (c > 10) {
                setCounter(10)
                return
            }
            setCounter(c)
            if (c === 0) {
                localStorage.removeItem('cart')

            }

        }
        // if wishlist is empty remove wishlist from local storage
        if (ItemFromLsWL) {
            setCounterWL(ItemFromLsWL.length)
            if (ItemFromLsWL.length === 0) {
                localStorage.removeItem('wishlist')
            }
        }

    }, [ItemFromLs, ItemFromLsWL])
    return (
        <>
            {/* modals */}
            <WishList open={WishListModal} func={OpenWishList}></WishList>
            <MyCart open={CartModal} func={OpenCart}></MyCart>
            <Login open={LoginModal} func={OpenLogin}></Login>
            <Profile open={ProfileModal} func={OpenProfile}></Profile>

        
            <Navbar className="navbar" collapseOnSelect expand="lg" bg="BgLogo" variant="light" dir="ltr" sticky='top'>
                <Container>
                    <NavLink to="/"><h1 className="logoMaleBox">male box</h1></NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav_item" to="/">אודות</NavLink>
                            <NavLink className="nav_item" to="/gallery">גלריה</NavLink>
                            <NavLink className="nav_item" to="/store/הכל">חנות</NavLink>
                        </Nav>
                        <Nav>
                            {
                                userExist === false ? <div className="nav_item" onClick={OpenLogin}>{UserIcon}</div> : <div className="nav_item" onClick={OpenProfile}>{"שלום " + userName}</div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <Nav className="items_in_top" >
                        <div className="nav_item .heartnofill" onClick={OpenWishList}>
                            {
                                ItemFromLsWL ? <p className="numOfItemCart">{CounterWL}</p> : ''
                            }
                            {Heart}
                        </div>
                        <div className="nav_item" onClick={OpenSearchInput}>
                            {searchIcon}
                        </div>
                        <div className="nav_item" onClick={OpenCart}>
                            {
                                ItemFromLs ? <p className="numOfItemCart">{Counter}</p> : ''
                            }
                            {BagIcon}
                        </div>
                    </Nav>

                </Container>
            </Navbar>
            {/* modal search */}
            <SearchInput open={Search}></SearchInput>
        </>
    )

}


export default NavBar;