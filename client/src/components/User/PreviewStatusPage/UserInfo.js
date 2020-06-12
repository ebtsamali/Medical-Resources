import React from "react";

const UserInfo = () => {
    return(<div className="user-info-container">
        <h4>User Info</h4>
        <div className="basic-info-container">
            <div>
                <input className="form-input" disabled={true} type="text" value="Ahmed Adel"/>
            </div>
            <div>
                <input className="form-input" disabled={true} type="text" value="01060789512"/>
            </div>
        </div>
        <div>
            <input className="form-input w-100" disabled={true} type="text" value="12 asdwq sadsa, ASSA, qweqwewwq"/>
        </div>
    </div>)
}

export default UserInfo
