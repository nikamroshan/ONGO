import React from 'react';
import { MapPin, Package, CreditCard, Fuel, Play, Square } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './DriverAppScreen.css';

const DriverAppScreen = () => {
    const { drivers, loads, trucks } = useApp();

    // Simulate logged-in driver (first on-trip driver or first driver)
    const currentDriver = drivers.find(d => d.status === 'On Trip') || drivers[0];
    const assignedLoad = loads.find(l => l.assignedDriver === currentDriver.id && l.status !== 'Completed');
    const assignedTruck = trucks.find(t => t.id === currentDriver.assignedTruck);

    return (
        <div className="driver-app-screen">
            {/* Driver Header */}
            <div className="driver-header">
                <div className="driver-avatar-large">
                    <span>{currentDriver.name.charAt(0)}</span>
                </div>
                <div className="driver-info-large">
                    <h2 className="driver-name-large">{currentDriver.name}</h2>
                    <p className="driver-status-large">{currentDriver.status}</p>
                </div>
            </div>

            <div className="driver-content">
                {assignedLoad ? (
                    <>
                        {/* Assigned Load */}
                        <div className="driver-card-large">
                            <div className="card-icon">
                                <Package size={32} />
                            </div>
                            <h3 className="card-title-large">Current Load</h3>
                            <div className="load-route-large">
                                <div className="route-point">
                                    <MapPin size={24} className="text-primary" />
                                    <span>{assignedLoad.from}</span>
                                </div>
                                <div className="route-arrow-large">↓</div>
                                <div className="route-point">
                                    <MapPin size={24} className="text-danger" />
                                    <span>{assignedLoad.to}</span>
                                </div>
                            </div>
                            <div className="load-details-large">
                                <div className="detail-large">
                                    <span className="label-large">Product</span>
                                    <span className="value-large">{assignedLoad.product}</span>
                                </div>
                                <div className="detail-large">
                                    <span className="label-large">Weight</span>
                                    <span className="value-large">{assignedLoad.weight}T</span>
                                </div>
                                <div className="detail-large">
                                    <span className="label-large">Distance</span>
                                    <span className="value-large">{assignedLoad.distance} km</span>
                                </div>
                            </div>
                        </div>

                        {/* Truck Info */}
                        {assignedTruck && (
                            <div className="driver-card-large">
                                <div className="card-icon">
                                    <Package size={32} />
                                </div>
                                <h3 className="card-title-large">Your Truck</h3>
                                <div className="truck-number-large">{assignedTruck.registrationNumber}</div>
                                <div className="truck-type-large">{assignedTruck.type}</div>
                            </div>
                        )}

                        {/* FASTag Balance */}
                        {assignedTruck && (
                            <div className="driver-card-large">
                                <div className="card-icon">
                                    <CreditCard size={32} />
                                </div>
                                <h3 className="card-title-large">FASTag Balance</h3>
                                <div className="balance-large">₹{assignedTruck.fastagBalance}</div>
                                <div className={`status-badge-large ${assignedTruck.fastagStatus().toLowerCase().replace(' ', '-')}`}>
                                    {assignedTruck.fastagStatus()}
                                </div>
                            </div>
                        )}

                        {/* Trip Controls */}
                        <div className="trip-controls">
                            <button className="btn-driver btn-driver-danger">
                                <Square size={32} />
                                <span>End Trip</span>
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="no-load-state">
                        <Package size={64} className="text-secondary" />
                        <h3 className="no-load-title">No Active Load</h3>
                        <p className="no-load-text">Wait for load assignment from fleet manager</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DriverAppScreen;
