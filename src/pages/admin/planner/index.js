//React Imports
import { useState, useEffect, useRef } from 'react'



//MUI imports
import nookies from "nookies";


function Planner() {



    return (
        <>

     

        </>
    )



}
Planner.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Planner;

export async function getServerSideProps(context) {
    try{
      const cookies = nookies.get(context);
      if(!cookies.user){
        return{
          redirect:{
            permanent:false,
            destination:'/admin/login',
          },
          props:{}
        }
  
      }
      const userData = await verifyToken(cookies.user);
      console.log(userData,'in index page')
   
     if(userData.userType === 'admin'){
        return{
          props:{user:userData}
        }
      }
      else{
        return{
          redirect:{
            permanent:false,
            destination:'/admin/login',
          },
          props:{}
        }
      }
      
  
    }
    catch(err){
      return{
        redirect:{
            permanent:false,
            destination:'/admin/login'
          },
        props:{}
      }
    }
  
  
  }
  