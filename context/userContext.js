import { createContext, useContext, Context } from 'react'
import { useState } from 'react';

 const authUserContext = createContext();


 function AuthUserProvider({ children }) {

    const [authState, setAuthState] = useState({
        accesstoken: "",
       });

    const setUserAuthInfo = (data) => {
        const {accesstoken,isAuthenticated} = data;
        localStorage.setItem("accesstoken", accesstoken);
        localStorage.setItem("isAuthenticated", isAuthenticated);
        setAuthState({
        accesstoken:accesstoken,
         isAuthenticated
        });
      };

    const isUserAuthenticated = () => {
     const token = localStorage.getItem('accesstoken')
    if (token) {
        return true;
    }
    else{
        return false;
    }
    };
    const logoutUser = () =>{

    }
    return <authUserContext.Provider 
    value={{
        authState,
        setUserAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
    }}

    >
    {children}
    </authUserContext.Provider>;
  }



  export {authUserContext,AuthUserProvider};
  export const userAuth= () => {
 return useContext(authUserContext);
};