const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const Load = require('../models/Load');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/drivers
// @desc    Get all drivers
// @access  Private (Fleet Owner only)
router.get('/', protect, authorize('fleet_owner'), async (req, res) => {
    try {
        const drivers = await Driver.find().select('-password').sort({ createdAt: -1 });

        res.json({
            success: true,
            count: drivers.length,
            data: drivers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/drivers/me
// @desc    Get current driver profile
// @access  Private (Driver only)
router.get('/me', protect, authorize('driver'), async (req, res) => {
    try {
        const driver = await Driver.findById(req.driver._id)
            .select('-password')
            .populate('assignedTruck');

        // Get assigned loads
        const loads = await Load.find({ assignedDriver: req.driver._id })
            .populate('assignedTruck')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: {
                driver,
                loads
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/drivers/:id/status
// @desc    Update driver status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
    try {
        const { status } = req.body;

        const driver = await Driver.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        ).select('-password');

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: 'Driver not found'
            });
        }

        // If trip completed, increment trips count
        if (status === 'Idle' && req.body.tripCompleted) {
            driver.tripsCompleted += 1;
            await driver.save();
        }

        res.json({
            success: true,
            data: driver
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router;
