import { NextResponse } from 'next/server'



export function middleware(request) {
	const { cookies } = request;
	const user = cookies.user
	console.log(cookies,'User in middleware')
	const url  = request.url;
	console.log(url,'admin url')

	if(url.includes('/admin/events/')){
		if(!user){
		return NextResponse.redirect('/')
		}

	}
  
}

const adminUrls = [
'/admin/category/*',
'/admin/events/*',
'/admin/location',
'/admin/user',
]