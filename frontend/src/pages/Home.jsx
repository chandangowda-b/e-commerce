import React from 'react'
import Header from '../components/Header'
import FeaturedProducts from "../components/FeaturedProducts";
import MarqueeBar from '../components/MarqueeBar';
import TopCategories from '../Components/TopCategories';
import Footer from '../components/Footer';
import StatsBar from '../components/StatBar';


const Home = () => {
  return (
    <div>
        <Header/>
        <FeaturedProducts />
        <MarqueeBar />
        <TopCategories/>
        <StatsBar/>
        <Footer/>
    </div>
  )
}

export default Home