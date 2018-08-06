'use strict';

require('dotenv').config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;

// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_payments = function(req, res) {
    let param = {
        limit: req.query.limit || 10
    };

    stripe.charges.list(
        param,
        function(err, charges) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(charges);
            }
        }
    );
};


exports.create_a_payment = function(req, res) {
    let param = {
        amount: req.body.amount,
        currency: req.body.curreny,
        customer: req.body.user_id,
        source: req.body.source_id,
        description: req.body.description || "",
        receipt_email: req.body.receipt_email || ""
    };

    stripe.charges.create(
        param,
        function(err, charge) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(charge);
            }
        }
    );
};


exports.read_a_payment = function(req, res) {
    let paymentID = req.params.paymentId;

    stripe.charges.retrieve(
        paymentID,
        function(err, charge) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(charge);
            }
        }
    );
};


exports.update_a_payment = function(req, res) {
    let paymentID = req.params.paymentId;
    let param = {
        description: req.body.description,
    };

    stripe.charges.update(
        paymentID,
        param,
        function(err, charge) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(charge);
            }
        }
    );
};