import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import CustomCSS from '../Components/CustomCSS'; // Adjust the path as necessary

const Header = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        // Fetch menu items using Axios
        axios.get('http://122.160.55.196:4344/matrixtraining/wp-json/menus/v1/menus/18')
            .then(response => {
                // Parse menu structure recursively
                const parseMenuItems = items => {
                    return items.map(item => {
                        // Extract the last part of the URL
                        const urlParts = item.url.split('/');
                        let slug = urlParts.pop() || urlParts.pop();  // handle potential trailing slash

                        // Check if the URL is the base URL
                        if (!slug || slug === 'matrixtraining') {
                            slug = '/';
                        } else {
                            slug = `/${slug}`;
                        }

                        return {
                            title: item.title,
                            url: slug,  // construct the new URL
                            child_items: item.child_items ? parseMenuItems(item.child_items) : []
                        };
                    });
                };
                setMenuItems(parseMenuItems(response.data.items));
            })
            .catch(error => console.error('Error fetching menu items:', error));

        // Fetch logo using Axios
        axios.get('http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/media?search=logo')
            .then(response => {
                // Assuming the logo URL is in the first item of the media array
                if (response.data.length > 0 && response.data[0].source_url) {
                    setLogoUrl(response.data[0].source_url);
                }
            })
            .catch(error => console.error('Error fetching logo:', error));
    }, []);

    // Render menu items recursively
    const renderMenuItems = items => {
        return items.map((menuItem, index) => (
            <li className={`nav-item ${menuItem.child_items.length > 0 ? 'dropdown' : ''}`} key={index}>
                {menuItem.child_items.length > 0 ? (
                    <>
                        <Link className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to={menuItem.url}>{menuItem.title}</Link>
                        <ul className="dropdown-menu">
                            {renderMenuItems(menuItem.child_items)}
                        </ul>
                    </>
                ) : (
                    <Link className="nav-link" to={menuItem.url}>{menuItem.title}</Link>
                )}
            </li>
        ));
    };

    return (
        <>
          <CustomCSS />
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand mr-5" to="/"><img src={logoUrl} alt="logo" /></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {renderMenuItems(menuItems)}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
