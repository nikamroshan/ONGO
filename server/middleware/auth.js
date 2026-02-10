const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Driver = require('../models/Driver');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user or driver
        if (decoded.role === 'driver') {
            req.driver = await Driver.findById(decoded.id);
            req.userType = 'driver';
        } else {
            req.user = await User.findById(decoded.id);
            req.userType = 'user';
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
};

// Restrict to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user ? req.user.role : req.driver ? req.driver.role : null;

        if (!roles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: `User role ${userRole} is not authorized to access this route`
            });
        }
        next();
    };
};

// Generate JWT token
exports.generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};
