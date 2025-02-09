const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const APIFeatures = require('../utils/apiFeatures');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill your name'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Please fill your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, ' Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please fill your password'],
        minLength: 6,
        select: false

    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please fill your password confirm'],
        validate: {
            validator: function (el) {
                // "this" works only on create and save 
                return el === this.password;
            },
            message: 'Your password and confirmation password are not the same'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'official'],
        default: 'official'
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
},{
    timestamps: true
});

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
userSchema.pre('save', async function (next) {
    // check the password if it is modified
    if (!this.isModified('password')) {
        return next();
    }

    // Hashing the password
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function (typedPassword, originalPassword) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

const User = mongoose.model('User', userSchema);
User.getUserListing = (query) => {
    return new Promise((resolve)=>{
        const { where = {}, filter: {fields} = {} } = query;
        const features = new APIFeatures(User.find(where, fields).lean(), query)
            .sort()
            .paginate();
        resolve(features.query);
    });
}
module.exports = User;