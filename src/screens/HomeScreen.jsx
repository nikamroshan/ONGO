import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Wallet, Fuel, CreditCard, MapPin, Search } from 'lucide-react';
import Header from '../components/Header';
import './HomeScreen.css';

const HomeScreen = () => {
    const navigate = useNavigate();

    const featureTiles = [
        { icon: Fuel, label: 'Diesel', color: '#f59e0b', path: '/fuel-tracking' },
        { icon: CreditCard, label: 'FASTag', color: '#3b82f6', path: '/fastag' },
        { icon: MapPin, label: 'GPS', color: '#ef4444', path: '/fleet' },
        { icon: Search, label: 'Find Loads', color: '#22c55e', path: '/find-loads' }
    ];

    return (
        <div className="home-screen">
            <Header />

            <div className="home-content">
                {/* Verification Banner */}
                <div className="verification-banner">
                    <div className="banner-icon">
                        <Shield size={32} />
                    </div>
                    <div className="banner-content">
                        <h3 className="banner-title">Get Verified. Get More Loads</h3>
                        <p className="banner-subtitle">Complete KYC to unlock premium features</p>
                    </div>
                    <button className="btn btn-sm btn-secondary">Start KYC</button>
                </div>

                {/* Wallet Card */}
                <div className="wallet-card">
                    <div className="wallet-header">
                        <div className="wallet-icon">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <h4 className="wallet-title">FASTag Balance</h4>
                            <p className="wallet-subtitle">Linked Trucks: 50</p>
                        </div>
                    </div>
                    <div className="wallet-balance">
                        <span className="balance-amount">₹1,24,500</span>
                        <span className="badge badge-success">Active</span>
                    </div>
                    <button
                        className="btn btn-primary btn-block mt-md"
                        onClick={() => navigate('/fastag')}
                    >
                        Manage FASTag
                    </button>
                </div>

                {/* Feature Tiles */}
                <div className="feature-section">
                    <h3 className="section-title">Quick Access</h3>
                    <div className="feature-grid">
                        {featureTiles.map((tile, index) => (
                            <div
                                key={index}
                                className="feature-tile"
                                onClick={() => navigate(tile.path)}
                                style={{ '--tile-color': tile.color }}
                            >
                                <div className="tile-icon">
                                    <tile.icon size={28} />
                                </div>
                                <span className="tile-label">{tile.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="stats-section">
                    <h3 className="section-title">Today's Overview</h3>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">12</div>
                            <div className="stat-label">Active Trips</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">28</div>
                            <div className="stat-label">Available Trucks</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">₹45K</div>
                            <div className="stat-label">Today's Revenue</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
