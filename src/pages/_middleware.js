import { NextResponse } from 'next/server'
import {verifyToken} from '../../service/auth'


export async function middleware(request) {
	const { cookies } = request;
	const userToken = cookies.user
	if(userToken){
		await verifyToken(userToken).then((resp)=>{
			if(!resp.userType === 'admin'&& adminProtectedRoutes.includes(request.nextUrl.pathname)=== true){
				NextResponse.redirect('/')
	
			}
			else if(!resp.userType === 'user'&& userProtectedRoutes.includes(request.nextUrl.pathname)=== true){
				NextResponse.redirect('/')
	
			}
		})
	}

  
}

const adminProtectedRoutes = [
	'/admin',
	'/admin/',
	'/admin/category/',
	'/admin/category/add',
	'/admin/events/edit',
	'/admin/location/',
	'/admin/login/'

]

const userProtectedRoutes = [
	'/user/',
	'/user/dashnoard',

]

export const config = {
	matcher: ['/user/:path*', '/admin/:path*'],
  }
