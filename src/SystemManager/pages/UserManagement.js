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



const UserManagement = (props) => {

    const [users, setUsers] = useState(null)
    const [Allusers, setAllUsers] = useState(null)

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


    const LoadUsers = async () => {
        try {
            let res = await fetch('/api/users/allusers', { method: 'GET' })
            let data = await res.json()
            setUsers(data)
            setAllUsers(data)

        }
        catch (err) { console.log(err) }
    }

    useEffect(() => {
        LoadUsers()
    }, [])


    useEffect(() => {
        if (SearchBar === '') {
            setUsers(Allusers)
            history.push(window.location)
            return
        }
    }, [SearchBar])

    const OnlyActiveFunc = () => {
        console.log(onlyactive.current.checked)
        if (onlyactive.current.checked === false) {
            setUsers(Allusers)
            history.push(window.location)
        }
        else if(onlyactive.current.checked === true)
        {
            let newusers = []
            for (let i = 0; i < Allusers.length; i++) {
                if(Allusers[i].IsActive === true)
                {
                    newusers.push(Allusers[i])
                }
            }
            setUsers(newusers)
            history.push(window.location)

        }
    }




    const ActiveUser = async (user) => {

        try {

            let res = await fetch('/api/users/activeuser/' + user.User_id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)

            })

            let data = await res.json()
            window.location.reload(true)

        }
        catch (err) { console.log(err) }
    }

    const FreezeUser = async (user, e) => {

        try {

            let res = await fetch('/api/users/deleteuser/' + user.User_id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)

            })
            let data = await res.json()
            window.location.reload(true)
        }
        catch (err) { console.log(err) }
    }

    const ReverseTable = () => {

        setUsers(users.reverse())
        history.push(window.location)

    }

    const SearchTable = (e) => {

        setSearchBar(e)
        let newusers = []
        for (let i = 0; i < Allusers.length; i++) {

            if (Allusers[i].User_Name.toUpperCase().includes(e.toUpperCase()) || Allusers[i].First_Name.toUpperCase().includes(e.toUpperCase()) || Allusers[i].Last_Name.toUpperCase().includes(e.toUpperCase())) {
                newusers.push(Allusers[i])
            }

        }
        setUsers(newusers)
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
        if (users !== null) {
            return (
                <>
                    <NavBarSys></NavBarSys>
                    {
                        Currentprofile !== null ? <ProfileUser open={ProfileModal} func={OpenProfile} user={Currentprofile}></ProfileUser> : ''
                    }
                    <Container>
                        <div className="top-pageUM">
                            <div className="tools">
                                <button className="btn-adduser" onClick={(e) => history.push({ pathname: '/adduser', state: { detail: true } })}> הוספת משתמש חדש</button>
                                <div className="onlyactive"><input className="btn-adduser" id="onlyactive" type="checkbox"  ref={onlyactive} onClick={(e) => OnlyActiveFunc()}></input><label htmlFor="onlyactive">הצג משתמשים פעילים בלבד</label></div>
                            </div>
                            <input className="search-bar" value={SearchBar} placeholder="...חיפוש משתמש" onChange={(e) => SearchTable(e.target.value)} />
                        </div>
                        <Table responsive className="table-users">
                            <thead>
                                <tr>
                                    <th>עריכה/צפייה</th>
                                    <th>שם משפחה</th>
                                    <th>שם פרטי</th>
                                    <th>שם משתמש</th>
                                    <th onClick={(e) => ReverseTable()}>id {SortIcon}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((u) => {
                                        return (
                                            <tr className={u.IsActive === false ? 'freeze' : ''}  >
                                                <>
                                                    <td className="iconsmanager">
                                                        <div className="freezeIcon" onClick={(e) => FreezeUser(u, e)}>{freezeIcon}
                                                            <span class="tooltiptextfreeze">הקפאה</span>
                                                        </div>
                                                        <div className="activeIcon" onClick={(e) => ActiveUser(u)}>{activeIcon}
                                                            <span class="tooltiptextactive">הפעלה</span>
                                                        </div>
                                                        <div className="editIcon" onClick={(e) => history.push({ pathname: '/edituser', state: { detail: true, user: u } })}>{editIcon}
                                                            <span class="tooltiptextedit">עריכה</span>
                                                        </div>
                                                        <div className="UserIcon" onClick={(e) => OpenProfile(u)}>{UserIcon}
                                                            <span class="tooltiptextview" >צפייה</span>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        {u.Last_Name}
                                                    </td>
                                                    <td>
                                                        {u.First_Name}
                                                    </td>
                                                    <td>
                                                        {u.User_Name}
                                                    </td>
                                                    <td>
                                                        {u.User_id}{u.User_Type === 1 ? <p style={{ color: 'green', fontWeight: 'bold' }}><br />מנהל מערכת</p> : ''}
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


export default UserManagement;