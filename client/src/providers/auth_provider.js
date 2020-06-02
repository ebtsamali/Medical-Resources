import React, { createContext, useState } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom'
export const AuthContext = createContext();
const AuthProvider = (props) => {
    const { children } = props
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [error, setError] = useState('');
    const login = (email, password) => {
        axios({
            method:'post',
            url:`${process.env.REACT_APP_BACKEND_URL}/auth/users/signin`,
            data:{
                email,
                password
            }
        }).then((response)=>{
            setUser(response.data)
            localStorage.setItem("user",JSON.stringify(response.data))
            setError('')
            props.history.push("/")
        }).catch(error => {
            if(error.response.data.message){
                setError(error.response.data.message)
            }
        })
    }
    return (
        <AuthContext.Provider value={{ user, login, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default withRouter(AuthProvider);
