import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AllItems from '../components/AllItems';
import React, { useState ,useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";

import {
    Route,
    Link,
    useParams
} from "react-router-dom";


const Store = () => {

    const [id, setId] = useState('');
    const [categories, setCategories] = useState([]);
    
    function Child() {
        let { id } = useParams();
        setId(id)
                return (
                    <div>
                        <h3 className="category-title">{id}</h3>
                    </div>
                );
            }


    const LoadCategories = async () => {
        try{
        let res = await fetch('/api/category' , {method:'GET'})
        let data = await res.json()
        setCategories(data)
        }
        catch(err){console.log(err)}
    }


    useEffect(() => {
        LoadCategories()

    }, [])


    return (
        <>
            <NavBar></NavBar>

            <div className="StorePage">
            <Container>
                    <Row>
                    <Route path="/store/:id" children={<Child/>} />
                    </Row>
                    <Row>
                        <div className="categories-store-page">
                            {categories.map(c => {
                                return <>
                                    <div className="category-item" key={c.Category_Id}>
                                        <Link to={"/store/" + c.Category_Name}>{c.Category_Name}</Link>
                                    </div>
                                </>
                            })}
                        </div>
                    </Row>
                </Container>

                <AllItems Category_Id={id}></AllItems>
            </div>

            <Footer></Footer>

        </>
    )
}
export default Store;