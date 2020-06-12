import React, { createContext, useState } from "react";

export const AppContext = createContext();
const AppProvider = (props) => {
    const { children } = props
    const [title, setTitle] = useState('Medical Resources');
    return (
        <AppContext.Provider value={{ title,setTitle }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider
