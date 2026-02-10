import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, CreditCard, TrendingUp, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import './MoneyScreen.css';

const MoneyScreen = () => {
    const navigate = useNavigate();
    const { trucks, revenue } = useApp();

    const totalFastagBalance = trucks.reduce((sum, truck) => sum + truck.fastagBalance, 0);

    return (
        <div className="money-screen">
            <Header title="Money" showLogo={false} />

            <div className="money-content">
                {/* Wallet Overview */}
                <div className="wallet-overview-card">
                    <div className="wallet-header-large">
                        <Wallet size={32} />
                        <div>
                            <h3 className="wallet-title-large">Total Balance</h3>
                            <p className="wallet-subtitle-large">Across all accounts</p>
                        </div>
                    </div>
                    <div className="wallet-balance-large">
                        ₹{totalFastagBalance.toLocaleString('en-IN')}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <button
                        className="action-card"
                        onClick={() => navigate('/fastag')}
                    >
                        <div className="action-icon">
                            <CreditCard size={24} />
                        </div>
                        <div className="action-info">
                            <div className="action-title">FASTag</div>
                            <div className="action-subtitle">Recharge & Manage</div>
                        </div>
                        <ArrowRight size={20} className="action-arrow" />
                    </button>

                    <button
                        className="action-card"
                        onClick={() => navigate('/revenue')}
                    >
                        <div className="action-icon">
                            <TrendingUp size={24} />
                        </div>
                        <div className="action-info">
                            <div className="action-title">Revenue Dashboard</div>
                            <div className="action-subtitle">View earnings</div>
                        </div>
                        <ArrowRight size={20} className="action-arrow" />
                    </button>
                </div>

                {/* Revenue Summary */}
                <div className="card">
                    <h3 className="card-title">This Month's Revenue</h3>
                    <div className="revenue-summary">
                        <div className="summary-item">
                            <div className="summary-label">FASTag Fees</div>
                            <div className="summary-value">₹{(revenue.fastagRecharges * 29).toLocaleString('en-IN')}</div>
                            <div className="summary-meta">{revenue.fastagRecharges} recharges × ₹29</div>
                        </div>

                        <div className="summary-item">
                            <div className="summary-label">Load Commissions</div>
                            <div className="summary-value">₹{Math.floor(revenue.monthlyRevenue * 0.4).toLocaleString('en-IN')}</div>
                            <div className="summary-meta">3% per load</div>
                        </div>

                        <div className="summary-item">
                            <div className="summary-label">Trip Fees</div>
                            <div className="summary-value">₹{(revenue.tripsCompleted * 101).toLocaleString('en-IN')}</div>
                            <div className="summary-meta">{revenue.tripsCompleted} trips × ₹101</div>
                        </div>

                        <div className="summary-total">
                            <div className="total-label">Total Revenue</div>
                            <div className="total-value">₹{revenue.monthlyRevenue.toLocaleString('en-IN')}</div>
                        </div>
                    </div>
                </div>

                {/* FASTag Status */}
                <div className="card">
                    <h3 className="card-title">FASTag Status</h3>
                    <div className="fastag-status-grid">
                        <div className="status-item">
                            <div className="status-count">{trucks.filter(t => t.fastagStatus() === 'Active').length}</div>
                            <div className="status-label badge badge-success">Active</div>
                        </div>
                        <div className="status-item">
                            <div className="status-count">{trucks.filter(t => t.fastagStatus() === 'Low Balance').length}</div>
                            <div className="status-label badge badge-warning">Low Balance</div>
                        </div>
                        <div className="status-item">
                            <div className="status-count">{trucks.filter(t => t.fastagStatus() === 'Blacklisted').length}</div>
                            <div className="status-label badge badge-danger">Blacklisted</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoneyScreen;
