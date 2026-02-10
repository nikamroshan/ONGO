import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, FileText, Wallet, Phone } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
    const location = useLocation();

    const navItems = [
        { path: '/home', icon: Home, label: 'Home' },
        { path: '/find-loads', icon: Search, label: 'Find Loads' },
        { path: '/orders', icon: FileText, label: 'Orders' },
        { path: '/money', icon: Wallet, label: 'Money' },
        { path: '/calls', icon: Phone, label: 'Calls' }
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = location.pathname === path;
                return (
                    <Link
                        key={path}
                        to={path}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Icon size={24} />
                        <span className="nav-label">{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default BottomNav;
