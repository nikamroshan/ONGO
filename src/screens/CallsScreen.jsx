import React from 'react';
import { Phone, User } from 'lucide-react';
import Header from '../components/Header';
import DriverCard from '../components/DriverCard';
import { useApp } from '../context/AppContext';
import './CallsScreen.css';

const CallsScreen = () => {
    const { drivers } = useApp();

    return (
        <div className="calls-screen">
            <Header title="Quick Calls" showLogo={false} />

            <div className="calls-content">
                <div className="info-banner">
                    <Phone size={24} />
                    <p>Tap on any driver to call them directly</p>
                </div>

                <div className="drivers-list">
                    {drivers.slice(0, 15).map(driver => (
                        <DriverCard key={driver.id} driver={driver} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CallsScreen;
