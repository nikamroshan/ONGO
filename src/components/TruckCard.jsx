import React from 'react';
import { Truck, CheckCircle, AlertCircle } from 'lucide-react';
import './TruckCard.css';

const TruckCard = ({ truck, onClick, selectable = false, selected = false }) => {
    const getStatusBadge = () => {
        switch (truck.status) {
            case 'Available':
                return <span className="badge badge-success">Available</span>;
            case 'On Trip':
                return <span className="badge badge-warning">On Trip</span>;
            case 'Maintenance':
                return <span className="badge badge-danger">Maintenance</span>;
            default:
                return null;
        }
    };

    const getFastagStatusBadge = () => {
        const status = truck.fastagStatus();
        switch (status) {
            case 'Active':
                return <span className="badge badge-success"><CheckCircle size={12} /> Active</span>;
            case 'Low Balance':
                return <span className="badge badge-warning"><AlertCircle size={12} /> Low Balance</span>;
            case 'Blacklisted':
                return <span className="badge badge-danger"><AlertCircle size={12} /> Blacklisted</span>;
            default:
                return null;
        }
    };

    return (
        <div
            className={`truck-card ${selectable ? 'selectable' : ''} ${selected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="truck-card-header">
                <div className="truck-icon">
                    <Truck size={24} />
                </div>
                <div className="truck-info">
                    <h4 className="truck-number">{truck.registrationNumber}</h4>
                    <p className="truck-type text-sm text-secondary">{truck.type}</p>
                </div>
                {getStatusBadge()}
            </div>

            <div className="truck-details">
                <div className="detail-row">
                    <span className="text-sm text-secondary">Capacity:</span>
                    <span className="text-sm font-semibold">{truck.capacity}T</span>
                </div>
                <div className="detail-row">
                    <span className="text-sm text-secondary">FASTag:</span>
                    {getFastagStatusBadge()}
                </div>
                <div className="detail-row">
                    <span className="text-sm text-secondary">Balance:</span>
                    <span className="text-sm font-semibold">₹{truck.fastagBalance}</span>
                </div>
            </div>
        </div>
    );
};

export default TruckCard;
