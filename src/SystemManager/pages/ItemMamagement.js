import { useState, useEffect, itemef  , useRef} from 'react';
import { Container, Table, Row, Col } from "react-bootstrap";
import LoginAdmin from '../components/LoginAdmin';
import NavBarSys from '../components/NavBarSys';

import { AiOutlineitem } from "react-icons/ai";
import { FaSort } from "react-icons/fa";

import { useHistory } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import ProductAdmin from '../components/ProductAdmin';



const ItemManagement = (props) => {

    const [items, setitems] = useState(null)
    const [Allitems, setAllitems] = useState(null)
    const [SearchBar, setSearchBar] = useState('')
    const history = useHistory()


    const SortIcon = (
        <FaSort icon={FaSort} />
    )

    const onlyactive = useRef([])


    const Loaditems = async () => {
        try {
            let res = await fetch('/api/items/allitems', { method: 'GET' })
            let data = await res.json()
            setitems(data)
            setAllitems(data)
        }
        catch (err) { console.log(err) }
    }

    useEffect(() => {
        Loaditems()
    }, [])


    useEffect(() => {
        if (SearchBar === '') {
            setitems(Allitems)
            history.push(window.location)
            return
        }
    }, [SearchBar])

    const OnlyActiveFunc = () => {
        console.log(onlyactive.current.checked)
        if (onlyactive.current.checked === false) {
            setitems(Allitems)
            history.push(window.location)
        }
        else if (onlyactive.current.checked === true) {
            let newitems = []
            for (let i = 0; i < Allitems.length; i++) {
                if (Allitems[i].IsActive === true) {
                    newitems.push(Allitems[i])
                }
            }
            setitems(newitems)
            history.push(window.location)

        }
    }


    const SearchItem = (e) => {

        setSearchBar(e)
        let newitems = []
        for (let i = 0; i < Allitems.length; i++) {

            if (Allitems[i].Title.toUpperCase().includes(e.toUpperCase()) || Allitems[i].Category_Name.toUpperCase().includes(e.toUpperCase()) || Allitems[i].Price.toString().toUpperCase().includes(e)) {
                newitems.push(Allitems[i])
            }

        }

        setitems(newitems)
        history.push(window.location)

    }
    if (localStorage.getItem('admin')) {
        if (items !== null) {
            return (
                <>
                    <NavBarSys></NavBarSys>
                    <div className="all-items-admin">
                        <center>
                                <div className="top-pageIM">
                                    <div className="tools">
                                        <button className="btn-adduser" onClick={(e) => history.push({ pathname: '/additem', state: { detail: true } })}> הוספת מוצר חדש</button>
                                        <div className="onlyactive"><input className="btn-adduser" id="onlyactive" type="checkbox" ref={onlyactive} onClick={(e) => OnlyActiveFunc()}></input><label htmlFor="onlyactive">הצג מוצרים פעילים בלבד</label></div>
                                    </div>
                                    <input className="search-bar" value={SearchBar} placeholder="...חיפוש מוצר" onChange={(e) => SearchItem(e.target.value)} />
                                </div>

                                <Row>
                                    {items.map(item => {
                                        return <>
                                            <Col lg="3" md="4" sm="6">
                                                <ProductAdmin key={item.Item_Id} name={item.Title} image={item.Item_Image} price={item.Price} id={item.Item_Id} isactive={item.IsActive} item={item}>  </ProductAdmin>
                                            </Col>
                                        </>
                                    }
                                    )}
                                </Row>
                        </center>
                    </div>
                </>
            )
        }
        else {
            return (
                <div className="centerPP">
                    <div class="loader"></div>
                    <h1 className="logoMaleBox2">male box</h1>
                </div>
            )
        }
    }
    else {
        return (
            <>
                <LoginAdmin></LoginAdmin>
            </>
        )

    }


}


export default ItemManagement;