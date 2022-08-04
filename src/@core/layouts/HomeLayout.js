import HomeAppBar from './components/home-page/Header'
import Footer from './components/home-page/Footer'


function HomeLayout(props){
	const { settings, children } = props
	console.log(props);

	return(
		<>
		<HomeAppBar
		settings={settings}
		/>
		{children}
		<Footer />
		</>
		)
}

export default HomeLayout