import React from 'react';
import './Header.css';

const Header = ({ title, showLogo = true }) => {
    return (
        <header className="app-header">
            {showLogo && (
                <div className="header-logo">
                    <div className="logo-icon">ONGO</div>
                </div>
            )}
            {title && <h1 className="header-title">{title}</h1>}
        </header>
    );
};

export default Header;
