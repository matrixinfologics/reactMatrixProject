import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Blog from './Components/Pages/Blog';
import Gallery from './Components/Pages/Gallery';
import ContactUs from './Components/Pages/ContactUsPage';
import WebDevelopment from './Components/Pages/WebDevelopment';
import Wordpress from './Components/Pages/Wordpress';
import Webflow from './Components/Pages/Webflow';
import Magento from './Components/Pages/Magento';
import Shopify from './Components/Pages/Shopify';
import Woocommerce from './Components/Pages/Woocommerce';
import WebDesigning from './Components/Pages/WebDesigning';
import Bidding from './Components/Pages/Bidding';
import Seo from './Components/Pages/Seo';
import GraphicDesigning from './Components/Pages/GraphicDesigning';
import PHP from './Components/Pages/PHP';
import Header from './Components/Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './customStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogDetails from './Components/BlogDetails';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/web-development" element={<WebDevelopment />} />
                <Route path="/php" element={<PHP />} />
                <Route path="/posts/:postId" element={<BlogDetails />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/wordpress" element={<Wordpress />} />
                <Route path="/webflow" element={<Webflow />} />
                <Route path="/magento" element={<Magento />} />
                <Route path="/shopify" element={<Shopify />} />
                <Route path="/woocommerce" element={<Woocommerce />} />
                <Route path="/web-designing" element={<WebDesigning/>} />
                <Route path="/bidding" element={<Bidding/>} />
                <Route path="/seo" element={<Seo/>} />
                <Route path="/graphic-designing" element={<GraphicDesigning/>} />
            </Routes>
        </Router>
    );
};

export default App;
