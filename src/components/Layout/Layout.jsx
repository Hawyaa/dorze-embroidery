import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import CarouselEffect from '../../components/Carousel/CarouselEffect'
<CarouselEffect/>

function Layout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />

        </div>
    )
}

export default Layout