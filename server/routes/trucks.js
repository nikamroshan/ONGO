const express = require('express');
const router = express.Router();
const Truck = require('../models/Truck');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/trucks
// @desc    Get all trucks for logged-in user
// @access  Private (Fleet Owner only)
router.get('/', protect, authorize('fleet_owner'), async (req, res) => {
    try {
        const trucks = await Truck.find({ owner: req.user._id }).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: trucks.length,
            data: trucks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/trucks
// @desc    Add new truck
// @access  Private (Fleet Owner only)
router.post('/', protect, authorize('fleet_owner'), async (req, res) => {
    try {
        const truck = await Truck.create({
            ...req.body,
            owner: req.user._id
        });

        // Add truck to user's trucks array
        await User.findByIdAndUpdate(req.user._id, {
            $push: { trucks: truck._id }
        });

        res.status(201).json({
            success: true,
            data: truck
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   PUT /api/trucks/:id
// @desc    Update truck
// @access  Private (Fleet Owner only)
router.put('/:id', protect, authorize('fleet_owner'), async (req, res) => {
    try {
        let truck = await Truck.findById(req.params.id);

        if (!truck) {
            return res.status(404).json({
                success: false,
                message: 'Truck not found'
            });
        }

        // Make sure user owns truck
        if (truck.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this truck'
            });
        }

        truck = await Truck.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json({
            success: true,
            data: truck
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   POST /api/trucks/:id/recharge
// @desc    Recharge FASTag
// @access  Private (Fleet Owner only)
router.post('/:id/recharge', protect, authorize('fleet_owner'), async (req, res) => {
    try {
        const { amount } = req.body;
        const platformFee = 29;

        let truck = await Truck.findById(req.params.id);

        if (!truck) {
            return res.status(404).json({
                success: false,
                message: 'Truck not found'
            });
        }

        // Make sure user owns truck
        if (truck.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to recharge this truck'
            });
        }

        // Update balance
        truck.fastagBalance += amount;
        await truck.save();

        res.json({
            success: true,
            data: {
                truck,
                platformFee,
                totalCharged: amount + platformFee
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

module.exports = router;
