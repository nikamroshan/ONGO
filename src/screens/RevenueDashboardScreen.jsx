import React from 'react';
import { TrendingUp, Truck, CreditCard, IndianRupee, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { dailyRevenueData, revenueStreams } from '../data/mockData';
import './RevenueDashboardScreen.css';

const RevenueDashboardScreen = () => {
    const { revenue, trucks, loads } = useApp();

    const COLORS = ['#22c55e', '#3b82f6', '#f59e0b'];

    return (
        <div className="revenue-screen">
            <Header title="Revenue Dashboard" showLogo={false} />

            <div className="revenue-content">
                {/* Key Metrics */}
                <div className="metrics-grid">
                    <div className="metric-card">
                        <div className="metric-icon" style={{ background: '#dcfce7', color: '#166534' }}>
                            <Truck size={24} />
                        </div>
                        <div className="metric-info">
                            <div className="metric-value">{revenue.activeTrucks}</div>
                            <div className="metric-label">Active Trucks</div>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-icon" style={{ background: '#dbeafe', color: '#1e40af' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div className="metric-info">
                            <div className="metric-value">{revenue.tripsCompleted}</div>
                            <div className="metric-label">Trips Completed</div>
                        </div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-icon" style={{ background: '#fef3c7', color: '#92400e' }}>
                            <CreditCard size={24} />
                        </div>
                        <div className="metric-info">
                            <div className="metric-value">{revenue.fastagRecharges}</div>
                            <div className="metric-label">FASTag Recharges</div>
                        </div>
                    </div>

                    <div className="metric-card highlight">
                        <div className="metric-icon" style={{ background: '#22c55e', color: 'white' }}>
                            <IndianRupee size={24} />
                        </div>
                        <div className="metric-info">
                            <div className="metric-value">₹{(revenue.monthlyRevenue / 1000).toFixed(0)}K</div>
                            <div className="metric-label">Monthly Revenue</div>
                        </div>
                    </div>
                </div>

                {/* Revenue Streams */}
                <div className="card">
                    <h3 className="card-title">Revenue Streams</h3>
                    <div className="revenue-streams">
                        {revenueStreams.map((stream, index) => (
                            <div key={index} className="stream-item">
                                <div className="stream-header">
                                    <div className="stream-name">
                                        <div
                                            className="stream-color"
                                            style={{ background: stream.color }}
                                        ></div>
                                        <span>{stream.name}</span>
                                    </div>
                                    <div className="stream-value">₹{stream.value.toLocaleString('en-IN')}</div>
                                </div>
                                <div className="stream-details">
                                    <span className="stream-count">{stream.count} transactions</span>
                                    <span className="stream-rate">
                                        {typeof stream.perUnit === 'number' ? `₹${stream.perUnit}` : stream.perUnit} per unit
                                    </span>
                                </div>
                                <div className="stream-breakdown">
                                    <div className="breakdown-label">Fee Breakdown:</div>
                                    {stream.name === 'FASTag Recharges' && (
                                        <div className="breakdown-value">₹29 × {stream.count} recharges</div>
                                    )}
                                    {stream.name === 'Load Commissions' && (
                                        <div className="breakdown-value">3% × {stream.count} loads</div>
                                    )}
                                    {stream.name === 'Driver Trip Fees' && (
                                        <div className="breakdown-value">₹101 × {stream.count} trips</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Distribution Pie Chart */}
                <div className="card">
                    <h3 className="card-title">Revenue Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={revenueStreams}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {revenueStreams.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Daily Revenue Chart */}
                <div className="card">
                    <h3 className="card-title">Daily Revenue (Last 30 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dailyRevenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                            <Legend />
                            <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2} name="Total Revenue" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue Breakdown Bar Chart */}
                <div className="card">
                    <h3 className="card-title">Revenue by Stream (Last 7 Days)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dailyRevenueData.slice(-7)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                            <Legend />
                            <Bar dataKey="fastagRevenue" fill="#22c55e" name="FASTag" />
                            <Bar dataKey="loadRevenue" fill="#3b82f6" name="Loads" />
                            <Bar dataKey="tripRevenue" fill="#f59e0b" name="Trips" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Monthly Projection */}
                <div className="card projection-card">
                    <h3 className="card-title">
                        <TrendingUp size={20} />
                        Monthly Projection
                    </h3>
                    <div className="projection-value">₹{revenue.monthlyRevenue.toLocaleString('en-IN')}</div>
                    <div className="projection-breakdown">
                        <div className="projection-item">
                            <span>FASTag Fees</span>
                            <span>₹{(revenue.fastagRecharges * 29).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="projection-item">
                            <span>Load Commissions</span>
                            <span>₹{loads.filter(l => l.status === 'Completed').reduce((sum, l) => sum + l.commission, 0).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="projection-item">
                            <span>Trip Fees</span>
                            <span>₹{(revenue.tripsCompleted * 101).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueDashboardScreen;
