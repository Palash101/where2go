import { createContext, useContext, Context } from 'react'
import { useState, useEffect } from 'react';
import Translations from 'utils/trans'
import { userLogout } from 'service/auth'


 const authUserContext = createContext();


 function AuthUserProvider({ children }) {

    const [authState, setAuthState] = useState({
        accesstoken: "",
       });
    
    const [locale, setLocale] = useState('en')

    useEffect(()=>{
        const ll = localStorage.getItem('locale')
        if (ll == undefined || ll == null || ll == ''  ) {
            localStorage.setItem('locale', locale)
          }
        else{
            setLocale(ll)
        }
        let dir =ll == "ar" ? "rtl" : "ltr";
        document.querySelector("html").setAttribute("dir", dir);


    },[locale])

    const setUserAuthInfo = (data) => {
        const {accesstoken,isAuthenticated,userInfo,userType} = data;
        localStorage.setItem("accesstoken", accesstoken);
        localStorage.setItem("isAuthenticated", isAuthenticated);
        localStorage.setItem("userInfo", userInfo);
        localStorage.setItem("userType", userType);
        setAuthState({
            ...authState,
        accesstoken:accesstoken,
         isAuthenticated,
         userInfo:userInfo,
         userType:userType

        });
      };

      const setCartInfo = (data) => {
        const {carts,event} = data;
        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("event", JSON.stringify(event));
        setAuthState({
            ...authState,
            carts:carts,
            event:event,
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
    const switchLang = ()=>{
       const currentLang =  localStorage.getItem('locale')
       if(currentLang == 'en'){
        setLocale('ar')
        localStorage.setItem('locale','ar')
       }
       else if(currentLang == 'ar'){
        setLocale('en')
        localStorage.setItem('locale','en')
       }

    }

    const logoutUser = async () =>{
        localStorage.clear()
        await userLogout();
        location.reload();
    }

    const clearCart = async() => {
        localStorage.removeItem('carts');
        localStorage.removeItem('event');
        location.reload();
    }

    const getTrans = () =>{
      const t = Translations(locale)
      return t
    }
    const getCartData = () => {
        const carts = JSON.parse(localStorage.getItem("carts"));
        const event = JSON.parse(localStorage.getItem("event"));
        const authData = {
            ...authState,
            carts:carts,
            event:event,
        }
        setAuthState(authData);
        return authData;
    }

    return <authUserContext.Provider 
    value={{
        authState,
        setUserAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        locale:locale,
        switchLang:()=>switchLang(),
        getTrans:()=>getTrans(),
        logout:()=>logoutUser(),
        setCartData:(data) => setCartInfo(data),
        clearCartData:()=>clearCart(),
        getCarts:() => getCartData(),
    }}

    >
    {children}
    </authUserContext.Provider>;
  }



  export {authUserContext,AuthUserProvider};
  export const userAuth= () => {
 return useContext(authUserContext);
};