import React from 'react';
import { User, Phone, Star, TrendingUp } from 'lucide-react';
import './DriverCard.css';

const DriverCard = ({ driver, onClick }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'On Trip':
                return 'status-active';
            case 'Idle':
                return 'status-idle';
            case 'Offline':
                return 'status-offline';
            default:
                return '';
        }
    };

    return (
        <div className="driver-card" onClick={onClick}>
            <div className="driver-card-header">
                <div className="driver-avatar">
                    <User size={24} />
                </div>
                <div className="driver-info">
                    <h4 className="driver-name">{driver.name}</h4>
                    <div className="driver-meta">
                        <span className={`status-indicator ${getStatusClass(driver.status)}`}>
                            <span className="status-dot"></span>
                            {driver.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="driver-stats">
                <div className="stat-item">
                    <Star size={14} className="text-warning" />
                    <span className="text-sm">{driver.rating}</span>
                </div>
                <div className="stat-item">
                    <TrendingUp size={14} className="text-primary" />
                    <span className="text-sm">{driver.tripsCompleted} trips</span>
                </div>
                <div className="stat-item">
                    <span className="text-sm text-secondary">{driver.experience}y exp</span>
                </div>
            </div>

            <div className="driver-footer">
                <a href={`tel:${driver.phone}`} className="btn btn-sm btn-outline" onClick={(e) => e.stopPropagation()}>
                    <Phone size={14} />
                    Call
                </a>
            </div>
        </div>
    );
};

export default DriverCard;
