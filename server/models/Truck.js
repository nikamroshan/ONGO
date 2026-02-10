const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    registrationNumber: {
        type: String,
        required: [true, 'Please provide a registration number'],
        unique: true,
        uppercase: true
    },
    type: {
        type: String,
        required: [true, 'Please provide truck type'],
        enum: ['Open (7.5-43T)', 'Container', 'LCV', 'Mini/Pickup', 'Trailer', 'Tipper', 'Tanker']
    },
    capacity: {
        type: Number,
        required: [true, 'Please provide truck capacity']
    },
    status: {
        type: String,
        enum: ['Available', 'On Trip', 'Maintenance'],
        default: 'Available'
    },
    fastagBalance: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Method to get FASTag status
truckSchema.methods.getFastagStatus = function () {
    if (this.fastagBalance === 0) return 'Blacklisted';
    if (this.fastagBalance < 300) return 'Low Balance';
    return 'Active';
};

module.exports = mongoose.model('Truck', truckSchema);
