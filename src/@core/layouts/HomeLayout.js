import HomeAppBar from './components/home-page/Header'

function HomeLayout({ children }){
	return(
		<>
		<HomeAppBar />
		{children}
		</>
		)
}

export default HomeLayout