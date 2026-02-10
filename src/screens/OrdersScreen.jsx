import React from 'react';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import LoadCard from '../components/LoadCard';
import { useNavigate } from 'react-router-dom';
import './OrdersScreen.css';

const OrdersScreen = () => {
    const { loads } = useApp();
    const navigate = useNavigate();

    const assignedLoads = loads.filter(l => l.status === 'Assigned' || l.status === 'In Transit');
    const completedLoads = loads.filter(l => l.status === 'Completed').slice(0, 10);

    return (
        <div className="orders-screen">
            <Header title="My Orders" showLogo={false} />

            <div className="orders-content">
                <div className="orders-section">
                    <h3 className="section-title">Active Orders ({assignedLoads.length})</h3>
                    <div className="orders-list">
                        {assignedLoads.length > 0 ? (
                            assignedLoads.map(load => (
                                <LoadCard
                                    key={load.id}
                                    load={load}
                                    onClick={() => navigate(`/load-details/${load.id}`)}
                                />
                            ))
                        ) : (
                            <div className="empty-state">
                                <p className="text-secondary">No active orders</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="orders-section">
                    <h3 className="section-title">Completed Orders ({completedLoads.length})</h3>
                    <div className="orders-list">
                        {completedLoads.map(load => (
                            <LoadCard
                                key={load.id}
                                load={load}
                                onClick={() => navigate(`/load-details/${load.id}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersScreen;
