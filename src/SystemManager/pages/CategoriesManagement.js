import { useState, useEffect , useRef } from 'react';
import { Container, Table } from "react-bootstrap";
import LoginAdmin from '../components/LoginAdmin';
import NavBarSys from '../components/NavBarSys';

import { BiNoEntry } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import { MdModeEdit } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FaSort } from "react-icons/fa";

import { useHistory } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import ProfileUser from '../components/ProfileUser';



const CategoriesManagement = (props) => {

    const [Categories, setCategories] = useState(null)
    const [AllCategories, setAllCategories] = useState(null)

    const [SearchBar, setSearchBar] = useState('')

    const history = useHistory()


    const freezeIcon = (
        <BiNoEntry icon={BiNoEntry} />
    )
    const activeIcon = (
        <GiConfirmed icon={GiConfirmed} />
    )
    const editIcon = (
        <MdModeEdit icon={MdModeEdit} />
    )
    const UserIcon = (
        <AiOutlineUser icon={AiOutlineUser} />
    )
    const SortIcon = (
        <FaSort icon={FaSort} />
    )

    const onlyactive = useRef([])


    const LoadCategories = async () => {
        try {
            let res = await fetch('/api/category', { method: 'GET' })
            let data = await res.json()
            setCategories(data)
            setAllCategories(data)
        }
        catch (err) { console.log(err) }
    }

    useEffect(() => {
        LoadCategories()
    }, [])


    useEffect(() => {
        if (SearchBar === '') {
            setCategories(AllCategories)
            history.push(window.location)
            return
        }
    }, [SearchBar])




    const DeleteCategory = async (c) => {

        try {

            let res = await fetch('/api/category/deletecategory/' + c.Category_id, {
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

    const ReverseTable = () => {

        setCategories(Categories.reverse())
        history.push(window.location)

    }

    const SearchTable = (e) => {

        setSearchBar(e)
        let newCategories = []
        for (let i = 0; i < AllCategories.length; i++) {

            if (AllCategories[i].Category_Name.toUpperCase().includes(e.toUpperCase())) {
                newCategories.push(AllCategories[i])
            }

        }
        setCategories(newCategories)
        history.push(window.location)

    }
    const [ProfileModal, setProfileModal] = useState(false);
    const [Currentprofile, setCurrentprofile] = useState(false);

    const OpenProfile = (Cp) => {

        let Currentprofile = Cp

        if (!ProfileModal) {
            setProfileModal(true);
        }
        else {
            setProfileModal(false);
        }
        setCurrentprofile(Currentprofile)
        history.push(window.location)


    }
    if (localStorage.getItem('admin')) {
        if (Categories !== null) {
            return (
                <>
                    <NavBarSys></NavBarSys>
                    {
                        Currentprofile !== null ? <ProfileUser open={ProfileModal} func={OpenProfile} user={Currentprofile}></ProfileUser> : ''
                    }
                    <Container>
                        <div className="top-pageUM">
                            <div className="tools">
                                <button className="btn-adduser" onClick={(e) => history.push({ pathname: '/addcategory', state: { detail: true } })}> הוספת קטגוריה </button>
                            </div>
                            <input className="search-bar" value={SearchBar} placeholder="...חיפוש קטגוריה" onChange={(e) => SearchTable(e.target.value)} />
                        </div>
                        <Table responsive className="table-Categories">
                            <thead>
                                <tr>
                                    <th>עריכה/צפייה</th>
                                    <th>שם קטגוריה</th>
                                    <th onClick={(e) => ReverseTable()}>id {SortIcon}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Categories.map((c) => {
                                        return (
                                            <tr >
                                                <>
                                                    <td className="iconsmanager">
                                                        <div className="freezeIcon" onClick={(e) => DeleteCategory(c, e)}>{freezeIcon}
                                                            <span class="tooltiptextfreeze">מחיקה</span>
                                                        </div>
                                                        <div className="editIcon" onClick={(e) => history.push({ pathname: '/edituser', state: { detail: true, category: c } })}>{editIcon}
                                                            <span class="tooltiptextedit">עריכה</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {c.Category_Name}
                                                    </td>
                                                    <td>
                                                        {c.Category_id}
                                                    </td>
                                                </>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Container>

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


export default CategoriesManagement;