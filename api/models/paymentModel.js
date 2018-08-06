'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    user_name: {
        type: String,
        required: 'Kindly enter the user name of the payment'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    },
    amount: {
        type: Number,
        required: 'Kindly enter the payment amount'
    }
});

module.exports = mongoose.model('Payments', PaymentSchema);