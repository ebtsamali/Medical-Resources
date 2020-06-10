import React, { createContext, useState } from "react";
import {AuthContext} from "./auth_provider";

export const AppContext = createContext();
const AppProvider = (props) => {
    const { children } = props
    const [title, setTitle] = useState('My App');
    return (
        <AppContext.Provider value={{ title,setTitle }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider
