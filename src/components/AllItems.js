import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";
import React, { useState, useEffect } from 'react';

// all items in store page

const AllItems = (props) => {

    const [items, setItems] = useState(null);

    const LoadItems = async () => {
        try {
            let res = await fetch('/api/items', { method: 'GET' })
            let data = await res.json()
            return data
            // setItems(data)
        }
        catch (err) { console.log(err) }
    }

    // fetch all items from db
    useEffect(() => {

        LoadItems().then(data => {
            setItems(data)
        })

    }, [])


    let itemFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))


    if (items !== null && items !== undefined) {
        return (
            <>
                <div className="all-items">
                    <center>
                        <Container>
                            <Row>
                                {items.filter(i => i.Category_Name === props.Category_Id || props.Category_Id === "הכל" || props.Category_Id === "").map(item => {
                                    let iteminwishlist = []
                                    if (itemFromLocalStorage) {
                                        iteminwishlist = itemFromLocalStorage.filter(i => item.Item_Id.toString() === i.id.toString())

                                    }
                                    //if wishlist is not empty All products in the wish list will be marked
                                    if (iteminwishlist.length > 0) {
                                        return <>
                                            <Col lg="3" md="4" sm="6">
                                                <Product key={item.Item_Id} name={item.Title} image={item.Item_Image} price={item.Price} id={item.Item_Id} inWishList={true} sale={item.Sell_Price}> </Product>
                                            </Col>

                                        </>
                                    }
                                    else {
                                        return <>
                                            <Col lg="3" md="4" sm="6">
                                                <Product key={item.Item_Id} name={item.Title} image={item.Item_Image} price={item.Price} id={item.Item_Id} sale={item.Sell_Price}> </Product>
                                            </Col>

                                        </>
                                    }
                                })}
                            </Row>
                        </Container>
                    </center>
                </div>
            </>
        )
    }
    else {
        return (
            <center>
                <div className="loading-item">
                <div class="loader"></div>
                <h1 className="logoMaleBox2">male box</h1>
                </div>
            </center>
        )

    }
}


export default AllItems;