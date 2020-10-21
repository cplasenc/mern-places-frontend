import React, { useState } from 'react';
import './MainNavigation.css';
import MainHeader from '../MainHeader/MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from '../NavLinks/NavLinks';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import Backdrop from '../UIElements/Backdrop/Backdrop';

const MainNavigation = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <React.Fragment>
            {sidebarOpen ? <Backdrop onClick={closeSidebar} /> : null }
            <SidebarNavigation show={sidebarOpen} onClick={closeSidebar}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks />
                </nav>
            </SidebarNavigation>
            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={openSidebar}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'>YourPlaces</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>)
};

export default MainNavigation;