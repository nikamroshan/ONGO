import React, { useState } from 'react';
import { CreditCard, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import TruckCard from '../components/TruckCard';
import { useApp } from '../context/AppContext';
import './FASTagScreen.css';

const FASTagScreen = () => {
    const { trucks, rechargeFastag } = useApp();
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [rechargeAmount, setRechargeAmount] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const rechargeOptions = [500, 1000, 2000];
    const platformFee = 29;

    const handleRecharge = () => {
        if (selectedTruck && rechargeAmount) {
            rechargeFastag(selectedTruck.id, rechargeAmount);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setSelectedTruck(null);
                setRechargeAmount(null);
            }, 2000);
        }
    };

    const getStatusBanner = (truck) => {
        const status = truck.fastagStatus();
        if (status === 'Blacklisted') {
            return (
                <div className="status-banner danger">
                    <AlertCircle size={20} />
                    <span>Blacklisted - Balance ₹0. Immediate recharge required!</span>
                </div>
            );
        } else if (status === 'Low Balance') {
            return (
                <div className="status-banner warning">
                    <AlertCircle size={20} />
                    <span>Low Balance - Below ₹300. Recharge recommended.</span>
                </div>
            );
        } else {
            return (
                <div className="status-banner success">
                    <CheckCircle size={20} />
                    <span>Active - FASTag operational</span>
                </div>
            );
        }
    };

    const totalFastagBalance = trucks.reduce((sum, truck) => sum + truck.fastagBalance, 0);

    return (
        <div className="fastag-screen">
            <Header title="FASTag Management" showLogo={false} />

            <div className="fastag-content">
                {showSuccess && (
                    <div className="success-notification">
                        <CheckCircle size={24} />
                        <span>Recharge successful! ₹{rechargeAmount} added.</span>
                    </div>
                )}

                {/* Overview Card */}
                <div className="card fastag-overview">
                    <div className="overview-header">
                        <div className="overview-icon">
                            <CreditCard size={32} />
                        </div>
                        <div>
                            <h3 className="overview-title">Total FASTag Balance</h3>
                            <p className="overview-subtitle">{trucks.length} Trucks Linked</p>
                        </div>
                    </div>
                    <div className="overview-balance">
                        ₹{totalFastagBalance.toLocaleString('en-IN')}
                    </div>
                </div>

                {/* Select Truck */}
                <div className="card">
                    <h3 className="card-title">Select Truck for Recharge</h3>
                    <div className="trucks-list">
                        {trucks.slice(0, 10).map(truck => (
                            <div
                                key={truck.id}
                                className={`truck-item ${selectedTruck?.id === truck.id ? 'selected' : ''}`}
                                onClick={() => setSelectedTruck(truck)}
                            >
                                <div className="truck-item-info">
                                    <div className="truck-number">{truck.registrationNumber}</div>
                                    <div className="truck-balance">Balance: ₹{truck.fastagBalance}</div>
                                </div>
                                <div className={`truck-status-badge ${truck.fastagStatus().toLowerCase().replace(' ', '-')}`}>
                                    {truck.fastagStatus()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recharge Section */}
                {selectedTruck && (
                    <div className="recharge-section">
                        {getStatusBanner(selectedTruck)}

                        <div className="card">
                            <h3 className="card-title">Recharge Amount</h3>
                            <div className="recharge-options">
                                {rechargeOptions.map(amount => (
                                    <button
                                        key={amount}
                                        className={`recharge-btn ${rechargeAmount === amount ? 'selected' : ''}`}
                                        onClick={() => setRechargeAmount(amount)}
                                    >
                                        ₹{amount}
                                    </button>
                                ))}
                            </div>

                            {rechargeAmount && (
                                <div className="recharge-breakdown">
                                    <div className="breakdown-row">
                                        <span>Recharge Amount</span>
                                        <span>₹{rechargeAmount}</span>
                                    </div>
                                    <div className="breakdown-row highlight">
                                        <span className="font-semibold">Platform Fee</span>
                                        <span className="font-semibold text-primary">₹{platformFee}</span>
                                    </div>
                                    <div className="breakdown-row total">
                                        <span className="font-bold">Total</span>
                                        <span className="font-bold">₹{rechargeAmount + platformFee}</span>
                                    </div>
                                </div>
                            )}

                            <button
                                className="btn btn-primary btn-block btn-lg mt-md"
                                onClick={handleRecharge}
                                disabled={!rechargeAmount}
                            >
                                Recharge Now
                            </button>
                        </div>
                    </div>
                )}

                {/* Info Card */}
                <div className="card info-card">
                    <h4 className="info-title">
                        <TrendingUp size={18} />
                        FASTag Benefits
                    </h4>
                    <ul className="info-list">
                        <li>Instant toll payments - No queues</li>
                        <li>Automatic balance tracking</li>
                        <li>Low balance alerts</li>
                        <li>Transparent pricing - ₹29 per recharge</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FASTagScreen;
