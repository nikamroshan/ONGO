import React, { useState } from 'react';
import { Truck, Users, Play, Square } from 'lucide-react';
import Header from '../components/Header';
import DriverCard from '../components/DriverCard';
import TruckCard from '../components/TruckCard';
import { useApp } from '../context/AppContext';
import './FleetManagementScreen.css';

const FleetManagementScreen = () => {
    const { drivers, trucks, loads, startTrip, endTrip } = useApp();
    const [activeTab, setActiveTab] = useState('drivers');

    const onTripDrivers = drivers.filter(d => d.status === 'On Trip');
    const idleDrivers = drivers.filter(d => d.status === 'Idle');
    const offlineDrivers = drivers.filter(d => d.status === 'Offline');

    const handleStartTrip = (driverId) => {
        startTrip(driverId);
    };

    const handleEndTrip = (driverId) => {
        const driver = drivers.find(d => d.id === driverId);
        const load = loads.find(l => l.assignedDriver === driverId && l.status !== 'Completed');
        if (load) {
            endTrip(driverId, load.id);
        }
    };

    return (
        <div className="fleet-screen">
            <Header title="Fleet Management" showLogo={false} />

            <div className="fleet-content">
                {/* Stats Overview */}
                <div className="fleet-stats">
                    <div className="stat-card">
                        <Truck size={24} className="text-primary" />
                        <div>
                            <div className="stat-value">{trucks.length}</div>
                            <div className="stat-label">Total Trucks</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Users size={24} className="text-primary" />
                        <div>
                            <div className="stat-value">{drivers.length}</div>
                            <div className="stat-label">Total Drivers</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Play size={24} className="text-success" />
                        <div>
                            <div className="stat-value">{onTripDrivers.length}</div>
                            <div className="stat-label">Active Trips</div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="tab-navigation">
                    <button
                        className={`tab-btn ${activeTab === 'drivers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('drivers')}
                    >
                        Drivers
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'trucks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('trucks')}
                    >
                        Trucks
                    </button>
                </div>

                {/* Drivers Tab */}
                {activeTab === 'drivers' && (
                    <div className="drivers-section">
                        {onTripDrivers.length > 0 && (
                            <div className="driver-group">
                                <h3 className="group-title">On Trip ({onTripDrivers.length})</h3>
                                <div className="drivers-grid">
                                    {onTripDrivers.map(driver => (
                                        <div key={driver.id} className="driver-item">
                                            <DriverCard driver={driver} />
                                            <button
                                                className="btn btn-sm btn-danger mt-sm"
                                                onClick={() => handleEndTrip(driver.id)}
                                            >
                                                <Square size={14} />
                                                End Trip
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {idleDrivers.length > 0 && (
                            <div className="driver-group">
                                <h3 className="group-title">Idle ({idleDrivers.length})</h3>
                                <div className="drivers-grid">
                                    {idleDrivers.map(driver => (
                                        <DriverCard key={driver.id} driver={driver} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {offlineDrivers.length > 0 && (
                            <div className="driver-group">
                                <h3 className="group-title">Offline ({offlineDrivers.length})</h3>
                                <div className="drivers-grid">
                                    {offlineDrivers.map(driver => (
                                        <DriverCard key={driver.id} driver={driver} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Trucks Tab */}
                {activeTab === 'trucks' && (
                    <div className="trucks-section">
                        <div className="trucks-grid">
                            {trucks.map(truck => (
                                <TruckCard key={truck.id} truck={truck} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FleetManagementScreen;
