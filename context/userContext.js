import { createContext, useContext, Context } from 'react'
import { useState } from 'react';

 const authUserContext = createContext();


 function AuthUserProvider({ children }) {

    const [authState, setAuthState] = useState({
        accesstoken: "",
       });

    const setUserAuthInfo = (data) => {
        const {accesstoken,isAuthenticated,userInfo} = data;
        localStorage.setItem("accesstoken", accesstoken);
        localStorage.setItem("isAuthenticated", isAuthenticated);
        localStorage.setItem("userInfo", userInfo);
        setAuthState({
            ...authState,
        accesstoken:accesstoken,
         isAuthenticated,
         userInfo:userInfo
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
    }}

    >
    {children}
    </authUserContext.Provider>;
  }



  export {authUserContext,AuthUserProvider};
  export const userAuth= () => {
 return useContext(authUserContext);
};