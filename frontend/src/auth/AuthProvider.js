import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null    // 'user' --> token
    );


    useEffect(() => {
        try {
            localStorage.setItem("user", JSON.stringify(user))            
        } catch (error) {
            localStorage.removeItem("user"); 
            //console.log(error);           
        }
        
    }, [user])


    const contextValue = {
        user,
        login() {
            setUser({id: 1, username: "gervs" })
        },
        logout() {
            setUser(null);
        },
        isLogged() {
            return !!user;
        }
    }



    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;