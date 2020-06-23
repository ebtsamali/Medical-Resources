import { useContext, useEffect } from "react";
import '../styles/public_home.scss'
import { AppContext } from "../providers/AppProvider";
import { AuthContext } from "../providers/auth_provider";
import UserSevice from "../services/userServices";
import { useLocation, useHistory } from "react-router-dom";

const MailActivationPage = (props) => {

    const { setTitle } = useContext(AppContext);
    const { setSuccessfulRegister, setRegisterMessage } = useContext(AuthContext);
    const token = useLocation().pathname.split('/')[3];
    let history = useHistory();

    useEffect(() => {
        setTitle('Medical Resources::Mail Activation')
    }, []);

    useEffect(() => {
        UserSevice.mailActivation(token)
            .then(response => {
                setSuccessfulRegister(true);
                setRegisterMessage(response.data.message);
                history.push('/');
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setSuccessfulRegister(false);
                setRegisterMessage(resMessage);
                history.push('/');
            })
    }, []);

    return (
        null
    )
}

export default MailActivationPage
