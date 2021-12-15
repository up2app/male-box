import FormFeild from '../../components/formFeild';
import React, { useState, useEffect  ,useRef} from 'react';
import LoginAdmin from '../components/LoginAdmin';
import { useHistory } from 'react-router-dom';


const AddCategory = (props) => {


    const ifadmin = useRef([])
    const ifactive = useRef([])

    useEffect(() => {


        if (props.location.state !== undefined) {
            let confirm = props.location.state.detail
            setConfirm(confirm)

        }

    }, [])

    const [Category_Name, setCategory_Name] = useState('')

    const history = useHistory()


    const [ERRCategory_Name, setErrCategory_Name] = useState(false)

    const [AddCategoryConfirm, setAddCatgoryConfirm] = useState(false)
    const [Loader, setLoader] = useState(false)

    const [confirm, setConfirm] = useState(false)




    const AddCategoryfunc = async () => {
        setLoader(true)
        setAddCatgoryConfirm(false)
        try {
            let category = {
                "Category_Name": Category_Name,
                "Category_Image": "",
            }

            let res = await fetch('/api/category/addcategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)

            })
            let data = await res.json()
            
            if(Number(data.output["Category_id"])=== -1)
            {
                setLoader(false)
                setAddCatgoryConfirm(true)
                alert("קטגוריה כבר קיימת")
                return
            }
            setLoader(false)
            setAddCatgoryConfirm(true)
            alert("! קטגוריה נוספה בהצלחה")
            history.push("/categorymanagement")
            return


        }
        catch (err) { console.log(err) }
    }

    const CheckEdit = (e) => {
        e.preventDefault();
        setCategory_Name(false)
        let confirm = false;

        if (Category_Name === '') {
            setCategory_Name(true)
            confirm = true
        }
        if (confirm === true) {
            return
        }
        AddCategoryfunc()
    }

    if (confirm !== null) {
        if (localStorage.getItem('admin')) {
            return (

                <>

                    <div className="AddUserPage">
                        <div className="form-regiters">
                            <form action="" onSubmit={e => { CheckEdit(e) }}>
                                <h1>הוספת קטגוריה</h1>
                                <div className="fields">
                                    <FormFeild className="feild" value={Category_Name} type="text" name="(חובה) שם קטגוריה " action={setCategory_Name} err={ERRCategory_Name} />

                                    <button className="Btn-adduser" type="submit">הוסף קטגוריה</button>
                                </div>
                                <div className="center">
                                    <div className={Loader ? 'loader' : ''}></div>
                                </div>
                            </form >
                        </div>
                    </div>

                </>
            )
        }
        else {
            return (
                <>
                    <LoginAdmin></LoginAdmin>
                </>
            )
        }
    }
    else {
        return ""
    }
}
export default AddCategory;