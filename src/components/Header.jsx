import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import './Header.css';

const Header = ({ title, showLogo = true }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            // Fallback instructions for all platforms
            alert('To install ONGO App:\n\n📱 Android/Chrome: Look for "Install" in browser menu\n🍎 iOS/Safari: Tap Share (□↑) → Add to Home Screen\n💻 Desktop: Look for install icon (⊕) in address bar');
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }

        setDeferredPrompt(null);
    };

    return (
        <header className="app-header">
            {showLogo && (
                <div className="header-logo">
                    <div className="logo-icon">ONGO</div>
                </div>
            )}
            {title && <h1 className="header-title">{title}</h1>}

            <button
                className="install-button"
                onClick={handleInstallClick}
                title="Install ONGO App"
            >
                <Download size={20} />
                <span className="install-text">Install</span>
            </button>
        </header>
    );
};

export default Header;
