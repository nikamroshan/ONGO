const express = require('express');
const router = express.Router();
const Load = require('../models/Load');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/loads
// @desc    Get all available loads
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const loads = await Load.find()
            .populate('postedBy', 'name company')
            .populate('assignedDriver', 'name phone')
            .populate('assignedTruck', 'registrationNumber type')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: loads.length,
            data: loads
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/loads
// @desc    Create new load
// @access  Private (Fleet Owner only)
router.post('/', protect, authorize('fleet_owner'), async (req, res) => {
    try {
        const load = await Load.create({
            ...req.body,
            postedBy: req.user._id
        });

        res.status(201).json({
            success: true,
            data: load
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/loads/:id/assign
// @desc    Assign load to driver and truck
// @access  Private (Fleet Owner only)
router.put('/:id/assign', protect, authorize('fleet_owner'), async (req, res) => {
    try {
        const { driverId, truckId } = req.body;

        const load = await Load.findByIdAndUpdate(
            req.params.id,
            {
                assignedDriver: driverId,
                assignedTruck: truckId,
                status: 'Assigned'
            },
            { new: true, runValidators: true }
        ).populate('assignedDriver assignedTruck');

        if (!load) {
            return res.status(404).json({
                success: false,
                message: 'Load not found'
            });
        }

        res.json({
            success: true,
            data: load
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/loads/:id/status
// @desc    Update load status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
    try {
        const { status } = req.body;

        const load = await Load.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!load) {
            return res.status(404).json({
                success: false,
                message: 'Load not found'
            });
        }

        res.json({
            success: true,
            data: load
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
