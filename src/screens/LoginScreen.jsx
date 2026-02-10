import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Truck } from 'lucide-react';
import API from '../api/axios';
import { useApp } from '../context/AppContext';
import './LoginScreen.css';

const LoginScreen = () => {
    const navigate = useNavigate();
    const { login } = useApp();

    const [userType, setUserType] = useState('user'); // 'user' or 'driver'
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        company: '',
        license: '',
        experience: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isRegister
                ? `/auth/register/${userType}`
                : `/auth/login/${userType}`;

            const payload = isRegister
                ? (userType === 'user'
                    ? { name: formData.name, email: formData.email, password: formData.password, phone: formData.phone, company: formData.company }
                    : { name: formData.name, email: formData.email, password: formData.password, phone: formData.phone, license: formData.license, experience: formData.experience })
                : { email: formData.email, password: formData.password };

            const response = await API.post(endpoint, payload);

            if (response.data.success) {
                // Store token and user data
                localStorage.setItem('token', response.data.token);
                const userData = response.data.user || response.data.driver;
                localStorage.setItem('user', JSON.stringify(userData));

                // Update context
                login(userData, response.data.token);

                // Redirect based on role
                if (userData.role === 'driver') {
                    navigate('/driver-app');
                } else {
                    navigate('/home');
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-screen">
            <div className="login-container">
                {/* Logo */}
                <div className="login-logo">
                    <div className="logo-circle">
                        <span className="logo-text">ONGO</span>
                    </div>
                    <h1 className="login-title">ONGO Logistics</h1>
                    <p className="login-subtitle">Everything that moves India, ONGO manages it.</p>
                </div>

                {/* User Type Tabs */}
                <div className="user-type-tabs">
                    <button
                        className={`tab ${userType === 'user' ? 'active' : ''}`}
                        onClick={() => setUserType('user')}
                    >
                        <User size={20} />
                        Fleet Owner
                    </button>
                    <button
                        className={`tab ${userType === 'driver' ? 'active' : ''}`}
                        onClick={() => setUserType('driver')}
                    >
                        <Truck size={20} />
                        Driver
                    </button>
                </div>

                {/* Login/Register Toggle */}
                <div className="auth-toggle">
                    <button
                        className={`toggle-btn ${!isRegister ? 'active' : ''}`}
                        onClick={() => setIsRegister(false)}
                    >
                        Login
                    </button>
                    <button
                        className={`toggle-btn ${isRegister ? 'active' : ''}`}
                        onClick={() => setIsRegister(true)}
                    >
                        Register
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="login-form">
                    {isRegister && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            placeholder="Enter your password"
                        />
                    </div>

                    {isRegister && (
                        <>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {userType === 'user' && (
                                <div className="form-group">
                                    <label>Company Name (Optional)</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Enter your company name"
                                    />
                                </div>
                            )}

                            {userType === 'driver' && (
                                <>
                                    <div className="form-group">
                                        <label>License Number</label>
                                        <input
                                            type="text"
                                            name="license"
                                            value={formData.license}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your license number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Years of Experience</label>
                                        <input
                                            type="number"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            placeholder="Enter years of experience"
                                            min="0"
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            <>
                                <LogIn size={20} />
                                {isRegister ? 'Register' : 'Login'}
                            </>
                        )}
                    </button>
                </form>

                {/* Demo Credentials */}
                <div className="demo-credentials">
                    <p className="demo-title">Demo Credentials:</p>
                    <div className="demo-grid">
                        <div className="demo-item">
                            <strong>Fleet Owner:</strong>
                            <span>owner@ongo.com / password123</span>
                        </div>
                        <div className="demo-item">
                            <strong>Driver:</strong>
                            <span>driver@ongo.com / password123</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
