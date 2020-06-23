import React, {useContext, useEffect} from "react";
import {AuthContext} from "../../providers/auth_provider";

const LoginWithGoogleSuccess = () => {
    const { setUser, setError } = useContext(AuthContext);
    useEffect(()=>{
        const params = window.location.search;
        if (window.opener) {
            const user = JSON.parse(decodeURI(params).replace('?user=',''))
            setUser(user)
            localStorage.setItem("user", JSON.stringify(user))
            setError('')
            window.opener.location.pathname='/'
            // close the popup
            window.close();
        }
    },[])
    return(<div>
        <b>Please Wait...</b>
    </div>)
}

export default LoginWithGoogleSuccess
