import React from 'react';

import './Header.css';

import Navbar from './Menu/Navbar';


const Header = ({auth, logout}) => {
    return(
        <Navbar auth={auth} logout={logout}/>
    )
};

export default Header;



