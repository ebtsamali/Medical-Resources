import React from "react";

const UserInfo = (props) => {
    const {data} = props
    return(<div className="user-info-container">
        <h4>User Info</h4>
        <div className="basic-info-container">
            <div>
                <input className="form-input" disabled={true} type="text" value={data.name}/>
            </div>
            <div>
                <input className="form-input" disabled={true} type="text" value={data.phone}/>
            </div>
        </div>
        <div>
            <input className="form-input w-100" disabled={true} type="text" value={data.address}/>
        </div>
    </div>)
}

export default UserInfo
