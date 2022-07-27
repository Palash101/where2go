import { NextResponse } from 'next/server'
import {verifyToken} from '../../service/auth'


export async function middleware(request) {
	// const { cookies } = request;
	// const userToken = cookies.user
	const url = request.nextUrl.pathname

	console.log(adminProtectedRoutes.includes(url),'Next URL')
	// if(
	// 	userToken && adminProtectedRoutes.includes(url) ){
	// 	await verifyToken(userToken).then((resp)=>{
	// 		if(!resp.userType === 'admin'&& adminProtectedRoutes.includes(request.nextUrl.pathname)=== true){
	// 			NextResponse.redirect('/')
	
	// 		}
	// 		else if(!resp.userType === 'user'&& userProtectedRoutes.includes(request.nextUrl.pathname)=== true){
	// 			NextResponse.redirect('/')
	
	// 		}
	// 	})
	// }
	// else if(!userToken && adminProtectedRoutes.includes(url) ){
		
	// 	NextResponse.redirect('/')
	// }

  
}

const adminProtectedRoutes = [
	'/admin',
	'/admin/',
	'/admin/category/',
	'/admin/category/add',
	'/admin/events/edit',
	'/admin/location/',

]

const userProtectedRoutes = [
	'/user/',
	'/user/dashnoard',

]

// export const config = {
// 	matcher: ['/user/:path*', '/admin/:path*'],
//   }
