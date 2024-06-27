import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Header = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [logoUrl, setLogoUrl] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});
    const [widgets, setWidgets] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://122.160.55.196:4344/matrixtraining/wp-json/menus/v1/menus/18');
                const parseMenuItems = items => {
                    return items.map(item => {
                        const urlParts = item.url.split('/');
                        let slug = urlParts.pop() || urlParts.pop();

                        if (!slug || slug === 'matrixtraining') {
                            slug = '/';
                        } else {
                            slug = `/${slug}`;
                        }

                        return {
                            title: item.title,
                            url: slug,
                            child_items: item.child_items ? parseMenuItems(item.child_items) : []
                        };
                    });
                };
                setMenuItems(parseMenuItems(response.data.items));
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        const fetchLogo = async () => {
            try {
                const response = await axios.get('http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/media?search=logo');
                if (response.data.length > 0 && response.data[0].source_url) {
                    setLogoUrl(response.data[0].source_url);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };

        const fetchWidgets = async () => {
            try {
                const response = await axios.get('http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/widgets');
                setWidgets(response.data);
            } catch (error) {
                console.error('Error fetching widgets:', error);
            }
        };

        fetchMenuItems();
        fetchLogo();
        fetchWidgets();
    }, []);

    const renderMenuItems = (items, level = 0) => {
        return items.map((menuItem, index) => (
            <li
                className={`nav-item ${menuItem.child_items.length > 0 ? 'has-dropdown' : ''} ${level === 0 ? 'main-menu' : level === 1 ? 'submenu' : 'childmenu'}`}
                key={index}
            >
                {menuItem.child_items.length > 0 ? (
                    <>
                        <Link className="nav-link" to={menuItem.url} onClick={(e) => handleSubMenuToggle(e, index, level)}>
                            {menuItem.title}
                        </Link>
                        <ul className={`dropdown-menu ${level === 0 ? 'ul_submenu' : 'ul_childmenu'} ${openSubMenus[`${level}-${index}`] ? 'open' : ''}`}>
                            {renderMenuItems(menuItem.child_items, level + 1)}
                        </ul>
                    </>
                ) : (
                    <Link className="nav-link" to={menuItem.url}>{menuItem.title}</Link>
                )}
            </li>
        ));
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleSubMenuToggle = (e, index, level) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const key = `${level}-${index}`;
            setOpenSubMenus(prevState => ({
                ...prevState,
                [key]: !prevState[key]
            }));
        }
    };

    return (
        <header className="main-header">
            <div className="top-header">
                <div className="container">
                    <div className="tp-header-inner">
                        <div className="tp-header-left">
                            {widgets.filter(widget => widget.sidebar === 'topbar-left').map(widget => (
                                <div key={widget.id} dangerouslySetInnerHTML={{ __html: widget.rendered }} />
                            ))}
                        </div>
                        <div className="tp-header-right">
                            {widgets.filter(widget => widget.sidebar === 'topbar-right').map(widget => (
                                <div key={widget.id} dangerouslySetInnerHTML={{ __html: widget.rendered }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container bottom-header">
                <div className="logo">
                    <Link to="/"><img src={logoUrl} alt="logo" /></Link>
                </div>
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? 'Close' : 'Menu'}
                </button>
                <div className={`menu ${mobileMenuOpen ? 'open' : ''}`}>
                    <ul className="navbar-nav">
                        {renderMenuItems(menuItems)}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
