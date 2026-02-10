import React, { createContext, useContext, useState } from 'react';
import { trucks, drivers, loads, fastagTransactions, revenueMetrics } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // Authentication state
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

    // Data state
    const [trucksData, setTrucksData] = useState(trucks);
    const [driversData, setDriversData] = useState(drivers);
    const [loadsData, setLoadsData] = useState(loads);
    const [fastagData, setFastagData] = useState(fastagTransactions);
    const [revenue, setRevenue] = useState(revenueMetrics);

    // Assign load to driver and truck
    const assignLoad = (loadId, driverId, truckId) => {
        setLoadsData(prev => prev.map(load =>
            load.id === loadId
                ? { ...load, assignedDriver: driverId, assignedTruck: truckId, status: 'Assigned' }
                : load
        ));

        setDriversData(prev => prev.map(driver =>
            driver.id === driverId
                ? { ...driver, status: 'On Trip', assignedTruck: truckId }
                : driver
        ));

        setTrucksData(prev => prev.map(truck =>
            truck.id === truckId
                ? { ...truck, status: 'On Trip' }
                : truck
        ));
    };

    // Start trip
    const startTrip = (driverId) => {
        setDriversData(prev => prev.map(driver =>
            driver.id === driverId
                ? { ...driver, status: 'On Trip' }
                : driver
        ));
    };

    // End trip
    const endTrip = (driverId, loadId) => {
        setDriversData(prev => prev.map(driver =>
            driver.id === driverId
                ? { ...driver, status: 'Idle', tripsCompleted: driver.tripsCompleted + 1 }
                : driver
        ));

        setLoadsData(prev => prev.map(load =>
            load.id === loadId
                ? { ...load, status: 'Completed' }
                : load
        ));

        // Update revenue
        setRevenue(prev => ({
            ...prev,
            tripsCompleted: prev.tripsCompleted + 1
        }));
    };

    // Recharge FASTag
    const rechargeFastag = (truckId, amount) => {
        setTrucksData(prev => prev.map(truck =>
            truck.id === truckId
                ? {
                    ...truck,
                    fastagBalance: truck.fastagBalance + amount,
                    fastagStatus: function () {
                        const newBalance = truck.fastagBalance + amount;
                        if (newBalance === 0) return 'Blacklisted';
                        if (newBalance < 300) return 'Low Balance';
                        return 'Active';
                    }()
                }
                : truck
        ));

        // Add transaction
        const newTransaction = {
            id: `FT${String(fastagData.length + 1).padStart(5, '0')}`,
            truckId,
            type: 'Recharge',
            amount,
            platformFee: 29,
            timestamp: new Date().toISOString(),
            location: 'Mumbai'
        };

        setFastagData(prev => [newTransaction, ...prev]);

        // Update revenue
        setRevenue(prev => ({
            ...prev,
            fastagRecharges: prev.fastagRecharges + 1,
            monthlyRevenue: prev.monthlyRevenue + 29
        }));
    };

    // Authentication functions
    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value = {
        // Auth
        user,
        token,
        isAuthenticated,
        login,
        logout,
        // Data
        trucks: trucksData,
        drivers: driversData,
        loads: loadsData,
        fastagTransactions: fastagData,
        revenue,
        // Functions
        assignLoad,
        startTrip,
        endTrip,
        rechargeFastag
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
