import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Package, Truck, IndianRupee, User, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import DriverCard from '../components/DriverCard';
import TruckCard from '../components/TruckCard';
import { useApp } from '../context/AppContext';
import './LoadDetailsScreen.css';

const LoadDetailsScreen = () => {
    const { loadId } = useParams();
    const navigate = useNavigate();
    const { loads, drivers, trucks, assignLoad } = useApp();

    const load = loads.find(l => l.id === loadId);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedTruck, setSelectedTruck] = useState('');
    const [showAssignment, setShowAssignment] = useState(false);
    const [assigned, setAssigned] = useState(false);

    if (!load) {
        return <div>Load not found</div>;
    }

    const availableDrivers = drivers.filter(d => d.status === 'Idle');
    const availableTrucks = trucks.filter(t => t.status === 'Available');

    const handleAssign = () => {
        if (selectedDriver && selectedTruck) {
            assignLoad(load.id, selectedDriver, selectedTruck);
            setAssigned(true);
            setTimeout(() => {
                navigate('/fleet');
            }, 2000);
        }
    };

    return (
        <div className="load-details-screen">
            <Header title="Load Details" showLogo={false} />

            <div className="load-details-content">
                <button className="btn btn-secondary mb-md" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                    Back
                </button>

                {assigned && (
                    <div className="success-banner">
                        <CheckCircle size={24} />
                        <span>Load assigned successfully!</span>
                    </div>
                )}

                {/* Load Information */}
                <div className="card">
                    <h3 className="card-title">Load Information</h3>

                    <div className="load-info-grid">
                        <div className="info-item">
                            <MapPin size={18} className="text-primary" />
                            <div>
                                <div className="info-label">Route</div>
                                <div className="info-value">{load.from} → {load.to}</div>
                                <div className="info-meta">{load.distance} km</div>
                            </div>
                        </div>

                        <div className="info-item">
                            <Truck size={18} className="text-primary" />
                            <div>
                                <div className="info-label">Truck Type</div>
                                <div className="info-value">{load.truckType}</div>
                            </div>
                        </div>

                        <div className="info-item">
                            <Package size={18} className="text-primary" />
                            <div>
                                <div className="info-label">Product</div>
                                <div className="info-value">{load.product}</div>
                                <div className="info-meta">{load.weight}T</div>
                            </div>
                        </div>

                        <div className="info-item">
                            <IndianRupee size={18} className="text-primary" />
                            <div>
                                <div className="info-label">Payment Terms</div>
                                <div className="info-value">{load.paymentTerms}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue Breakdown */}
                <div className="card">
                    <h3 className="card-title">Revenue Breakdown</h3>

                    <div className="revenue-breakdown">
                        <div className="revenue-row">
                            <span className="revenue-label">Load Value</span>
                            <span className="revenue-value">₹{load.loadValue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="revenue-row highlight">
                            <span className="revenue-label">ONGO Commission (3%)</span>
                            <span className="revenue-value text-primary">₹{load.commission.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="revenue-row total">
                            <span className="revenue-label font-semibold">Net Payout</span>
                            <span className="revenue-value font-semibold">₹{load.netPayout.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                {/* Assignment Section */}
                {!assigned && (
                    <>
                        <button
                            className="btn btn-primary btn-block btn-lg"
                            onClick={() => setShowAssignment(!showAssignment)}
                        >
                            {showAssignment ? 'Hide Assignment' : 'Assign Load'}
                        </button>

                        {showAssignment && (
                            <div className="assignment-section">
                                <div className="card">
                                    <h3 className="card-title">Select Driver</h3>
                                    <div className="input-group">
                                        <select
                                            className="input"
                                            value={selectedDriver}
                                            onChange={(e) => setSelectedDriver(e.target.value)}
                                        >
                                            <option value="">Choose a driver</option>
                                            {availableDrivers.map(driver => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.name} - {driver.rating}★ ({driver.tripsCompleted} trips)
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="card">
                                    <h3 className="card-title">Select Truck</h3>
                                    <div className="input-group">
                                        <select
                                            className="input"
                                            value={selectedTruck}
                                            onChange={(e) => setSelectedTruck(e.target.value)}
                                        >
                                            <option value="">Choose a truck</option>
                                            {availableTrucks.map(truck => (
                                                <option key={truck.id} value={truck.id}>
                                                    {truck.registrationNumber} - {truck.type} ({truck.capacity}T)
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary btn-block btn-lg"
                                    onClick={handleAssign}
                                    disabled={!selectedDriver || !selectedTruck}
                                >
                                    Confirm Assignment
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default LoadDetailsScreen;
