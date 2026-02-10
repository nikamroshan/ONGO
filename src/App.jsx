import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BottomNav from './components/BottomNav';

// Screens
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import FindLoadsScreen from './screens/FindLoadsScreen';
import LoadDetailsScreen from './screens/LoadDetailsScreen';
import FleetManagementScreen from './screens/FleetManagementScreen';
import FASTagScreen from './screens/FASTagScreen';
import FuelTrackingScreen from './screens/FuelTrackingScreen';
import DriverAppScreen from './screens/DriverAppScreen';
import RevenueDashboardScreen from './screens/RevenueDashboardScreen';
import OrdersScreen from './screens/OrdersScreen';
import MoneyScreen from './screens/MoneyScreen';
import CallsScreen from './screens/CallsScreen';

import './index.css';

function App() {
    return (
        <AppProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        {/* Splash Screen */}
                        <Route path="/" element={<SplashScreen />} />

                        {/* Main Screens with Bottom Nav */}
                        <Route path="/home" element={<><HomeScreen /><BottomNav /></>} />
                        <Route path="/find-loads" element={<><FindLoadsScreen /><BottomNav /></>} />
                        <Route path="/orders" element={<><OrdersScreen /><BottomNav /></>} />
                        <Route path="/money" element={<><MoneyScreen /><BottomNav /></>} />
                        <Route path="/calls" element={<><CallsScreen /><BottomNav /></>} />

                        {/* Detail Screens */}
                        <Route path="/load-details/:loadId" element={<><LoadDetailsScreen /><BottomNav /></>} />
                        <Route path="/fleet" element={<><FleetManagementScreen /><BottomNav /></>} />
                        <Route path="/fastag" element={<><FASTagScreen /><BottomNav /></>} />
                        <Route path="/fuel-tracking" element={<><FuelTrackingScreen /><BottomNav /></>} />
                        <Route path="/driver-app" element={<><DriverAppScreen /><BottomNav /></>} />
                        <Route path="/revenue" element={<><RevenueDashboardScreen /><BottomNav /></>} />

                        {/* Redirect unknown routes to splash */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
