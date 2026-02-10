import React from 'react';
import { MapPin, Package, Truck, IndianRupee, Shield, Phone } from 'lucide-react';
import './LoadCard.css';

const LoadCard = ({ load, onClick }) => {
    return (
        <div className="load-card" onClick={onClick}>
            <div className="load-card-header">
                <div className="route-info">
                    <div className="route-cities">
                        <MapPin size={16} className="text-primary" />
                        <span className="font-semibold">{load.from}</span>
                        <span className="route-arrow">→</span>
                        <span className="font-semibold">{load.to}</span>
                    </div>
                    <div className="distance text-sm text-secondary">
                        {load.distance} km
                    </div>
                </div>
                {load.paymentGuaranteed && (
                    <div className="badge badge-success">
                        <Shield size={12} />
                        Payment Guaranteed
                    </div>
                )}
            </div>

            <div className="load-details">
                <div className="detail-item">
                    <Truck size={16} className="text-secondary" />
                    <span className="text-sm">{load.truckType}</span>
                </div>
                <div className="detail-item">
                    <Package size={16} className="text-secondary" />
                    <span className="text-sm">{load.weight}T • {load.product}</span>
                </div>
                <div className="detail-item">
                    <IndianRupee size={16} className="text-primary" />
                    <span className="text-sm font-semibold">₹{load.loadValue.toLocaleString('en-IN')}</span>
                </div>
            </div>

            <div className="load-footer">
                <div className="payment-terms">
                    <span className="badge badge-info">{load.paymentTerms}</span>
                </div>
                <button className="btn btn-sm btn-primary">
                    <Phone size={14} />
                    Call
                </button>
            </div>
        </div>
    );
};

export default LoadCard;
