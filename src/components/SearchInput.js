import React, { useState } from "react";
import { Container } from "react-bootstrap";

import { FiSearch } from "react-icons/fi";

//components for search bar in website
const SearchInput = (props) => {

    const [searchValue, setsearchValue] = useState("");

    const searchIcon = (
        <FiSearch icon={FiSearch} />
    )


    return (
        <>
        <Container>
            <div className={props.open ? 'seacrh-input active' : 'seacrh-input'}>
            <input type="search" value={searchValue} onChange={e => { setsearchValue(e.target.value); }} placeholder="...חיפוש"></input>
            <button className="btn-seacrh-navbar">{searchIcon}</button>
            </div>
        </Container>
        </>
    )

}


export default SearchInput;