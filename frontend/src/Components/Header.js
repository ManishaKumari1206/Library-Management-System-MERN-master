import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';

function Header() {
    const [menutoggle, setMenutoggle] = useState(false);

    const Toggle = () => {
        setMenutoggle(!menutoggle);
    };

    const closeMenu = () => {
        setMenutoggle(false);
    };

    return (
        <div className="header">
            {/* NEW CONTAINER FOR SEARCH AND RIGHT NAV */}
            <div className="center-and-right-nav-container">
                {/* Search Input */}
                <input className='search-input' type='text' placeholder='Search a Book'/>

                {/* Right-side Navigation (Home, Books, Sign In) */}
                <div className='nav-right'>
                    <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                        <li className="option" onClick={closeMenu}>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="option" onClick={closeMenu}>
                            <Link to='/books'>Books</Link>
                        </li>
                        <li className="option" onClick={closeMenu}>
                            <Link to='/signin'>SignIn</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* END NEW CONTAINER */}

            {/* Mobile Menu Icon (remains separate for mobile behavior) */}
            <div className="mobile-menu" onClick={Toggle}>
                {menutoggle ? (
                    <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                )}
            </div>
        </div>
    );
}

export default Header;