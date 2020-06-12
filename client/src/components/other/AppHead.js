import React, {useContext} from "react";
import {Helmet} from "react-helmet";
import {AppContext} from "../../providers/AppProvider";

const AppHead = () => {
    const {title} = useContext(AppContext)
    return (
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </div>
    );
}

export default AppHead
