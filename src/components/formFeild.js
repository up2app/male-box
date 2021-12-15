
import Select from 'react-select'

const FormField = (props) => {

    const ifimage = () => {
        //props=נתונים שמועברים לקומפוננטה מקופמפוננטה אחרת 
        if (props.targetImg === "") {//  בדיקה אם לא העלו עדיין תמונה
            return ""
        }
        else {// אם כן העלו תמונה יחזיר את התמונה
            return props.targetImg
        }
    }


    // בדיקה מה סוג הקובץ 
    switch (props.type) {
        case 'list':// אם התיבה היא מסוג רשימה נחבר לה את רשימת הצבעים.
            let options = []
            props.data.map(item => options.push({ value: item.name, label: item.name }))
            let size = ""
            return (
                <>
                    <div className={props.className}>
                        <label className="label">{props.name}</label>

                        <Select className={props.err ? 'err' : 'feild1'} isMulti options={options} placeholder="בחר" onChange={(event) => { props.action(size += event.map(e => e.value.toString())) }} />
                    </div>
                </>

            )
        case 'Category':
            let optionsCategory = []
            props.data.map(c => optionsCategory.push({ value: c.Category_Name, label: c.Category_Name }))
            let category = ""
            return (
                <>
                    <div className={props.className}>
                        <label className="label">{props.name}</label>

                        <Select className={props.err ? 'err' : 'feild1'}  options={optionsCategory} placeholder={optionsCategory.length === 0 ? 'loading...' :'בחר קטגוריה'} onChange={(event) => { props.action(event.value) }} />
                    </div>
                </>

            )

        case 'file':// אם התיבה היא מסוג קובץ
            if (ifimage() !== "") {// הפעלת הבדיקה אם יש תמונה או אין 
                return (
                    <div className={props.className}> {/* אם יש תמונה יחזיר את התמונה מתחת לתיבה  */}
                        <input className="InputImage" placeholder={props.name} type={props.type} onChange={(event) => { props.action(event.target, props.Imagenum) }}></input>
                        <img className="img-upload" src={props.targetImg} alt="" />
                    </div>
                )
            }
            else {// במידה ואין תמונה לא נתמש בכלל  תמונה 
                return <div className={props.className}>
                    <input className={props.err ? 'err' : 'feild1'} placeholder={props.name} type={props.type} onChange={(event) => { props.action(event.target, props.Imagenum) }}></input>
                </div>
            }

        default:
            if (!props.textarea) {
                return (// מחזיר את כל מה שהוא לא תמונה או קובץ
                    <div className={props.className}>
                        <label className="label">{props.name}</label>
                        <input className={props.err ? 'err' : 'feild1'} type={props.type} value={props.value ? props.value : ''} onInput={(event) => { props.action(event.target.value) }} />
                    </div>
                )
            }
            else {
                return (// מחזיר את כל מה שהוא לא תמונה או קובץ
                    <div className={props.className}>
                        <label className="label">{props.name}</label>
                        <textarea className={props.err ? 'err' : 'feild1'} type={props.type} value={props.value ? props.value : ''} onInput={(event) => { props.action(event.target.value) }} />
                    </div>
                )
            }
    }
}

export default FormField;