import React, { useEffect, useContext, useState } from "react";
import UserProfile from "./UserProfile";
import UserServices from "../services/userServices";
import { AuthContext } from "../providers/auth_provider";
import ErrorMessage from "./other/ErrorMessage";

const HomePage = () => {

    const { user } = useContext(AuthContext);
    const [profileComplete, setprofileComplete] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        UserServices.getUserInfo(user.id)
        .then(response => {
            if(!response.data.address || !response.data.phoneNumber) {
                setprofileComplete(false);
            }
        })
        .catch(error => {
            const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
            setError(resMessage);
        });

    }, []);
    return(
    <div>
        {
            error ? <ErrorMessage message={error}/> : (!profileComplete ? <UserProfile/> : <h1>User HomePage</h1>)
        }
    </div>
    )
}

export default HomePage
