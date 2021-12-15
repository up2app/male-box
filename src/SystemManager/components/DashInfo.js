

const DashInfo = (props) => {

    return (
        <>
        <div className="dash-informatiom">
            <div className="info-title">
                <h6>{props.title}</h6>
            </div>
            <div className="info-content">
                <h6>{props.content}</h6>
            </div>
            <div className="info-icon">
                <h6>{props.icon}</h6>
            </div>

        </div>

        </>
    )

}


export default DashInfo;
