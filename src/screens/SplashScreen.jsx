import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/home');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">
            <div className="splash-content pulse">
                <div className="splash-logo">ONGO</div>
                <p className="splash-tagline">Everything that moves India, ONGO manages it.</p>
            </div>
            <div className="splash-loader">
                <div className="loader-bar"></div>
            </div>
        </div>
    );
};

export default SplashScreen;
