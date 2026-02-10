import React from 'react';
import { Fuel, TrendingUp, AlertTriangle, Gauge } from 'lucide-react';
import Header from '../components/Header';
import { fuelData } from '../data/mockData';
import './FuelTrackingScreen.css';

const FuelTrackingScreen = () => {
    const recentFuelData = fuelData.slice(0, 10);

    return (
        <div className="fuel-screen">
            <Header title="Fuel Tracking" showLogo={false} />

            <div className="fuel-content">
                {/* Overview Stats */}
                <div className="fuel-stats">
                    <div className="stat-card">
                        <Fuel size={24} className="text-warning" />
                        <div>
                            <div className="stat-value">{fuelData.reduce((sum, f) => sum + f.dieselIssued, 0).toLocaleString()}L</div>
                            <div className="stat-label">Total Diesel Issued</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Gauge size={24} className="text-primary" />
                        <div>
                            <div className="stat-value">
                                {(fuelData.reduce((sum, f) => sum + parseFloat(f.fuelEfficiency), 0) / fuelData.length).toFixed(1)} km/L
                            </div>
                            <div className="stat-label">Avg Efficiency</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <AlertTriangle size={24} className="text-danger" />
                        <div>
                            <div className="stat-value">{fuelData.filter(f => f.hasLeakage).length}</div>
                            <div className="stat-label">Leakage Alerts</div>
                        </div>
                    </div>
                </div>

                {/* Fuel Records */}
                <div className="fuel-records">
                    <h3 className="section-title">Recent Fuel Records</h3>
                    {recentFuelData.map(fuel => (
                        <div key={fuel.id} className={`fuel-card ${fuel.hasLeakage ? 'alert' : ''}`}>
                            <div className="fuel-card-header">
                                <div className="truck-id">{fuel.truckId}</div>
                                {fuel.hasLeakage && (
                                    <div className="badge badge-danger">
                                        <AlertTriangle size={12} />
                                        Leakage Detected
                                    </div>
                                )}
                            </div>

                            <div className="fuel-details-grid">
                                <div className="fuel-detail">
                                    <div className="detail-label">Trip Distance</div>
                                    <div className="detail-value">{fuel.tripDistance} km</div>
                                </div>

                                <div className="fuel-detail">
                                    <div className="detail-label">Diesel Issued</div>
                                    <div className="detail-value">{fuel.dieselIssued}L</div>
                                </div>

                                <div className="fuel-detail">
                                    <div className="detail-label">Diesel Consumed</div>
                                    <div className="detail-value">{fuel.dieselConsumed}L</div>
                                </div>

                                <div className="fuel-detail">
                                    <div className="detail-label">Price/Litre</div>
                                    <div className="detail-value">₹{fuel.pricePerLitre}</div>
                                </div>
                            </div>

                            <div className="fuel-efficiency-bar">
                                <div className="efficiency-label">
                                    <Gauge size={16} />
                                    <span>Fuel Efficiency: {fuel.fuelEfficiency} km/L</span>
                                </div>
                                <div className="efficiency-progress">
                                    <div
                                        className="efficiency-fill"
                                        style={{ width: `${Math.min((parseFloat(fuel.fuelEfficiency) / 8) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {fuel.hasLeakage && (
                                <div className="leakage-warning">
                                    <AlertTriangle size={16} />
                                    <span>
                                        Excess consumption detected: {fuel.dieselConsumed - fuel.dieselIssued}L
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FuelTrackingScreen;
