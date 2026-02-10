const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number']
    },
    license: {
        type: String,
        required: [true, 'Please provide a license number']
    },
    experience: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.0,
        min: 0,
        max: 5
    },
    assignedTruck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        default: null
    },
    status: {
        type: String,
        enum: ['Idle', 'On Trip', 'Offline'],
        default: 'Idle'
    },
    tripsCompleted: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'driver',
        enum: ['driver']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
driverSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
driverSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Driver', driverSchema);
