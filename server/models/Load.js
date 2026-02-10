const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: String,
        required: [true, 'Please provide origin city']
    },
    to: {
        type: String,
        required: [true, 'Please provide destination city']
    },
    truckType: {
        type: String,
        required: [true, 'Please provide truck type'],
        enum: ['Open (7.5-43T)', 'Container', 'LCV', 'Mini/Pickup', 'Trailer', 'Tipper', 'Tanker']
    },
    weight: {
        type: Number,
        required: [true, 'Please provide weight']
    },
    product: {
        type: String,
        required: [true, 'Please provide product type']
    },
    loadValue: {
        type: Number,
        required: [true, 'Please provide load value']
    },
    commission: {
        type: Number,
        default: function () {
            return Math.floor(this.loadValue * 0.03);
        }
    },
    netPayout: {
        type: Number,
        default: function () {
            return Math.floor(this.loadValue * 0.97);
        }
    },
    paymentTerms: {
        type: String,
        enum: ['90% Advance', '100% Advance', '50% Advance', 'To Pay'],
        default: '90% Advance'
    },
    paymentGuaranteed: {
        type: Boolean,
        default: true
    },
    distance: {
        type: Number,
        required: [true, 'Please provide distance']
    },
    status: {
        type: String,
        enum: ['Available', 'Assigned', 'In Transit', 'Completed'],
        default: 'Available'
    },
    assignedDriver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        default: null
    },
    assignedTruck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Calculate commission and net payout before saving
loadSchema.pre('save', function (next) {
    if (this.isModified('loadValue')) {
        this.commission = Math.floor(this.loadValue * 0.03);
        this.netPayout = Math.floor(this.loadValue * 0.97);
    }
    next();
});

module.exports = mongoose.model('Load', loadSchema);
