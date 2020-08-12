import React from 'react';
import './SidebarNavigation.css';
import { CSSTransition } from 'react-transition-group';

const SidebarNavigation = props => {

    return (
        <CSSTransition in={props.show} timeout={200} classNames='slide-in-left' mountOnEnter unmountOnExit>
            <aside className='side-drawer' onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>)
};

export default SidebarNavigation;