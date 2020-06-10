import React, {useContext} from "react";
import {Helmet} from "react-helmet";
import {AppContext} from "../../providers/AppProvider";

const AppHead = () => {
    const {title} = useContext(AppContext)
    return (
            <Helmet>
                <title>{title}</title>
            </Helmet>
    );
}

export default AppHead
