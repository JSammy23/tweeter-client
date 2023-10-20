import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const updateUser = (updatedUser) => {
        setCurrentUser(updatedUser);
    };

    const contextValue = {
        currentUser,
        setCurrentUser,
        updateUser
    }

    return (
        <UserContext.Provider value={contextValue} >
            {children}
        </UserContext.Provider>
    )
};