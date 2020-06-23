import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';


export default () => {

    const responseFacebook = (response) => {
        console.log(response);
        axios({
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}/auth/users/facebookLogin`,
            data: {accessToken: response.accessToken, userID: response.userID}
        }).then(response => {
            console.log("facebook login success, client side", response);
        })
    }

    return (
        <div>
            <FacebookLogin
                appId="295220421886704"
                autoLoad={false}
                callback={responseFacebook}
            />
        </div>
    )
}