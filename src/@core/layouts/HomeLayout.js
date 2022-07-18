import HomeAppBar from './components/home-page/Header'
import Footer from './components/home-page/Footer'

function HomeLayout({ children }){
	return(
		<>
		<HomeAppBar />
		{children}
		<Footer />
		</>
		)
}

export default HomeLayout