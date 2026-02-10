import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import './Header.css';

const Header = ({ title, showLogo = true }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallButton(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setShowInstallButton(false);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            // Fallback for iOS or if prompt not available
            alert('To install:\n\niOS: Tap Share → Add to Home Screen\nAndroid: Tap menu → Install app');
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }

        setDeferredPrompt(null);
        setShowInstallButton(false);
    };

    return (
        <header className="app-header">
            {showLogo && (
                <div className="header-logo">
                    <div className="logo-icon">ONGO</div>
                </div>
            )}
            {title && <h1 className="header-title">{title}</h1>}

            {showInstallButton && (
                <button
                    className="install-button"
                    onClick={handleInstallClick}
                    title="Install ONGO App"
                >
                    <Download size={20} />
                    <span className="install-text">Install</span>
                </button>
            )}
        </header>
    );
};

export default Header;
