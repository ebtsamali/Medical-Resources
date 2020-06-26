import React from "react";

const UserInfo = (props) => {
    const {data} = props
    console.log(data.phone)
    return(<div className="user-info-container">
        <h4>User Info</h4>
        <div className="basic-info-container">
            <div>
                <input className="form-input" disabled={true} type="text" value={data.name}/>
            </div>
            {data.phone && <div>
                <input className="form-input" disabled={true} type="text" value={data.phone}/>
            </div>}
        </div>
        { data.address && <div>
            <input className="form-input w-100" disabled={true} type="text" value={data.address}/>
        </div>}
    </div>)
}

export default UserInfo
