import {useRouter} from 'next/router'
import { useEffect } from 'react'
import { useAuth} from './userContext'


const ProtectedRoute = ({children})=>{

    const {authUser} = useAuth();
    const router =  useRouter();
    useEffect(()=>{
        console.log('Protected Routes');
        if(!authUser){
            router.push('/admin/login')
        }

    },[router,user])


}

export default ProtectedRoute;