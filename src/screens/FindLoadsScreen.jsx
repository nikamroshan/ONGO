import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import Header from '../components/Header';
import LoadCard from '../components/LoadCard';
import { useApp } from '../context/AppContext';
import { truckTypes, cities } from '../data/mockData';
import './FindLoadsScreen.css';

const FindLoadsScreen = () => {
    const navigate = useNavigate();
    const { loads } = useApp();
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [selectedTruckType, setSelectedTruckType] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const filteredLoads = loads.filter(load => {
        if (load.status !== 'Available') return false;
        if (fromCity && load.from !== fromCity) return false;
        if (toCity && load.to !== toCity) return false;
        if (selectedTruckType && load.truckType !== selectedTruckType) return false;
        return true;
    });

    return (
        <div className="find-loads-screen">
            <Header title="Find Loads" showLogo={false} />

            <div className="search-section">
                <div className="search-inputs">
                    <div className="input-group">
                        <label className="input-label">From</label>
                        <select
                            className="input"
                            value={fromCity}
                            onChange={(e) => setFromCity(e.target.value)}
                        >
                            <option value="">All Cities</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label className="input-label">To</label>
                        <select
                            className="input"
                            value={toCity}
                            onChange={(e) => setToCity(e.target.value)}
                        >
                            <option value="">All Cities</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    className="filter-toggle btn btn-outline"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter size={18} />
                    Filters
                </button>
            </div>

            {showFilters && (
                <div className="filters-section">
                    <h4 className="filter-title">Truck Type</h4>
                    <div className="truck-type-filters">
                        <button
                            className={`filter-chip ${selectedTruckType === '' ? 'active' : ''}`}
                            onClick={() => setSelectedTruckType('')}
                        >
                            All
                        </button>
                        {truckTypes.map(type => (
                            <button
                                key={type}
                                className={`filter-chip ${selectedTruckType === type ? 'active' : ''}`}
                                onClick={() => setSelectedTruckType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="loads-section">
                <div className="loads-header">
                    <h3 className="section-title">
                        {filteredLoads.length} Loads Available
                    </h3>
                </div>

                <div className="loads-list">
                    {filteredLoads.length > 0 ? (
                        filteredLoads.map(load => (
                            <LoadCard
                                key={load.id}
                                load={load}
                                onClick={() => navigate(`/load-details/${load.id}`)}
                            />
                        ))
                    ) : (
                        <div className="empty-state">
                            <Search size={48} className="text-secondary" />
                            <p className="text-secondary">No loads found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FindLoadsScreen;
