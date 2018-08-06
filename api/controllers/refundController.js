'use strict';

require('dotenv').config();

// Keys for Stripe
const keySecret = process.env.SECRET_KEY;
// Stripe API
const stripe = require("stripe")(keySecret);

exports.list_all_refunds = function(req, res) {
    let param = {
        limit: req.query.limit || 10
    };

    stripe.refunds.list(
        param,
        function(err, refunds) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(refunds);
            }
        }
    );
};


exports.create_a_refund = function(req, res) {
    let param = {
        charge: req.body.charge_id // The id of the charge to refund
    };

    stripe.refunds.create(
        param,
        function(err, refund) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(refund);
            }
        }
    );

};


exports.read_a_refund = function(req, res) {
    let refundID = req.params.refundId;

    stripe.refunds.retrieve(
        refundID,
        function(err, refund) {
            // asynchronously called
            if(err) {
                console.log(err);
                res('REQUEST ERROR');
            } else {
                res.json(refund);
            }
        }
    );
};