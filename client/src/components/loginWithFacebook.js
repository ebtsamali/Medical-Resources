import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import '../styles/public_home.scss';
import UserService from '../services/userServices';
import { AuthContext } from "../providers/auth_provider";


export default () => {
    const { login } = useContext(AuthContext);

    const responseFacebook = (response) => {
        UserService.facebookResult(response).then(res => {
            const {email, name} = res.data;
            const password =  `${process.env.DEFAULT_PASSWORD}`;
            // const password =  email;
            console.log(password);
            UserService.checkEmail(email).then( checkResponse => {
                if (checkResponse.data.message === false) {
                    UserService.registerWithFacebook(email, name, password)
                    .then(registerResponse => {
                       if(registerResponse.data.message === true){
                            login(email, password);
                       }
                    })
                } else {
                    login(email, password);
                }
            })      
        }).catch(error=>{
            console.log(error)
        });
    }

    return (
        <div>
            <FacebookLogin
                appId="295220421886704"
                autoLoad={false}
                callback={responseFacebook}
                cssClass="login-with-facebook-btn"
                textButton="Login With Facebook As User"
            />
        </div>
    )
}
